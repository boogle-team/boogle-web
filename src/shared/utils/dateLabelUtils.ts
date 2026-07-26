import dayjs from 'dayjs';

export const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

// '2026-05-18' → '월'
export const getWeekdayLabel = (dateValue: string) =>
  WEEKDAY_LABELS[dayjs(dateValue).day()];

// '2026-05-18' → '월요일'
export const getFullWeekdayLabel = (dateValue: string) =>
  `${getWeekdayLabel(dateValue)}요일`;

// '2026-05-18' → '5월 18일'
export const getMonthDayLabel = (dateValue: string) => {
  const date = dayjs(dateValue);

  return `${date.month() + 1}월 ${date.date()}일`;
};
