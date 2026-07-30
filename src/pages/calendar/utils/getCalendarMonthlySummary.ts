import type { Dayjs } from 'dayjs';
import {
  generateMonthDates,
  type CalendarRecordMapTypes,
} from '@/shared/components/calendar';
import { CALENDAR_MARK_TYPE } from '@/pages/calendar/constants/calendarMarkConfig';
import type { CalendarMonthlySummaryTypes } from '@/pages/calendar/types/calendarSummaryTypes';

const EMPTY_SUMMARY: CalendarMonthlySummaryTypes = {
  recordedDayCount: 0,
  noBowelDayCount: 0,
  unrecordedDayCount: 0,
};

interface GetCalendarMonthlySummaryParamTypes {
  currentDate: Dayjs;
  todayDate: string;
  recordMap: CalendarRecordMapTypes;
}

// 아직 오지 않은 날짜는 미기록으로 세지 않는다.
export const getCalendarMonthlySummary = ({
  currentDate,
  todayDate,
  recordMap,
}: GetCalendarMonthlySummaryParamTypes): CalendarMonthlySummaryTypes =>
  generateMonthDates(
    currentDate,
    todayDate,
  ).reduce<CalendarMonthlySummaryTypes>((summary, { date, isFutureDate }) => {
    if (isFutureDate) return summary;

    const marks = recordMap[date]?.marks ?? [];

    if (marks.includes(CALENDAR_MARK_TYPE.NO_BOWEL)) {
      return { ...summary, noBowelDayCount: summary.noBowelDayCount + 1 };
    }

    if (marks.length > 0) {
      return { ...summary, recordedDayCount: summary.recordedDayCount + 1 };
    }

    return { ...summary, unrecordedDayCount: summary.unrecordedDayCount + 1 };
  }, EMPTY_SUMMARY);
