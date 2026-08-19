import dayjs from 'dayjs';

import type {
  AmountTypes,
  DetailRecordFormStateTypes,
  DurationTypes,
  SeverityTypes,
  StoolColorTypes,
} from '@/pages/record/detail/types/detailRecordTypes';
import type {
  FeelingTypes,
  RecordFormStateTypes,
  RecordTimeValueTypes,
  StoolTypeId,
} from '@/pages/record/main/types/recordTypes';
import { getNearestPastHourTime } from '@/pages/record/main/utils/getNearestPastHourTime';
import {
  createInitialMainRecordState,
  INITIAL_DETAIL_RECORD_STATE,
  INITIAL_MAIN_RECORD_STATE,
  RECORD_DATE_FORMAT,
} from '@/pages/record/shared/stores/recordDraftStore';
import type {
  BoogleRecordAmountCodeTypes,
  BoogleRecordResponseDataTypes,
  BoogleRecordSeverityCodeTypes,
  BowelFeelingCodeTypes,
  StoolColorCodeTypes,
} from '@/pages/record/types/boogleRecordApiTypes';

const BOWEL_FEELING: Record<BowelFeelingCodeTypes, FeelingTypes> = {
  C: 'comfortable',
  N: 'normal',
  H: 'difficult',
};

const DETAIL_SEVERITY: Record<BoogleRecordSeverityCodeTypes, SeverityTypes> = {
  N: 'none',
  M: 'mild',
  L: 'severe',
};

const AMOUNT: Record<BoogleRecordAmountCodeTypes, AmountTypes> = {
  S: 'small',
  N: 'medium',
  M: 'large',
};

const STOOL_COLOR: Record<StoolColorCodeTypes, StoolColorTypes> = {
  B: 'brown',
  D: 'dark',
  N: 'black',
  R: 'red',
  G: 'grayWhite',
};

interface BoogleRecordDraftTypes {
  recordDate: string;
  /**
   * 서버에 저장된 배변 시각이 없거나 형식이 깨진 경우.
   * 화면에는 기본값을 보여주되, 사용자가 직접 고르기 전까지는 저장 payload에서 제외한다.
   */
  isTimeUnrecorded: boolean;
  main: RecordFormStateTypes;
  detail: DetailRecordFormStateTypes;
}

const isStoolTypeId = (value: number | null): value is StoolTypeId =>
  value !== null && Number.isInteger(value) && value >= 1 && value <= 7;

/** 서버 시각을 폼 값으로 바꾼다. 값이 없거나 형식이 깨졌으면 null을 돌려준다. */
const parseBowelMovementTime = (
  bowelMovementAt: string | null,
): RecordTimeValueTypes | null => {
  if (!bowelMovementAt) return null;

  const [hourText, minuteText] = bowelMovementAt.split(':');
  const hour24 = Number(hourText);
  const minute = Number(minuteText);

  if (
    !Number.isInteger(hour24) ||
    !Number.isInteger(minute) ||
    hour24 < 0 ||
    hour24 > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  return {
    hour: hour24 % 12 || 12,
    minute,
    meridiem: hour24 >= 12 ? 'PM' : 'AM',
  };
};

const mapTakenTime = (takenTime: number | null): DurationTypes | null => {
  if (takenTime === null) return null;
  if (takenTime <= 5) return 'short';
  if (takenTime < 15) return 'medium';
  return 'long';
};

export const mapBoogleRecordResponseToDraft = (
  record: BoogleRecordResponseDataTypes,
): BoogleRecordDraftTypes => {
  if (!record.hasBowel) {
    return {
      recordDate: dayjs(record.regDate).format(RECORD_DATE_FORMAT),
      isTimeUnrecorded: true,
      main: {
        ...createInitialMainRecordState(),
        bowelStatus: 'no',
      },
      detail: INITIAL_DETAIL_RECORD_STATE,
    };
  }

  const recordedTime = parseBowelMovementTime(record.bowelMovementAt);

  return {
    recordDate: dayjs(record.regDate).format(RECORD_DATE_FORMAT),
    isTimeUnrecorded: recordedTime === null,
    main: {
      bowelStatus: 'yes',
      time: recordedTime ?? getNearestPastHourTime(),
      stoolType: isStoolTypeId(record.stoolBristol)
        ? record.stoolBristol
        : null,
      feeling: record.bowelFeeling
        ? BOWEL_FEELING[record.bowelFeeling]
        : INITIAL_MAIN_RECORD_STATE.feeling,
      painLevel:
        record.stomach === null
          ? INITIAL_MAIN_RECORD_STATE.painLevel
          : Math.min(Math.max(record.stomach, 0), 4),
    },
    detail: {
      bloating: record.distension
        ? DETAIL_SEVERITY[record.distension]
        : INITIAL_DETAIL_RECORD_STATE.bloating,
      tenesmus: record.remainingFeeling
        ? DETAIL_SEVERITY[record.remainingFeeling]
        : INITIAL_DETAIL_RECORD_STATE.tenesmus,
      urgency: record.urgency
        ? DETAIL_SEVERITY[record.urgency]
        : INITIAL_DETAIL_RECORD_STATE.urgency,
      duration: mapTakenTime(record.takenTime),
      amount: record.amount ? AMOUNT[record.amount] : null,
      stoolColor: record.color ? STOOL_COLOR[record.color] : null,
    },
  };
};
