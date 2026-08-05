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

export interface WeeklyReportViewDataTypes {
  bowelRhythms: BowelRhythmTypes[];
  conditionProgress: ConditionProgressTypes[];
  frequentTimeSlotLabel: string | null;
  lifeGuide: LifeGuideTypes | null;
  patterns: PatternTypes[];
  summaries: ReportSummaryTypes[];
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

export interface MonthlyReportViewDataTypes {
  conditionProgress: ConditionProgressTypes[];
  conditionScore: number;
  improvements: PatternTypes[];
  isPdfDownloadAvailable: boolean;
  monthlyType: MonthlyTypeTypes;
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
  description: string;
  symbol: 'C' | 'I' | 'L' | 'N' | 'R' | 'U';
  title: string;
}

export type ReportGuideFeedbackTypes = 'A' | 'G';
export type ReportGuideFeedbackStatusTypes =
  ReportGuideFeedbackTypes | 'N' | null;

export interface LifeGuideTypes {
  description: string;
  feedbackStatus?: ReportGuideFeedbackStatusTypes;
  guideContentId: number;
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
