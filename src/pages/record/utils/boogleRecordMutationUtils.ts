import {
  deleteBoogleRecord,
  getBoogleRecord,
  patchBoogleRecord,
  postBoogleRecord,
} from '../apis/boogleRecordApis';
import { getApiErrorStatus } from '@/shared/apis/apiError';

import type { BoogleRecordTypes } from '@/shared/components/dailyRecord';
import type {
  BoogleRecordResponseDataTypes,
  PatchBoogleRecordRequestTypes,
  PostBoogleRecordRequestTypes,
} from '../types/boogleRecordApiTypes';

export interface CreateBoogleRecordParamTypes {
  request: PostBoogleRecordRequestTypes;
  existingBoogleRecords: BoogleRecordTypes[];
  replacementRecordId?: number;
}

export interface CreateBoogleRecordResultTypes {
  record: BoogleRecordResponseDataTypes;
  removedRecordIds: number[];
}

interface DeleteBoogleRecordWithCleanupParamTypes {
  recordId: number;
  existingBoogleRecords: BoogleRecordTypes[];
}

export interface DeleteBoogleRecordWithCleanupResultTypes {
  removedRecordIds: number[];
}

export class BoogleRecordCleanupError extends Error {
  readonly removedRecordIds: number[];
  readonly originalError: unknown;

  constructor(removedRecordIds: number[], originalError: unknown) {
    super('부글 기록 정리 중 오류가 발생했습니다.');
    this.name = 'BoogleRecordCleanupError';
    this.removedRecordIds = removedRecordIds;
    this.originalError = originalError;
  }
}

const REPLACEMENT_REQUEST_RECORD_FIELDS = [
  'hasBowel',
  'bowelMovementAt',
  'stoolBristol',
  'bowelFeeling',
  'stomach',
  'distension',
  'remainingFeeling',
  'urgency',
  'takenTime',
  'amount',
  'color',
] as const satisfies ReadonlyArray<
  Exclude<keyof PatchBoogleRecordRequestTypes, 'regDate'>
>;

const normalizeRecordDate = (recordDate: string) =>
  recordDate.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? recordDate;

export const buildBoogleRecordReplacementRequest = (
  request: PostBoogleRecordRequestTypes,
): PatchBoogleRecordRequestTypes => ({
  regDate: request.regDate,
  hasBowel: request.hasBowel,
  bowelMovementAt: request.bowelMovementAt ?? null,
  stoolBristol: request.stoolBristol ?? null,
  bowelFeeling: request.bowelFeeling ?? null,
  stomach: request.stomach ?? null,
  distension: request.distension ?? null,
  remainingFeeling: request.remainingFeeling ?? null,
  urgency: request.urgency ?? null,
  takenTime: request.takenTime ?? null,
  amount: request.amount ?? null,
  color: request.color ?? null,
});

export const doesBoogleRecordMatchReplacementRequest = (
  record: BoogleRecordResponseDataTypes,
  request: PatchBoogleRecordRequestTypes,
) => {
  if (request.regDate === undefined) return false;

  if (
    normalizeRecordDate(record.regDate) !== normalizeRecordDate(request.regDate)
  ) {
    return false;
  }

  return REPLACEMENT_REQUEST_RECORD_FIELDS.every((field) => {
    if (!Object.prototype.hasOwnProperty.call(request, field)) return true;

    return record[field] === request[field];
  });
};

const deleteBoogleRecordIdempotently = async (recordId: number) => {
  try {
    await deleteBoogleRecord(recordId);
  } catch (error) {
    if (getApiErrorStatus(error) === 404) return;

    throw error;
  }
};

interface UpdateBoogleRecordParamTypes {
  recordId: number;
  request: PatchBoogleRecordRequestTypes;
  existingBoogleRecords: BoogleRecordTypes[];
}

export const updateBoogleRecord = ({
  recordId,
  request,
  existingBoogleRecords,
}: UpdateBoogleRecordParamTypes) => {
  const hasOtherBowelRecord = existingBoogleRecords.some(
    ({ id, hasBowel }) => id !== recordId && hasBowel,
  );

  if (request.hasBowel === false && hasOtherBowelRecord) {
    throw new Error(
      '같은 날짜에 배변 기록이 있어 배변 없음으로 변경할 수 없습니다.',
    );
  }

  return patchBoogleRecord(recordId, request);
};

export const createBoogleRecord = async ({
  request,
  existingBoogleRecords,
  replacementRecordId,
}: CreateBoogleRecordParamTypes): Promise<CreateBoogleRecordResultTypes> => {
  const noBowelRecords = existingBoogleRecords.filter(
    ({ hasBowel }) => !hasBowel,
  );

  if (
    !request.hasBowel ||
    (noBowelRecords.length === 0 && replacementRecordId === undefined)
  ) {
    const record = await postBoogleRecord(request);

    return { record, removedRecordIds: [] };
  }

  const recordToReplaceId = replacementRecordId ?? noBowelRecords[0].id;
  const replacementRequest = buildBoogleRecordReplacementRequest(request);
  const duplicateNoBowelRecords = noBowelRecords.filter(
    ({ id }) => id !== recordToReplaceId,
  );
  const removedRecordIds: number[] = [];

  // Keep the replacement record until duplicate cleanup succeeds. A cleanup
  // failure therefore cannot leave a new bowel record beside stale no-bowel data.
  try {
    for (const { id } of duplicateNoBowelRecords) {
      await deleteBoogleRecordIdempotently(id);
      removedRecordIds.push(id);
    }

    let record: BoogleRecordResponseDataTypes;

    try {
      record = await patchBoogleRecord(recordToReplaceId, replacementRequest);
    } catch (patchError) {
      let verifiedRecord: BoogleRecordResponseDataTypes;

      try {
        verifiedRecord = await getBoogleRecord(recordToReplaceId);
      } catch {
        throw patchError;
      }

      if (
        !doesBoogleRecordMatchReplacementRequest(
          verifiedRecord,
          replacementRequest,
        )
      ) {
        throw patchError;
      }

      record = verifiedRecord;
    }

    return { record, removedRecordIds };
  } catch (error) {
    throw new BoogleRecordCleanupError(removedRecordIds, error);
  }
};

export const deleteBoogleRecordWithCleanup = async ({
  recordId,
  existingBoogleRecords,
}: DeleteBoogleRecordWithCleanupParamTypes): Promise<DeleteBoogleRecordWithCleanupResultTypes> => {
  const coexistingNoBowelRecordIds = existingBoogleRecords
    .filter(({ id, hasBowel }) => id !== recordId && !hasBowel)
    .map(({ id }) => id);
  const removedRecordIds: number[] = [];

  // The selected real record is deliberately deleted last. If legacy cleanup
  // fails, the user's actual bowel record remains available for another retry.
  try {
    for (const noBowelRecordId of coexistingNoBowelRecordIds) {
      await deleteBoogleRecordIdempotently(noBowelRecordId);
      removedRecordIds.push(noBowelRecordId);
    }

    await deleteBoogleRecordIdempotently(recordId);
    removedRecordIds.push(recordId);
  } catch (error) {
    throw new BoogleRecordCleanupError(removedRecordIds, error);
  }

  return { removedRecordIds };
};
