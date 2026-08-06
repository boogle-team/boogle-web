import type {
  MonthlyPatternRuleCodeTypes,
  MonthlyReportDataResponseTypes,
} from '../types/reportApiTypes';
import type {
  InsufficientReportTypes,
  MonthlyReportViewDataTypes,
  PatternTypes,
} from '../types/reportTypes';
import { mapMonthlyWeeklyTrends } from './reportViewDataMappers';

const STOOL_COLOR_CLASS_NAME = {
  H: 'bg-yellow-6',
  M: 'bg-orange-6',
  T: 'bg-semantic-danger',
} as const;

const MONTHLY_PATTERN_ICON_MAP: Record<
  MonthlyPatternRuleCodeTypes,
  PatternTypes['icon']
> = {
  MONTHLY_HARD_STOOL_RATIO: 'package',
  MONTHLY_LOW_SLEEP: 'moon',
  MONTHLY_LOW_WATER_WITH_HARD_STOOL: 'droplet',
  MONTHLY_STRESS_WITH_PAIN: 'frown',
};

const formatNumber = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(1);

export const mapMonthlyReportViewData = (
  report: MonthlyReportDataResponseTypes,
): MonthlyReportViewDataTypes | null => {
  if (report.dataStatus !== 'ENOUGH' || !report.summary) {
    return null;
  }

  return {
    conditionScore: report.summary.conditionScore,
    scores: [
      { label: '기록 완성도', value: report.summary.completionScore },
      { label: '리듬 안정도', value: report.summary.rhythmScore },
      { label: '상태 안정도', value: report.summary.stateScore },
    ],
    summaries: [
      {
        description: '이번 달',
        isHighlighted: true,
        label: '배변 횟수',
        value: `${formatNumber(report.summary.bowelCount)}회`,
      },
      {
        description: '평균 간격',
        label: '평균 간격',
        value: `${formatNumber(report.summary.intervalAvg)}일`,
      },
      {
        description: '기록 완성도',
        label: '기록 완성도',
        value: `${formatNumber(report.summary.completionScore)}%`,
      },
    ],
    weeklyTrends: mapMonthlyWeeklyTrends(report.weeklyTrend),
    conditionProgress: report.stoolDistribution.map(
      ({ label, ratio, stoolSimple }) => ({
        colorClassName: STOOL_COLOR_CLASS_NAME[stoolSimple],
        label,
        value: ratio,
      }),
    ),
    monthlyType: report.userType
      ? {
          description: report.userType.description,
          symbol: report.userType.code,
          title: report.userType.name,
        }
      : null,
    patterns: report.patternCards.map(({ description, ruleCode, title }) => ({
      description,
      icon: MONTHLY_PATTERN_ICON_MAP[ruleCode],
      title,
    })),
    improvements: report.improvements.map(({ description, title }) => ({
      description,
      icon: 'chart',
      title,
    })),
    isPdfDownloadAvailable: report.pdf.downloadAvailable,
  };
};

export const mapMonthlyInsufficientReport = (
  report: MonthlyReportDataResponseTypes,
): InsufficientReportTypes => {
  const currentCount = report.recordStats.recordedDays;

  return {
    currentCount,
    description: report.notice?.message ?? '',
    minimumRequiredCount: report.recordStats.requiredDays,
    requiredCount: report.recordStats.totalDays,
  };
};
