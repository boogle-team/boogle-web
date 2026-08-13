import type {
  MonthlyWeeklyTrendResponseTypes,
  StoolDistributionResponseTypes,
  StoolSimpleTypes,
} from '../types/reportApiTypes';
import type {
  ConditionProgressTypes,
  WeeklyTrendTypes,
} from '../types/reportTypes';

const DEFAULT_WEEK_COUNT = 4;

const STOOL_DISPLAY_ORDER: StoolSimpleTypes[] = ['M', 'H', 'T'];

const STOOL_COLOR_CLASS_NAME: Record<StoolSimpleTypes, string> = {
  H: 'bg-yellow-4',
  M: 'bg-orange-5',
  T: 'bg-semantic-danger',
};

export const mapStoolDistribution = (
  stoolDistribution: StoolDistributionResponseTypes[],
): ConditionProgressTypes[] =>
  [...stoolDistribution]
    .sort(
      (first, second) =>
        STOOL_DISPLAY_ORDER.indexOf(first.stoolSimple) -
        STOOL_DISPLAY_ORDER.indexOf(second.stoolSimple),
    )
    .map(({ label, ratio, stoolSimple }) => ({
      colorClassName: STOOL_COLOR_CLASS_NAME[stoolSimple],
      label,
      value: ratio,
    }));

export const mapMonthlyWeeklyTrends = (
  weeklyTrend: MonthlyWeeklyTrendResponseTypes[] = [],
): WeeklyTrendTypes[] => {
  const weekCount = Math.max(
    DEFAULT_WEEK_COUNT,
    ...weeklyTrend.map(({ weekIndex }) => weekIndex),
  );
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
