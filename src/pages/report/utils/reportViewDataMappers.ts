import type { MonthlyWeeklyTrendResponseTypes } from '../types/reportApiTypes';
import type { WeeklyTrendTypes } from '../types/reportTypes';

const DEFAULT_WEEK_COUNT = 4;

export const mapMonthlyWeeklyTrends = (
  weeklyTrend: MonthlyWeeklyTrendResponseTypes[] = [],
  weekCount = DEFAULT_WEEK_COUNT,
): WeeklyTrendTypes[] => {
  const weeklyBowelCountByIndex = new Map(
    weeklyTrend.map(({ bowelCount, weekIndex }) => [weekIndex, bowelCount]),
  );

  return Array.from({ length: weekCount }, (_, index) => {
    const weekIndex = index + 1;

    return {
      count: weeklyBowelCountByIndex.get(weekIndex) ?? 0,
      week: `${weekIndex}주`,
    };
  });
};
