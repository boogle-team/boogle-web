import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getHomeRecordSummary } from '@/pages/home/apis/getHomeRecordSummary';
import type { HomeRecordStatusMapTypes } from '@/pages/home/types/homeTypes';
import { getHomeRecordStatusMap } from '@/pages/home/utils/homeRecordSummaryMapper';

export const HOME_RECORD_SUMMARY_QUERY_KEY = 'homeRecordSummary';

const useHomeRecordSummaryQueries = (baseDates: string[], range: number) => {
  const summaryQueries = useQueries({
    queries: baseDates.map((baseDate) => ({
      queryKey: [HOME_RECORD_SUMMARY_QUERY_KEY, baseDate, range],
      queryFn: () => getHomeRecordSummary({ baseDate, range }),
    })),
  });

  return useMemo(
    () =>
      summaryQueries.reduce<HomeRecordStatusMapTypes>(
        (recordStatusMap, { data }) => {
          if (!data) return recordStatusMap;

          return {
            ...recordStatusMap,
            ...getHomeRecordStatusMap(data.days),
          };
        },
        {},
      ),
    [summaryQueries],
  );
};

export default useHomeRecordSummaryQueries;
