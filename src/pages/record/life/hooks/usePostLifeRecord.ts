import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postLifeRecord } from '../apis/postLifeRecord';

import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';
import { invalidateRecordRelatedQueries } from '../../hooks/invalidateRecordQueries';
import { getDailyRecordQueryKey } from '@/shared/hooks/useDailyRecordQuery';

export const usePostLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLifeRecord,
    onSuccess: async (lifeRecord, requestBody) => {
      // 응답 regDate 형식이 흔들려도 캐시가 남지 않도록 요청에 쓴 날짜를 우선한다.
      const recordDate =
        requestBody.regDate ||
        lifeRecord.regDate.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

      if (recordDate) {
        queryClient.removeQueries({
          queryKey: getDailyRecordQueryKey(recordDate),
          exact: true,
        });
      }

      await Promise.all([
        invalidateRecordRelatedQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: LIFE_RECORDS_QUERY_KEY }),
        queryClient.invalidateQueries({
          queryKey: LIFE_RECORD_TODAY_TAGS_QUERY_KEY,
        }),
      ]);
    },
  });
};
