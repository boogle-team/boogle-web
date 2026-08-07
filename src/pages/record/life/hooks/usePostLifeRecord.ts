import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLifeRecord } from '../apis/postLifeRecord';

import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';
import {
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
} from '@/pages/home/constants/homeQueryKeys';
import { DAILY_RECORD_QUERY_KEY } from '@/shared/hooks/useDailyRecordQuery';

export const usePostLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLifeRecord,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: DAILY_RECORD_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: HOME_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: HOME_RECORD_SUMMARY_QUERY_KEY,
      });
      void queryClient.invalidateQueries({
        queryKey: LIFE_RECORD_TODAY_TAGS_QUERY_KEY,
      });
    },
  });
};
