import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoogleRecord } from '../apis/boogleRecordApis';

export const useCreateBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoogleRecord,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['home'] });
      void queryClient.invalidateQueries({
        queryKey: ['calendarDailyRecord'],
      });
    },
  });
};
