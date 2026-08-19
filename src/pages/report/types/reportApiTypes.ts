import type { ApiResponseTypes } from '@/shared/types/apiTypes';

export interface GetWeeklyReportRequestTypes {
  includeGuide?: boolean;
  weekStartDate?: string;
}

export interface GetMonthlyReportRequestTypes {
  includePattern?: boolean;
  monthStartDate?: string;
}

export interface PostReportPdfRequestTypes {
  monthStartDate: string;
}

export type ReportDataStatusTypes = 'ENOUGH' | 'INSUFFICIENT';
export type ReportPeriodTypes = 'MONTHLY' | 'WEEKLY';
export type ReportCompareTypes = 'PREVIOUS_MONTH' | 'PREVIOUS_WEEK';
export type ReportTrendTypes =
  | 'DECREASE'
  | 'IMPROVED'
  | 'INCREASE'
  | 'LOW_COMPLETION'
  | 'NO_PREVIOUS_DATA'
  | 'SAME'
  | 'WORSENED';
export type StoolSimpleTypes = 'H' | 'M' | 'T';
export type BowelDayOfWeekTypes =
  'FRI' | 'MON' | 'SAT' | 'SUN' | 'THU' | 'TUE' | 'WED';
export type TimeSlotTypes =
  'AFTERNOON' | 'DAWN' | 'EVENING' | 'MORNING' | 'NIGHT';
export type PatternLevelTypes = 'DANGER' | 'GOOD' | 'INFO' | 'OK' | 'WARN';
export type GuideCategoryTypes = 'H' | 'P' | 'W';
export type GuideFeedbackStatusTypes = 'A' | 'G' | 'N' | null;
export type MonthlyUserTypeCodeTypes = 'C' | 'I' | 'L' | 'N' | 'R' | 'W';

export interface ReportPeriodResponseTypes {
  endDate: string;
  startDate: string;
  type: ReportPeriodTypes;
}

export interface ReportSummaryResponseTypes {
  bowelCount: number;
  completionScore: number;
  intervalAvg: number;
}

export interface MonthlyReportSummaryResponseTypes extends ReportSummaryResponseTypes {
  bowelDays: number;
  conditionScore: number;
  rhythmScore: number;
  state: number;
  stateLabel: string;
  stateScore: number;
}

export interface ReportRecordStatsResponseTypes {
  boogleRecordDays: number;
  calendarDays?: number;
  completionScore: number;
  lifeRecordDays: number;
  recordedDays: number;
  requiredDays: number;
  totalDays: number;
}

export interface ReportPreviousSummaryResponseTypes extends ReportSummaryResponseTypes {
  period: ReportPeriodResponseTypes;
}

export interface MonthlyReportPreviousSummaryResponseTypes extends MonthlyReportSummaryResponseTypes {
  period: ReportPeriodResponseTypes;
  userType: MonthlyUserTypeCodeTypes | null;
  userTypeLabel: string | null;
}

export interface ReportChangeSummaryResponseTypes {
  bowelCountChangeRate: number | null;
  bowelCountDiff: number | null;
  compareType: ReportCompareTypes;
  compareAvailable?: boolean;
  completionScoreDiff: number | null;
  description: string;
  intervalAvgDiff: number | null;
  reasonCode?: string;
  trend: ReportTrendTypes;
}

export interface MonthlyReportChangeSummaryResponseTypes extends ReportChangeSummaryResponseTypes {
  conditionScoreDiff: number | null;
}

export interface StoolDistributionResponseTypes {
  count: number;
  label: string;
  ratio: number;
  stoolSimple: StoolSimpleTypes;
}

export interface BowelRhythmByDayResponseTypes {
  bowelCount: number;
  dayOfWeek: BowelDayOfWeekTypes;
  label: string;
  stoolSimple?: StoolSimpleTypes | null;
}

export interface FrequentTimeSlotResponseTypes {
  count: number;
  label: string;
  timeSlot: TimeSlotTypes;
}

export interface LifeFactorStatResponseTypes {
  condition: string;
  count: number;
  label: string;
  sourceField: string;
}

export interface PatternCardResponseTypes {
  description: string;
  level: PatternLevelTypes;
  ruleCode: string;
  title: string;
}

