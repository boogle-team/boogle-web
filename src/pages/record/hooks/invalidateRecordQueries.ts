import type { QueryClient } from '@tanstack/react-query';

import { CALENDAR_MONTH_QUERY_KEY } from '@/pages/calendar/hooks/useCalendarMonthQuery';
import {
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
} from '@/pages/home/constants/homeQueryKeys';
import { MONTHLY_REPORT_QUERY_KEY } from '@/pages/report/hooks/useMonthlyReportQuery';
import { WEEKLY_REPORT_QUERY_KEY } from '@/pages/report/hooks/useWeeklyReportQuery';
import {
  DAILY_RECORD_QUERY_KEY,
  getDailyRecordQueryKey,
} from '@/shared/hooks/useDailyRecordQuery';
import { getBoogleRecordQueryKey } from './useBoogleRecordQuery';

const RECORD_RELATED_QUERY_KEYS = [
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
  DAILY_RECORD_QUERY_KEY,
  [CALENDAR_MONTH_QUERY_KEY],
  WEEKLY_REPORT_QUERY_KEY,
  MONTHLY_REPORT_QUERY_KEY,
] as const;

/** 부글 기록 변경 후 홈, 캘린더, 리포트가 최신 데이터를 다시 조회하도록 한다. */
export const invalidateRecordRelatedQueries = (queryClient: QueryClient) => {
  return Promise.all(
    RECORD_RELATED_QUERY_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    ),
  );
};

export const synchronizePartiallyCleanedRecordQueries = async (
  queryClient: QueryClient,
  recordDate: string,
  removedRecordIds: number[],
) => {
  removedRecordIds.forEach((recordId) => {
    queryClient.removeQueries({
      queryKey: getBoogleRecordQueryKey(recordId),
    });
  });
  queryClient.removeQueries({
    queryKey: getDailyRecordQueryKey(recordDate),
    exact: true,
  });

  await invalidateRecordRelatedQueries(queryClient);
};
