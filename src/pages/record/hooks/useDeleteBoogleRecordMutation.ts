import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  invalidateRecordRelatedQueries,
  synchronizePartiallyCleanedRecordQueries,
} from './invalidateRecordQueries';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';
import { getDailyRecordQueryKey } from '@/shared/hooks/useDailyRecordQuery';
import {
  BoogleRecordCleanupError,
  deleteBoogleRecordWithCleanup,
} from '../utils/boogleRecordMutationUtils';

import type { BoogleRecordTypes } from '@/shared/components/dailyRecord';

interface DeleteBoogleRecordMutationParamTypes {
  recordId: number;
  recordDate: string;
  existingBoogleRecords: BoogleRecordTypes[];
}

export const useDeleteBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recordId,
      existingBoogleRecords,
    }: DeleteBoogleRecordMutationParamTypes) =>
      deleteBoogleRecordWithCleanup({ recordId, existingBoogleRecords }),
    onSuccess: async ({ removedRecordIds }, { recordDate }) => {
      removedRecordIds.forEach((recordId) => {
        queryClient.removeQueries({
          queryKey: getBoogleRecordQueryKey(recordId),
        });
      });
      queryClient.removeQueries({
        queryKey: getDailyRecordQueryKey(recordDate),
        exact: true,
      });

      await invalidateRecordRelatedQueries(queryClient);
    },
    onError: async (error, { recordDate }) => {
      if (!(error instanceof BoogleRecordCleanupError)) return;

      await synchronizePartiallyCleanedRecordQueries(
        queryClient,
        recordDate,
        error.removedRecordIds,
      );
    },
  });
};
