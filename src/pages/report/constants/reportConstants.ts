import type {
  BowelRhythmTypes,
  ConditionProgressTypes,
  InsufficientReportTypes,
  LifeGuideTypes,
  MonthlyScoreTypes,
  MonthlyTypeTypes,
  PatternTypes,
  ReportModeTypes,
  ReportSummaryTypes,
  WeeklyTrendTypes,
} from '../types/reportTypes';

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const DEFAULT_MONTHLY_CONDITION_SCORE = 46;

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
    description: '수분이 부족했던 날, 딱딱한 변이 함께 나타난 날이 많았어요',
    icon: 'droplet',
    title: '부족과 딱딱한 변',
  },
  {
    description: '스트레스가 높았던 날 복통이 자주 함께 있었어요',
    icon: 'frown',
    title: '스트레스성 복통',
  },
  {
    description: '이번 달 10일 이상 수면이 부족했어요',
    icon: 'moon',
    title: '수면 부족 반복',
  },
  {
    description: '이번 달 변 상태의 절반 이상이 딱딱했어요',
    icon: 'package',
    title: '딱딱한 변 경향',
  },
];

export const MONTHLY_IMPROVEMENTS: PatternTypes[] = [
  {
    description: '지난달보다 컨디션 점수가 38점 → 46점으로 올랐어요',
    icon: 'chart',
    title: '부글 컨디션 점수 상승',
  },
  {
    description: '스트레스와 복통이 함께 나타난 횟수가 지난달 12회에서 5회로 줄었어요',
    icon: 'chart',
    title: '스트레스성 복통 완화',
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

export const MONTHLY_TYPES: MonthlyTypeTypes[] = [
  {
    description: '주 3회 이상 + 보통 변 55%\n지난달에 이어 유지 중이에요',
    symbol: 'R',
    title: '규칙형',
  },
  {
    description:
      '평균 간격 3.2일 + 딱딱한 변 42%\n수분 섭취를 늘려보면 도움이 될 수 있어요',
    symbol: 'C',
    title: '변비경향형',
  },
  {
    description:
      '묽은 변 45% + 배변 횟수 주 6회 이상\n자극적인 음식 섭취와 자주 겹쳤어요',
    symbol: 'L',
    title: '묽은변경향형',
  },
  {
    description:
      '수면 부족, 스트레스 높음과 변 상태 변화가 자주 함께 나타났어요',
    symbol: 'L',
    title: '생활영향형',
  },
  {
    description:
      '배변 간격이 1일부터 5일까지 들쭉날쭉해요\n뚜렷한 패턴이 아직 보이지 않아요',
    symbol: 'I',
    title: '불규칙형',
  },
  {
    description:
      '이번 달 기록이 8일뿐이라 아직 유형을 정확히 알기 어려워요 (15일 이상 필요)',
    symbol: '?',
    title: '유형 진단 중',
  },
];

export const WEEKLY_LIFE_GUIDE: LifeGuideTypes = {
  description: '하루 물 6~8잔을 목표로 해보세요. 딱딱한 변이 개선될 수 있어요.',
  feedbackStatus: null,
  guideContentId: 1,
  title: '수분 섭취와 딱딱한 변',
};

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
