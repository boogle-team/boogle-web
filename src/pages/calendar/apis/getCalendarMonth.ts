import { api } from '@/shared/apis/axiosInstance';
import type {
  CalendarMonthParamTypes,
  CalendarMonthResponseTypes,
} from '@/pages/calendar/types/calendarMonthTypes';

export const getCalendarMonth = async ({
  year,
  month,
}: CalendarMonthParamTypes) => {
  const { data } = await api.get<CalendarMonthResponseTypes>(
    '/api/v1/calendar',
    { params: { year, month } },
  );

  return data.data;
};
