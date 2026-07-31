import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBoogleRecord } from '../apis/boogleRecordApis';

export const useDeleteBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoogleRecord,
    onSuccess: (_, recordId) => {
      queryClient.removeQueries({ queryKey: ['boogleRecord', recordId] });
      void queryClient.invalidateQueries({ queryKey: ['home'] });
      void queryClient.invalidateQueries({
        queryKey: ['calendarDailyRecord'],
      });
    },
  });
};
