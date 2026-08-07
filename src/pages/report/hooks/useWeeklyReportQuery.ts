import { useQuery } from '@tanstack/react-query';

import { getWeeklyReport } from '../apis/reportApis';

export const WEEKLY_REPORT_QUERY_KEY = ['reports', 'weekly'] as const;

export const getWeeklyReportQueryKey = (weekStartDate: string) =>
  [...WEEKLY_REPORT_QUERY_KEY, weekStartDate] as const;

const useWeeklyReportQuery = (weekStartDate: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: getWeeklyReportQueryKey(weekStartDate),
    queryFn: () =>
      getWeeklyReport({
        weekStartDate,
        includeGuide: true,
      }),
    enabled: Boolean(weekStartDate),
  });

  return {
    weeklyReport: data?.data ?? null,
    isError,
    isLoading,
    refetch,
  };
};

export default useWeeklyReportQuery;
