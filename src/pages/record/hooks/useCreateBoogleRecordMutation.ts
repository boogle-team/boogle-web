import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';
import {
  invalidateRecordRelatedQueries,
  synchronizePartiallyCleanedRecordQueries,
} from './invalidateRecordQueries';
import { getDailyRecordQueryKey } from '@/shared/hooks/useDailyRecordQuery';
import {
  BoogleRecordCleanupError,
  createBoogleRecord,
} from '../utils/boogleRecordMutationUtils';

import type { CreateBoogleRecordParamTypes } from '../utils/boogleRecordMutationUtils';

export const useCreateBoogleRecordMutation = () => {
  const queryClient = useQueryClient();
  const replacementRecordIdByDateRef = useRef(new Map<string, number>());

  return useMutation({
    mutationFn: ({
      request,
      existingBoogleRecords,
    }: CreateBoogleRecordParamTypes) => {
      if (!request.hasBowel) {
        replacementRecordIdByDateRef.current.delete(request.regDate);

        return createBoogleRecord({ request, existingBoogleRecords });
      }

      const retainedReplacementRecordId =
        replacementRecordIdByDateRef.current.get(request.regDate);
      const replacementRecordId =
        retainedReplacementRecordId ??
        existingBoogleRecords.find(({ hasBowel }) => !hasBowel)?.id;

      if (replacementRecordId !== undefined) {
        replacementRecordIdByDateRef.current.set(
          request.regDate,
          replacementRecordId,
        );
      }

      return createBoogleRecord({
        request,
        existingBoogleRecords,
        replacementRecordId,
      });
    },
    onSuccess: async ({ record, removedRecordIds }, { request }) => {
      replacementRecordIdByDateRef.current.delete(request.regDate);
      removedRecordIds.forEach((recordId) => {
        queryClient.removeQueries({
          queryKey: getBoogleRecordQueryKey(recordId),
        });
      });
      queryClient.removeQueries({
        queryKey: getDailyRecordQueryKey(record.regDate),
        exact: true,
      });
      queryClient.setQueryData(getBoogleRecordQueryKey(record.id), record);

      await invalidateRecordRelatedQueries(queryClient);
    },
    onError: async (error, { request }) => {
      if (!(error instanceof BoogleRecordCleanupError)) return;

      await synchronizePartiallyCleanedRecordQueries(
        queryClient,
        request.regDate,
        error.removedRecordIds,
      );
    },
  });
};
