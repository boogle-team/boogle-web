import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBoogleRecord } from '../apis/boogleRecordApis';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';

export const useDeleteBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoogleRecord,
    onSuccess: (_, recordId) => {
      queryClient.removeQueries({
        queryKey: getBoogleRecordQueryKey(recordId),
      });
      void queryClient.invalidateQueries({ queryKey: ['home'] });
      void queryClient.invalidateQueries({
        queryKey: ['calendarDailyRecord'],
      });
    },
  });
};
