import dayjs, { type Dayjs } from 'dayjs';

export const HOME_DATE_FORMAT = 'YYYY-MM-DD';

type HomePickerDateDirectionTypes = 'past' | 'future';

export const getHomeDateValue = (date: Dayjs) => date.format(HOME_DATE_FORMAT);

export const isHomeToday = (dateValue: string, todayDate: string) =>
  dateValue === todayDate;

export const isHomeSaturday = (dateValue: string) =>
  dayjs(dateValue).day() === 6;

export const isHomeSunday = (dateValue: string) => dayjs(dateValue).day() === 0;

export const generateHomePickerDates = (
  selectedDateValue: string,
  sideDateCount = 30,
) => {
  const selectedDate = dayjs(selectedDateValue);
  const totalDateCount = sideDateCount * 2 + 1;

  return Array.from({ length: totalDateCount }, (_, index) =>
    getHomeDateValue(selectedDate.add(index - sideDateCount, 'day')),
  );
};

export const generateHomePickerDateBatch = (
  boundaryDateValue: string,
  direction: HomePickerDateDirectionTypes,
  dateCount = 30,
) => {
  const boundaryDate = dayjs(boundaryDateValue);
  const startingDayOffset = direction === 'past' ? -dateCount : 1;

  return Array.from({ length: dateCount }, (_, index) =>
    getHomeDateValue(boundaryDate.add(startingDayOffset + index, 'day')),
  );
};
