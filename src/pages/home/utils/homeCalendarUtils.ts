import type { CalendarRecordMapTypes } from '@/shared/components/calendar';
import { HOME_RECORD_STATUS_MARK_MAP } from '../constants/homeCalendarConfig';
import type { HomeRecordStatusMapTypes } from '../types/homeTypes';

export const getCalendarRecordMapFromHomeStatus = (
  recordStatusByDate: HomeRecordStatusMapTypes,
): CalendarRecordMapTypes =>
  Object.entries(recordStatusByDate).reduce<CalendarRecordMapTypes>(
    (recordMap, [date, recordStatus]) => {
      const marks = HOME_RECORD_STATUS_MARK_MAP[recordStatus];

      if (marks.length > 0) {
        recordMap[date] = { marks };
      }

      return recordMap;
    },
    {},
  );
