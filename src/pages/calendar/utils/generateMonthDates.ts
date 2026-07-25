import dayjs, { type Dayjs } from 'dayjs';
import type { CalendarDateCellTypes } from '../types/calendarTypes';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const generateMonthDates = (
  currentDate: Dayjs,
): CalendarDateCellTypes[] => {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfGrid = startOfMonth.startOf('week');
  const endOfGrid = endOfMonth.endOf('week');

  const today = dayjs();
  const totalDays = endOfGrid.diff(startOfGrid, 'day') + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const date = startOfGrid.add(index, 'day');
    const dayOfWeek = date.day();

    return {
      date: date.format(DATE_FORMAT),
      day: date.date(),
      isCurrentMonth: date.isSame(currentDate, 'month'),
      isToday: date.isSame(today, 'day'),
      isSunday: dayOfWeek === 0,
      isSaturday: dayOfWeek === 6,
    };
  });
};
