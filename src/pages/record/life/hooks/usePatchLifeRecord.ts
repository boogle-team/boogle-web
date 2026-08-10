import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchLifeRecord } from '../apis/patchLifeRecord';

import { LIFE_RECORD_QUERY_KEY } from './useLifeRecord';
import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';
import { invalidateRecordRelatedQueries } from '../../hooks/invalidateRecordQueries';

export const usePatchLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLifeRecord,
    onSuccess: (_, variables) => {
      invalidateRecordRelatedQueries(queryClient);
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: LIFE_RECORD_TODAY_TAGS_QUERY_KEY,
      });
      void queryClient.invalidateQueries({
        queryKey: [...LIFE_RECORD_QUERY_KEY, variables.lifeId],
      });
    },
  });
};