export type MonthlyPatternRuleCodeTypes =
  | 'MONTHLY_HARD_STOOL_RATIO'
  | 'MONTHLY_LOW_SLEEP'
  | 'MONTHLY_LOW_WATER_WITH_HARD_STOOL'
  | 'MONTHLY_STRESS_WITH_PAIN';

export interface MonthlyPatternCardResponseTypes {
  description: string;
  level: 'WARN';
  ruleCode: MonthlyPatternRuleCodeTypes;
  threshold: number;
  title: string;
  unit: 'COUNT' | 'DAY' | 'PERCENT';
  value: number;
}

export interface MonthlyImprovementResponseTypes {
  code:
    | 'CONDITION_SCORE_UP'
    | 'HARD_STOOL_RATIO_DOWN'
    | 'LOW_SLEEP_DOWN'
    | 'LOW_WATER_HARD_STOOL_DOWN'
    | 'STRESS_WITH_PAIN_DOWN';
  currentValue: number;
  description: string;
  previousValue: number;
  title: string;
  unit: 'COUNT' | 'DAY' | 'PERCENT' | 'POINT';
}

export interface MonthlyWeeklyTrendResponseTypes {
  bowelCount: number;
  conditionScore: number | null;
  weekEndDate: string;
  weekIndex: number;
  weekStartDate: string;
}

export interface MonthlyLifeFactorStatsResponseTypes {
  highCaffeineCount: number;
  highStressCount: number;
  irregularMealCount: number;
  lowSleepCount: number;
  lowWaterCount: number;
  noExerciseCount: number;
}

export interface MonthlyUserTypeResponseTypes {
  code: MonthlyUserTypeCodeTypes;
  description: string | null;
  name: string;
  title: string;
}

export interface ReportPdfInfoResponseTypes {
  downloadAvailable: boolean;
  endpoint: string;
}

export interface ReportGuideResponseTypes {
  category: GuideCategoryTypes;
  feedbackStatus: GuideFeedbackStatusTypes;
  guideId: number;
  summary: string;
  title: string;
}

export interface InsufficientNoticeResponseTypes {
  code: string;
  message: string;
}

export interface WeeklyReportDataResponseTypes {
  bowelRhythmByDay: BowelRhythmByDayResponseTypes[];
  changeSummary: ReportChangeSummaryResponseTypes | null;
  dataStatus: ReportDataStatusTypes;
  frequentTimeSlots: FrequentTimeSlotResponseTypes[];
  guides: ReportGuideResponseTypes[];
  insufficientNotice: InsufficientNoticeResponseTypes | null;
  lifeFactorStats?: Record<string, LifeFactorStatResponseTypes>;
  lifeTagStats?: unknown[];
  patternCards: PatternCardResponseTypes[];
  period: ReportPeriodResponseTypes;
  previousSummary: ReportPreviousSummaryResponseTypes | null;
  recordStats: ReportRecordStatsResponseTypes;
  recordedDays?: number;
  requiredDays?: number;
  stoolDistribution: StoolDistributionResponseTypes[];
  summary: ReportSummaryResponseTypes | null;
}

export type WeeklyReportResponseTypes =
  ApiResponseTypes<WeeklyReportDataResponseTypes>;

export interface MonthlyReportDataResponseTypes {
  changeSummary: MonthlyReportChangeSummaryResponseTypes | null;
  dataStatus: ReportDataStatusTypes;
  improvements: MonthlyImprovementResponseTypes[];
  lifeFactorStats: MonthlyLifeFactorStatsResponseTypes | null;
  notice: InsufficientNoticeResponseTypes | null;
  patternCards: MonthlyPatternCardResponseTypes[];
  pdf: ReportPdfInfoResponseTypes;
  period: ReportPeriodResponseTypes;
  previousSummary: MonthlyReportPreviousSummaryResponseTypes | null;
  recordStats: ReportRecordStatsResponseTypes;
  stoolDistribution: StoolDistributionResponseTypes[];
  summary: MonthlyReportSummaryResponseTypes | null;
  userType: MonthlyUserTypeResponseTypes | null;
  weeklyTrend: MonthlyWeeklyTrendResponseTypes[];
}

export type MonthlyReportResponseTypes =
  ApiResponseTypes<MonthlyReportDataResponseTypes>;
export type ReportPdfResponseTypes = Blob;
