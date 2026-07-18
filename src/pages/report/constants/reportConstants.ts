import type {
  BowelRhythmTypes,
  ConditionProgressTypes,
  InsufficientReportTypes,
  MonthlyScoreTypes,
  PatternTypes,
  ReportModeTypes,
  ReportSummaryTypes,
  WeeklyTrendTypes,
} from '../types/reportTypes';

export const BASE_REPORT_DATE = new Date(2026, 5, 14);

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const MODE_OPTIONS: { label: string; value: ReportModeTypes }[] = [
  {
    label: '주간',
    value: 'weekly',
  },
  {
    label: '월간',
    value: 'monthly',
  },
];

export const WEEKLY_SUMMARIES: ReportSummaryTypes[] = [
  {
    description: '지난주 +1',
    label: '배변 횟수',
    value: '5회',
  },
  {
    description: '동일',
    label: '평균 간격',
    value: '1.4회',
  },
  {
    description: '6/7일',
    label: '기록 완성도',
    value: '86%',
  },
];

export const MONTHLY_SUMMARIES: ReportSummaryTypes[] = [
  {
    description: '이번 달',
    label: '배변 횟수',
    value: '5회',
  },
  {
    description: '평균 간격',
    label: '평균 간격',
    value: '1.4회',
  },
  {
    description: '기록 완성도',
    label: '기록 완성도',
    value: '86%',
  },
];

export const CONDITION_PROGRESS: ConditionProgressTypes[] = [
  {
    colorClassName: 'bg-orange-6',
    label: '보통',
    value: 50,
  },
  {
    colorClassName: 'bg-yellow-6',
    label: '딱딱',
    value: 30,
  },
  {
    colorClassName: 'bg-semantic-danger',
    label: '묽음',
    value: 20,
  },
];

export const BOWEL_RHYTHMS: BowelRhythmTypes[] = [
  {
    day: '월',
    status: 'normal',
  },
  {
    day: '화',
    status: 'warning',
  },
  {
    day: '수',
    status: 'danger',
  },
  {
    day: '목',
    status: 'normal',
  },
  {
    day: '금',
    status: 'empty',
  },
  {
    day: '토',
    status: 'normal',
  },
  {
    day: '일',
    status: 'empty',
  },
];

export const WEEKLY_PATTERNS: PatternTypes[] = [
  {
    description: '이번 주 5회, 평소 리듬을 유지했어요',
    icon: 'check',
    title: '배변 리듬 안정',
  },
  {
    description: '수분 부족 날과 함께 나타났어요',
    icon: 'warning',
    title: '딱딱한 변 경향',
  },
];

export const MONTHLY_PATTERNS: PatternTypes[] = [
  {
    description: '수분 부족 날과 함께 많이 나타났어요',
    icon: 'danger',
    title: '딱딱한 변 반복',
  },
  {
    description: '딱딱한 변 비율이 지난달 40%→27%로 줄었어요',
    icon: 'check',
    title: '전월 대비 개선',
  },
];

export const MONTHLY_SCORES: MonthlyScoreTypes[] = [
  {
    label: '기록 완성도',
    value: 90,
  },
  {
    label: '리듬 완성도',
    value: 60,
  },
  {
    label: '상태 안정도',
    value: 80,
  },
];

export const WEEKLY_TRENDS: WeeklyTrendTypes[] = [
  {
    count: 0,
    week: '1주',
  },
  {
    count: 0,
    week: '2주',
  },
  {
    count: 0,
    week: '3주',
  },
  {
    count: 0,
    week: '4주',
  },
];

export const INSUFFICIENT_REPORT_BY_MODE: Record<
  ReportModeTypes,
  InsufficientReportTypes
> = {
  weekly: {
    currentCount: 2,
    description:
      '3일 이상 기록하면 변 상태 분포와\n배변 리듬을 확인할 수 있어요',
    minimumRequiredCount: 3,
    requiredCount: 7,
    trackerLabel: '이번 주 기록 2일째',
  },
  monthly: {
    currentCount: 6,
    description:
      '7일 이상 기록하면 변 상태 분포와\n배변 리듬을 확인할 수 있어요',
    minimumRequiredCount: 7,
    requiredCount: 30,
    trackerLabel: '이번 달 기록 6일째',
  },
};
