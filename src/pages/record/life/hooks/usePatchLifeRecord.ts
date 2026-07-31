import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchLifeRecord } from '../apis/patchLifeRecord';

import { LIFE_RECORD_QUERY_KEY } from './useLifeRecord';
import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';

export const usePatchLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLifeRecord,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...LIFE_RECORD_QUERY_KEY, variables.lifeId],
      });
    },
  });
};
