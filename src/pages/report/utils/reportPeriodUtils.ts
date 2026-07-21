import { MILLISECONDS_PER_DAY } from '../constants/reportConstants';
import type {
  ReportModeTypes,
  ReportPeriodTextTypes,
} from '../types/reportTypes';

export const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
};

export const addMonths = (date: Date, months: number) => {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);

  return nextDate;
};

const getWeekStartDate = (date: Date) => {
  const weekStartDate = new Date(date);
  const day = weekStartDate.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;
  weekStartDate.setDate(weekStartDate.getDate() - daysFromMonday);

  return weekStartDate;
};

const getMonthDistance = (date: Date, comparisonDate: Date) =>
  (date.getFullYear() - comparisonDate.getFullYear()) * 12 +
  date.getMonth() -
  comparisonDate.getMonth();

const getWeekDistance = (date: Date, comparisonDate: Date) => {
  const comparisonWeekStartDate = getWeekStartDate(comparisonDate);
  const currentWeekStartDate = getWeekStartDate(date);

  return Math.round(
    (currentWeekStartDate.getTime() - comparisonWeekStartDate.getTime()) /
      (MILLISECONDS_PER_DAY * 7),
  );
};

const getRelativeTitle = (distance: number, unit: '주' | '달') => {
  if (distance === -1) {
    return `지난 ${unit}`;
  }

  if (distance === 0) {
    return `이번 ${unit}`;
  }

  if (distance === 1) {
    return `다음 ${unit}`;
  }

  return distance < 0
    ? `${Math.abs(distance)}${unit} 전`
    : `${distance}${unit} 후`;
};

const getMonthDayText = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

const getDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getReportDateRange = (
  selectedMode: ReportModeTypes,
  currentPeriodDate: Date,
) => {
  if (selectedMode === 'weekly') {
    const weekStartDate = getWeekStartDate(currentPeriodDate);
    const weekEndDate = addDays(weekStartDate, 6);

    return {
      endDate: getDateValue(weekEndDate),
      startDate: getDateValue(weekStartDate),
    };
  }

  const monthStartDate = new Date(
    currentPeriodDate.getFullYear(),
    currentPeriodDate.getMonth(),
    1,
  );
  const monthEndDate = new Date(
    currentPeriodDate.getFullYear(),
    currentPeriodDate.getMonth() + 1,
    0,
  );

  return {
    endDate: getDateValue(monthEndDate),
    startDate: getDateValue(monthStartDate),
  };
};

export const getPeriodText = (
  selectedMode: ReportModeTypes,
  currentPeriodDate: Date,
  comparisonDate = new Date(),
): ReportPeriodTextTypes => {
  if (selectedMode === 'weekly') {
    const weekStartDate = getWeekStartDate(currentPeriodDate);
    const weekEndDate = addDays(weekStartDate, 6);

    return {
      description: `${getMonthDayText(weekStartDate)} - ${getMonthDayText(
        weekEndDate,
      )}`,
      title: getRelativeTitle(
        getWeekDistance(currentPeriodDate, comparisonDate),
        '주',
      ),
    };
  }

  return {
    description: `${currentPeriodDate.getFullYear()}년 ${
      currentPeriodDate.getMonth() + 1
    }월`,
    title: getRelativeTitle(
      getMonthDistance(currentPeriodDate, comparisonDate),
      '달',
    ),
  };
};
