export type ReportModeTypes = 'weekly' | 'monthly';

export interface ReportSummaryTypes {
  description: string;
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

export interface PatternTypes {
  description: string;
  icon:
    | 'chart'
    | 'check'
    | 'danger'
    | 'droplet'
    | 'frown'
    | 'moon'
    | 'package'
    | 'warning';
  title: string;
}

export interface MonthlyScoreTypes {
  label: string;
  value: number;
}

export interface WeeklyTrendTypes {
  count: number;
  week: string;
}

export interface MonthlyTypeTypes {
  description: string;
  symbol: 'R' | 'C' | 'L' | 'I' | '?';
  title: string;
}

// 주간 리포트의 생활 가이드는 가이드 탭의 패턴 기반(P) 가이드와 동일한 가이드다.
// 피드백은 가이드 상세에서만 받으므로 여기에는 피드백 상태를 두지 않는다.
export interface LifeGuideTypes {
  description: string;
  guideId: number;
  title: string;
}

export interface InsufficientReportTypes {
  currentCount: number;
  description: string;
  minimumRequiredCount: number;
  requiredCount: number;
  trackerLabel: string;
}

export interface ReportPeriodTextTypes {
  description: string;
  title: string;
}
