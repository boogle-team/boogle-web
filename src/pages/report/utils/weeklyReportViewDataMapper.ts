import type {
  BowelDayOfWeekTypes,
  PatternLevelTypes,
  WeeklyReportDataResponseTypes,
} from '../types/reportApiTypes';
import type {
  BowelRhythmTypes,
  InsufficientReportTypes,
  PatternTypes,
  WeeklyReportViewDataTypes,
} from '../types/reportTypes';

const WEEKDAYS: { dayOfWeek: BowelDayOfWeekTypes; label: string }[] = [
  { dayOfWeek: 'MON', label: '월' },
  { dayOfWeek: 'TUE', label: '화' },
  { dayOfWeek: 'WED', label: '수' },
  { dayOfWeek: 'THU', label: '목' },
  { dayOfWeek: 'FRI', label: '금' },
  { dayOfWeek: 'SAT', label: '토' },
  { dayOfWeek: 'SUN', label: '일' },
];

const STOOL_COLOR_CLASS_NAME = {
  H: 'bg-yellow-6',
  M: 'bg-orange-6',
  T: 'bg-semantic-danger',
} as const;

const getBowelRhythmStatus = (
  bowelCount: number,
): BowelRhythmTypes['status'] => {
  if (bowelCount === 0) return 'empty';
  if (bowelCount === 1) return 'normal';
  if (bowelCount === 2) return 'warning';
  return 'danger';
};

const getPatternIcon = (level: PatternLevelTypes): PatternTypes['icon'] => {
  if (level === 'GOOD' || level === 'OK') return 'check';
  if (level === 'INFO' || level === 'WARN') return 'warning';
  return 'danger';
};

const formatNumber = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(1);

const formatPreviousWeekDifference = (difference: number | null, unit = '') => {
  if (difference === null) return '비교 데이터 없음';
  if (difference === 0) return '동일';

  const sign = difference > 0 ? '+' : '';
  return `지난주 ${sign}${formatNumber(difference)}${unit}`;
};

export const mapWeeklyReportViewData = (
  report: WeeklyReportDataResponseTypes,
): WeeklyReportViewDataTypes | null => {
  if (report.dataStatus !== 'ENOUGH' || !report.summary) return null;

  const bowelCountByDay = new Map(
    report.bowelRhythmByDay.map(({ bowelCount, dayOfWeek }) => [
      dayOfWeek,
      bowelCount,
    ]),
  );
  const firstGuide = report.guides[0];

  return {
    summaries: [
      {
        description: formatPreviousWeekDifference(
          report.changeSummary?.bowelCountDiff ?? null,
        ),
        isHighlighted: true,
        label: '배변 횟수',
        value: `${formatNumber(report.summary.bowelCount)}회`,
      },
      {
        description: formatPreviousWeekDifference(
          report.changeSummary?.intervalAvgDiff ?? null,
          '일',
        ),
        label: '평균 간격',
        value: `${formatNumber(report.summary.intervalAvg)}일`,
      },
      {
        description: `${report.recordStats.recordedDays}/${report.recordStats.totalDays}일`,
        label: '기록 완성도',
        value: `${formatNumber(report.summary.completionScore)}%`,
      },
    ],
    conditionProgress: report.stoolDistribution.map(
      ({ label, ratio, stoolSimple }) => ({
        colorClassName: STOOL_COLOR_CLASS_NAME[stoolSimple],
        label,
        value: ratio,
      }),
    ),
    bowelRhythms: WEEKDAYS.map(({ dayOfWeek, label }) => {
      const bowelCount = bowelCountByDay.get(dayOfWeek) ?? 0;

      return {
        day: label,
        status: getBowelRhythmStatus(bowelCount),
      };
    }),
    frequentTimeSlotLabel: report.frequentTimeSlots[0]?.label ?? null,
    patterns: report.patternCards.map(({ description, level, title }) => ({
      description,
      icon: getPatternIcon(level),
      title,
    })),
    lifeGuide: firstGuide
      ? {
          description: firstGuide.content,
          feedbackStatus: firstGuide.feedbackStatus,
          guideContentId: firstGuide.guideContentId,
          title: firstGuide.title,
        }
      : null,
  };
};

export const mapWeeklyInsufficientReport = (
  report: WeeklyReportDataResponseTypes,
): InsufficientReportTypes => {
  const currentCount = report.recordedDays ?? report.recordStats.recordedDays;
  const minimumRequiredCount =
    report.requiredDays ?? report.recordStats.requiredDays;
  const requiredCount = report.recordStats.totalDays || 7;

  return {
    currentCount,
    description: report.insufficientNotice?.message ?? '',
    minimumRequiredCount,
    requiredCount,
  };
};
