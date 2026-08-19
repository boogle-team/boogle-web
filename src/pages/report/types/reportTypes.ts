export type ReportModeTypes = 'weekly' | 'monthly';

export interface ReportSummaryTypes {
  description: string;
  isHighlighted?: boolean;
  label: string;
  value: string;
}

export interface ConditionProgressTypes {
  colorClassName: string;
  label: string;
  value: number;
}

export interface BowelRhythmTypes {
  day: string;
  status: 'normal' | 'warning' | 'danger' | 'empty';
}

export interface WeeklyReportViewDataTypes {
  bowelRhythms: BowelRhythmTypes[];
  conditionProgress: ConditionProgressTypes[];
  frequentTimeSlotLabel: string | null;
  lifeGuides: LifeGuideTypes[];
  patterns: PatternTypes[];
  summaries: ReportSummaryTypes[];
}

export type PatternIconTypes =
  | 'chart'
  | 'check'
  | 'danger'
  | 'droplet'
  | 'frown'
  | 'moon'
  | 'package'
  | 'warning';

export interface PatternTypes {
  description: string;
  icon: PatternIconTypes;
  title: string;
}

export type PatternCardVariantTypes = 'default' | 'improvement';

export interface MonthlyScoreTypes {
  label: string;
  value: number;
}

export interface MonthlyReportViewDataTypes {
  conditionProgress: ConditionProgressTypes[];
  conditionScore: number;
  improvements: PatternTypes[];
  isPdfDownloadAvailable: boolean;
  monthlyType: MonthlyTypeTypes | null;
  patterns: PatternTypes[];
  scores: MonthlyScoreTypes[];
  summaries: ReportSummaryTypes[];
  weeklyTrends: WeeklyTrendTypes[];
}

export interface WeeklyTrendTypes {
  count: number;
  week: string;
}

export interface MonthlyTypeTypes {
  description: string | null;
  name: string;
  symbol: import('./reportApiTypes').MonthlyUserTypeCodeTypes;
  title: string;
}

// 주간 리포트의 생활 가이드는 가이드 탭의 패턴 기반(P) 가이드와 동일한 가이드다.
// 피드백은 가이드 상세에서만 받으므로 여기에는 피드백 상태를 두지 않는다.
export interface LifeGuideTypes {
  description: string;
  guideId: number;
  icon: 'guide';
  title: string;
}

export type PatternCardItemTypes = LifeGuideTypes | PatternTypes;

export interface InsufficientReportTypes {
  currentCount: number;
  description: string;
  minimumRequiredCount: number;
  requiredCount: number;
}

export interface ReportPeriodTextTypes {
  description: string;
  title: string;
}
