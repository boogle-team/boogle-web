import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/shared/components/calendar';

export const getCalendarSelectedDate = (
  dateParam: string | null,
  todayDate: string,
) => {
  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return todayDate;
  }

  const parsedDate = dayjs(dateParam);

  return parsedDate.isValid() && parsedDate.format(DATE_FORMAT) === dateParam
    ? dateParam
    : todayDate;
};
