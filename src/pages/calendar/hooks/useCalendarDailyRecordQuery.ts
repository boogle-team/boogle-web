import { useQuery } from '@tanstack/react-query';

import { isFutureDate } from '@/shared/components/dailyRecord';
import { getCalendarDailyRecord } from '@/pages/calendar/apis/getCalendarDailyRecord';

export const CALENDAR_DAILY_RECORD_QUERY_KEY = 'calendarDailyRecord';

const useCalendarDailyRecordQuery = (date: string) =>
  useQuery({
    queryKey: [CALENDAR_DAILY_RECORD_QUERY_KEY, date],
    queryFn: () => getCalendarDailyRecord(date),
    // 미래 날짜는 기록이 존재할 수 없고 화면도 클라이언트에서 future 상태로 그리므로 호출하지 않는다.
    enabled: !isFutureDate(date),
  });

export default useCalendarDailyRecordQuery;
