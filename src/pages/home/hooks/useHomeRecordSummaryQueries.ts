import { useCallback, useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getHomeRecordSummary } from '@/pages/home/apis/getHomeRecordSummary';
import { HOME_RECORD_SUMMARY_QUERY_KEY } from '@/pages/home/constants/homeQueryKeys';
import type { HomeRecordStatusMapTypes } from '@/pages/home/types/homeTypes';
import { getHomeRecordStatusMap } from '@/pages/home/utils/homeRecordSummaryMapper';

const useHomeRecordSummaryQueries = (baseDates: string[], range: number) => {
  const summaryQueries = useQueries({
    queries: baseDates.map((baseDate) => ({
      queryKey: [...HOME_RECORD_SUMMARY_QUERY_KEY, baseDate, range],
      queryFn: () => getHomeRecordSummary({ baseDate, range }),
    })),
  });

  const recordStatusByDate = useMemo(
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
  const failedSummaryQuery = summaryQueries.find(({ isError }) => isError);
  const isLoading = summaryQueries.some(({ isLoading }) => isLoading);
  const refetchRecordSummaries = useCallback(async () => {
    const failedSummaryQueries = summaryQueries.filter(
      ({ isError }) => isError,
    );

    await Promise.all(failedSummaryQueries.map(({ refetch }) => refetch()));
  }, [summaryQueries]);

  return {
    recordStatusByDate,
    isLoading,
    isError: Boolean(failedSummaryQuery),
    error: failedSummaryQuery?.error ?? null,
    refetchRecordSummaries,
  };
};

export default useHomeRecordSummaryQueries;
