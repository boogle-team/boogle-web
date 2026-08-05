import type {
  CalendarMarkTypes,
  CalendarRecordMapTypes,
} from '@/shared/components/calendar';
import type { CalendarMonthDayTypes } from '@/pages/calendar/types/calendarMonthTypes';

export const toCalendarRecordMap = (
  days: CalendarMonthDayTypes[],
): CalendarRecordMapTypes =>
  days.reduce<CalendarRecordMapTypes>(
    (recordMap, { date, boogleStatus, hasLifeRecord }) => {
      const marks: CalendarMarkTypes[] = [];

      if (boogleStatus === 'BOWEL') marks.push('boogle');
      if (hasLifeRecord) marks.push('life');
      if (boogleStatus === 'NO_BOWEL') marks.push('noBowel');

      if (marks.length === 0) return recordMap;

      recordMap[date] = { marks };
      return recordMap;
    },
    {},
  );
