import dayjs from 'dayjs';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export interface CalendarDateHeaderLabelTypes {
  monthDayLabel: string;
  weekdayLabel: string;
}

export const formatCalendarDateHeader = (
  date: string,
): CalendarDateHeaderLabelTypes => {
  const selectedDate = dayjs(date);

  return {
    monthDayLabel: `${selectedDate.month() + 1}월 ${selectedDate.date()}일`,
    weekdayLabel: `${WEEKDAY_LABELS[selectedDate.day()]}요일`,
  };
};
