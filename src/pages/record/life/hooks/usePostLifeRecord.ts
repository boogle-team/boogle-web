import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLifeRecord } from '../apis/postLifeRecord';

import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';

export const usePostLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLifeRecord,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
    },
  });
};
