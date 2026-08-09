import type {
  BowelDayOfWeekTypes,
  PatternLevelTypes,
  StoolSimpleTypes,
  WeeklyReportDataResponseTypes,
} from '../types/reportApiTypes';
import type {
  BowelRhythmTypes,
  InsufficientReportTypes,
  PatternTypes,
  WeeklyReportViewDataTypes,
} from '../types/reportTypes';
import { mapStoolDistribution } from './reportViewDataMappers';

const WEEKDAYS: { dayOfWeek: BowelDayOfWeekTypes; label: string }[] = [
  { dayOfWeek: 'MON', label: '월' },
  { dayOfWeek: 'TUE', label: '화' },
  { dayOfWeek: 'WED', label: '수' },
  { dayOfWeek: 'THU', label: '목' },
  { dayOfWeek: 'FRI', label: '금' },
  { dayOfWeek: 'SAT', label: '토' },
  { dayOfWeek: 'SUN', label: '일' },
];

const BOWEL_RHYTHM_STATUS_MAP: Record<
  StoolSimpleTypes,
  BowelRhythmTypes['status']
> = {
  H: 'warning',
  M: 'normal',
  T: 'danger',
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

  const bowelRhythmByDay = new Map(
    report.bowelRhythmByDay.map(({ dayOfWeek, stoolSimple }) => [
      dayOfWeek,
      stoolSimple,
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
    conditionProgress: mapStoolDistribution(report.stoolDistribution),
    bowelRhythms: WEEKDAYS.map(({ dayOfWeek, label }) => {
      const stoolSimple = bowelRhythmByDay.get(dayOfWeek);

      return {
        day: label,
        status: stoolSimple ? BOWEL_RHYTHM_STATUS_MAP[stoolSimple] : 'empty',
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
          guideId: firstGuide.guideContentId,
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
