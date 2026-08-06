import { api } from '@/shared/apis/axiosInstance';
import type { CalendarDailyRecordResponseTypes } from '@/shared/components/calendar/types/calendarRecordTypes';

export const getCalendarDailyRecord = async (date: string) => {
  const { data } = await api.get<CalendarDailyRecordResponseTypes>(
    '/api/v1/calendar/daily',
    { params: { date } },
  );

  return data.data;
};
