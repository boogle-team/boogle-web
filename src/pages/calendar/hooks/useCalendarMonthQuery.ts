import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCalendarMonth } from '@/pages/calendar/apis/getCalendarMonth';
import type { CalendarMonthParamTypes } from '@/pages/calendar/types/calendarMonthTypes';

export const CALENDAR_MONTH_QUERY_KEY = 'calendarMonth';

const useCalendarMonthQuery = ({ year, month }: CalendarMonthParamTypes) =>
  useQuery({
    queryKey: [CALENDAR_MONTH_QUERY_KEY, year, month],
    queryFn: () => getCalendarMonth({ year, month }),
    // 월 이동 시 이전 달 점이 유지돼 그리드가 빈 상태로 깜빡이지 않는다.
    placeholderData: keepPreviousData,
  });

export default useCalendarMonthQuery;
