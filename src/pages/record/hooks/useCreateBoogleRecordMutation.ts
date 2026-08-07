import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBoogleRecord } from '../apis/boogleRecordApis';
import { invalidateRecordRelatedQueries } from './invalidateRecordQueries';

export const useCreateBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoogleRecord,
    onSuccess: () => {
      invalidateRecordRelatedQueries(queryClient);
    },
  });
};
