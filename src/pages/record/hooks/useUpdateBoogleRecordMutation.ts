import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBoogleRecord } from '../apis/boogleRecordApis';
import { invalidateRecordRelatedQueries } from './invalidateRecordQueries';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';

import type { PatchBoogleRecordRequestTypes } from '../types/boogleRecordApiTypes';

interface UpdateBoogleRecordMutationParamTypes {
  recordId: number;
  request: PatchBoogleRecordRequestTypes;
}

export const useUpdateBoogleRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recordId, request }: UpdateBoogleRecordMutationParamTypes) =>
      patchBoogleRecord(recordId, request),
    onSuccess: (record) => {
      queryClient.setQueryData(getBoogleRecordQueryKey(record.id), record);
      invalidateRecordRelatedQueries(queryClient);
    },
  });
};
