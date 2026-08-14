import { useQuery } from '@tanstack/react-query';

import { getMonthlyReport } from '../apis/reportApis';

export const MONTHLY_REPORT_QUERY_KEY = ['reports', 'monthly'] as const;

export const getMonthlyReportQueryKey = (monthStartDate: string) =>
  [...MONTHLY_REPORT_QUERY_KEY, monthStartDate] as const;

const useMonthlyReportQuery = (monthStartDate: string) => {
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: getMonthlyReportQueryKey(monthStartDate),
    queryFn: () =>
      getMonthlyReport({
        includePattern: true,
        monthStartDate,
      }),
    enabled: Boolean(monthStartDate),
  });

  return {
    monthlyReport: data?.data ?? null,
    isError,
    isFetching,
    isLoading,
    refetch,
  };
};

export default useMonthlyReportQuery;
