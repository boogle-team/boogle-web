import { useQuery } from '@tanstack/react-query';

import { getWeeklyReport } from '../apis/reportApis';

export const WEEKLY_REPORT_QUERY_KEY = 'weeklyReport';

const useWeeklyReportQuery = (weekStartDate: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: [WEEKLY_REPORT_QUERY_KEY, weekStartDate],
    queryFn: () =>
      getWeeklyReport({
        weekStartDate,
        includeGuide: false,
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
