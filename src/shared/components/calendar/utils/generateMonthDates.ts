import dayjs, { type Dayjs } from 'dayjs';
import type { CalendarDateCellTypes } from '@/shared/components/calendar/types/calendarTypes';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const generateMonthDates = (
  currentDate: Dayjs,
  todayDate?: string,
): CalendarDateCellTypes[] => {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const today = todayDate ? dayjs(todayDate) : dayjs();
  const totalDays = endOfMonth.diff(startOfMonth, 'day') + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const date = startOfMonth.add(index, 'day');
    const dayOfWeek = date.day();

    return {
      date: date.format(DATE_FORMAT),
      day: date.date(),
      isFutureDate: date.isAfter(today, 'day'),
      isToday: date.isSame(today, 'day'),
      isSunday: dayOfWeek === 0,
      isSaturday: dayOfWeek === 6,
    };
  });
};
