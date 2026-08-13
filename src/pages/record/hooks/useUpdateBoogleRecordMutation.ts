import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invalidateRecordRelatedQueries } from './invalidateRecordQueries';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';
import { getDailyRecordQueryKey } from '@/shared/hooks/useDailyRecordQuery';
import { updateBoogleRecord } from '../utils/boogleRecordMutationUtils';

export const useUpdateBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBoogleRecord,
    onSuccess: async (record) => {
      queryClient.setQueryData(getBoogleRecordQueryKey(record.id), record);
      queryClient.removeQueries({
        queryKey: getDailyRecordQueryKey(record.regDate),
        exact: true,
      });

      await invalidateRecordRelatedQueries(queryClient);
    },
  });
};
