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
  endDate: string;
  includeDailyRecords?: boolean;
  startDate: string;
}

export type ReportDataStatusTypes = 'ENOUGH' | 'INSUFFICIENT';
export type MonthlyReportDataStatusTypes =
  'ENOUGH' | 'LOW_COMPLETION' | 'NO_RECORD';
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
export type PatternLevelTypes = 'GOOD' | 'INFO' | 'OK' | 'WARN';
export type GuideCategoryTypes = 'H' | 'P' | 'W';
export type GuideFeedbackStatusTypes = 'A' | 'G' | 'N' | null;
export type MonthlyUserTypeCodeTypes = 'C' | 'I' | 'L' | 'N' | 'R' | 'U';

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
  conditionScore: number | null;
  state: number;
  stateLabel: string;
}

export interface ReportRecordStatsResponseTypes {
  boogleRecordDays: number;
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
  userType: MonthlyUserTypeCodeTypes;
  userTypeLabel: string;
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
  characterImageUrl?: string | null;
  code: MonthlyUserTypeCodeTypes;
  description: string;
  name: string;
}

export interface ReportPdfInfoResponseTypes {
  downloadAvailable: boolean;
  endpoint: string;
}

export interface ReportGuideResponseTypes {
  category: GuideCategoryTypes;
  content: string;
  feedbackStatus: GuideFeedbackStatusTypes;
  guideContentId: number;
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
  dataStatus: MonthlyReportDataStatusTypes;
  lifeFactorStats: MonthlyLifeFactorStatsResponseTypes | null;
  monthlyChange?: unknown | null;
  notice: InsufficientNoticeResponseTypes | null;
  patternCards: PatternCardResponseTypes[];
  pdf: ReportPdfInfoResponseTypes;
  period: ReportPeriodResponseTypes;
  previousSummary: MonthlyReportPreviousSummaryResponseTypes | null;
  recordStats: ReportRecordStatsResponseTypes;
  stoolDistribution: StoolDistributionResponseTypes[];
  summary: MonthlyReportSummaryResponseTypes | null;
  userType: MonthlyUserTypeResponseTypes;
  weeklyTrend: MonthlyWeeklyTrendResponseTypes[];
}

export type MonthlyReportResponseTypes =
  ApiResponseTypes<MonthlyReportDataResponseTypes>;
export type ReportPdfResponseTypes = Blob;
