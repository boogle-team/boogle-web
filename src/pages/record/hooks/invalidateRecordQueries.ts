import type { QueryClient } from '@tanstack/react-query';

import { CALENDAR_MONTH_QUERY_KEY } from '@/pages/calendar/hooks/useCalendarMonthQuery';
import {
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
} from '@/pages/home/constants/homeQueryKeys';
import { DAILY_RECORD_QUERY_KEY } from '@/shared/hooks/useDailyRecordQuery';

const RECORD_RELATED_QUERY_KEYS = [
  HOME_QUERY_KEY,
  HOME_RECORD_SUMMARY_QUERY_KEY,
  DAILY_RECORD_QUERY_KEY,
  [CALENDAR_MONTH_QUERY_KEY],
] as const;

/** 부글 기록 변경 후 홈과 캘린더가 최신 데이터를 다시 조회하도록 한다. */
export const invalidateRecordRelatedQueries = (queryClient: QueryClient) => {
  RECORD_RELATED_QUERY_KEYS.forEach((queryKey) => {
    void queryClient.invalidateQueries({ queryKey });
  });
};
