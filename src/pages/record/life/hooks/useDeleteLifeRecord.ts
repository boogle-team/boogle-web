import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLifeRecord } from '../apis/deleteLifeRecord';

import { LIFE_RECORD_QUERY_KEY } from './useLifeRecord';
import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';
import { invalidateRecordRelatedQueries } from '../../hooks/invalidateRecordQueries';

export const useDeleteLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLifeRecord,
    onSuccess: (_, lifeId) => {
      invalidateRecordRelatedQueries(queryClient);
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: LIFE_RECORD_TODAY_TAGS_QUERY_KEY,
      });
      queryClient.removeQueries({
        queryKey: [...LIFE_RECORD_QUERY_KEY, lifeId],
      });
    },
  });
};
