import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchBoogleRecord } from '../apis/boogleRecordApis';

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
      queryClient.setQueryData(['boogleRecord', record.id], record);
      void queryClient.invalidateQueries({ queryKey: ['home'] });
      void queryClient.invalidateQueries({
        queryKey: ['calendarDailyRecord'],
      });
    },
  });
};
