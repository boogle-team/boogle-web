import type { QueryClient } from '@tanstack/react-query';

import { CALENDAR_MONTH_QUERY_KEY } from '@/pages/calendar/hooks/useCalendarMonthQuery';
import {
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
} from '@/pages/home/constants/homeQueryKeys';
import { MONTHLY_REPORT_QUERY_KEY } from '@/pages/report/hooks/useMonthlyReportQuery';
import { WEEKLY_REPORT_QUERY_KEY } from '@/pages/report/hooks/useWeeklyReportQuery';
import { DAILY_RECORD_QUERY_KEY } from '@/shared/hooks/useDailyRecordQuery';

const RECORD_RELATED_QUERY_KEYS = [
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
  DAILY_RECORD_QUERY_KEY,
  [CALENDAR_MONTH_QUERY_KEY],
  WEEKLY_REPORT_QUERY_KEY,
  MONTHLY_REPORT_QUERY_KEY,
] as const;

/** 기록 변경 후 홈, 캘린더, 리포트가 최신 데이터를 다시 조회하도록 한다. */
export const invalidateRecordRelatedQueries = (queryClient: QueryClient) => {
  RECORD_RELATED_QUERY_KEYS.forEach((queryKey) => {
    void queryClient.invalidateQueries({ queryKey });
  });
};
