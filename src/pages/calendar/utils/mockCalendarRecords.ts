import type { Dayjs } from 'dayjs';
import type {
  CalendarMarkTypes,
  CalendarRecordMapTypes,
} from '../types/calendarTypes';
import { DATE_FORMAT } from './generateMonthDates';

// TODO: 실제 기록 API 연동 후 이 목데이터 생성 로직은 제거한다.
const getMarksForDay = (day: number): CalendarMarkTypes[] => {
  if (day % 5 === 0) return ['noBowel'];
  if (day % 2 === 1 && day <= 20)
    return day === 13 ? ['boogle', 'life'] : ['boogle'];
  return [];
};

export const getMockCalendarRecords = (
  currentDate: Dayjs,
): CalendarRecordMapTypes => {
  const daysInMonth = currentDate.daysInMonth();

  return Array.from(
    { length: daysInMonth },
    (_, index) => index + 1,
  ).reduce<CalendarRecordMapTypes>((recordMap, day) => {
    const marks = getMarksForDay(day);
    if (marks.length === 0) return recordMap;

    const date = currentDate.date(day).format(DATE_FORMAT);
    recordMap[date] = { marks };
    return recordMap;
  }, {});
};
