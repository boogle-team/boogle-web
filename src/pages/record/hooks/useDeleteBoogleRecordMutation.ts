import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteBoogleRecord } from '../apis/boogleRecordApis';
import { invalidateRecordRelatedQueries } from './invalidateRecordQueries';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';

export const useDeleteBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoogleRecord,
    onSuccess: (_, recordId) => {
      queryClient.removeQueries({
        queryKey: getBoogleRecordQueryKey(recordId),
      });
      invalidateRecordRelatedQueries(queryClient);
    },
  });
};
