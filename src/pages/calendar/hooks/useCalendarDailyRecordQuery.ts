import { useQuery } from '@tanstack/react-query';

import { getCalendarDailyRecord } from '@/pages/calendar/apis/getCalendarDailyRecord';

export const CALENDAR_DAILY_RECORD_QUERY_KEY = 'calendarDailyRecord';

const useCalendarDailyRecordQuery = (date: string) =>
  useQuery({
    queryKey: [CALENDAR_DAILY_RECORD_QUERY_KEY, date],
    queryFn: () => getCalendarDailyRecord(date),
  });

export default useCalendarDailyRecordQuery;
