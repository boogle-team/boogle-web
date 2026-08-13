import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchLifeRecord } from '../apis/patchLifeRecord';

import { LIFE_RECORD_QUERY_KEY } from './useLifeRecord';
import { LIFE_RECORDS_QUERY_KEY } from './useLifeRecords';
import { LIFE_RECORD_TODAY_TAGS_QUERY_KEY } from './useTodayLifeRecordTags';
import { invalidateRecordRelatedQueries } from '../../hooks/invalidateRecordQueries';
import { getDailyRecordQueryKey } from '@/shared/hooks/useDailyRecordQuery';

export const usePatchLifeRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLifeRecord,
    onSuccess: async (lifeRecord, variables) => {
      const recordDate = lifeRecord.regDate.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

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
        queryClient.invalidateQueries({
          queryKey: [...LIFE_RECORD_QUERY_KEY, variables.lifeId],
        }),
      ]);
    },
  });
};
