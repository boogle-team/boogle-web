import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLifeRecord } from '../apis/postLifeRecord';

import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';

export const usePostLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLifeRecord,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: LIFE_RECORD_TODAY_TAGS_QUERY_KEY,
      });
    },
  });
};
