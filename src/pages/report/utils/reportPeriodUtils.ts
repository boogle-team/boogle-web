import {
  BASE_REPORT_DATE,
  MILLISECONDS_PER_DAY,
} from '../constants/reportConstants';
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

const getMonthDistance = (date: Date) =>
  (date.getFullYear() - BASE_REPORT_DATE.getFullYear()) * 12 +
  date.getMonth() -
  BASE_REPORT_DATE.getMonth();

const getWeekDistance = (date: Date) => {
  const baseWeekStartDate = getWeekStartDate(BASE_REPORT_DATE);
  const currentWeekStartDate = getWeekStartDate(date);

  return Math.round(
    (currentWeekStartDate.getTime() - baseWeekStartDate.getTime()) /
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

  return '';
};

const getMonthDayText = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

export const getPeriodText = (
  selectedMode: ReportModeTypes,
  currentPeriodDate: Date,
): ReportPeriodTextTypes => {
  if (selectedMode === 'weekly') {
    const weekStartDate = getWeekStartDate(currentPeriodDate);
    const weekEndDate = addDays(weekStartDate, 6);

    return {
      description: `${getMonthDayText(weekStartDate)} - ${getMonthDayText(
        weekEndDate,
      )}`,
      title: getRelativeTitle(getWeekDistance(currentPeriodDate), '주'),
    };
  }

  return {
    description: `${currentPeriodDate.getFullYear()}년 ${
      currentPeriodDate.getMonth() + 1
    }월`,
    title: getRelativeTitle(getMonthDistance(currentPeriodDate), '달'),
  };
};
