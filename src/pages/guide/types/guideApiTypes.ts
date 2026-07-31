export type GuideCategoryTypes = 'H' | 'P' | 'W';
export type GuideFeedbackTypes = 'A' | 'G' | 'N';
export type GuideFeedbackStatusTypes = GuideFeedbackTypes | null;
export type GuidePeriodTypes = 'MONTHLY' | 'WEEKLY';
export type GuideSectionDataStatusTypes =
  'AVAILABLE' | 'INSUFFICIENT' | 'NOT_FOUND';
export type GuideSectionOrderTypes = 'HEALTH' | 'PATTERN' | 'WARNING';
export type GuideErrorCodeTypes =
  'GUIDE_FETCH_FAILED' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'TOKEN_REQUIRED';

export interface GetGuideDetailRequestTypes {
  guideContentId: number;
  monthStartDate?: string;
  ruleCode?: string;
  weekStartDate?: string;
}

export interface GuideFeedbackRequestTypes {
  feedback: GuideFeedbackTypes;
}

export interface GuideFeedbackPathTypes {
  guideContentId: number;
}

export interface GuideFeedbackResponseDataTypes {
  feedback: GuideFeedbackTypes;
  guideContentId: number;
  guideFeedbackId: number;
  regDate: string;
}

export interface GuideFeedbackUpdateResponseDataTypes extends GuideFeedbackResponseDataTypes {
  updateAt: string;
}

export interface ApiSuccessResponseTypes<TData> {
  data: TData;
  message: string;
  success: true;
}

export interface ApiErrorResponseTypes {
  code: GuideErrorCodeTypes;
  message: string;
  success: false;
}

export interface GuideMonthlyPeriodResponseTypes {
  monthEndDate?: string;
  monthStartDate?: string;
  endDate?: string;
  startDate?: string;
  type: 'MONTHLY';
}

export interface GuideWeeklyPeriodResponseTypes {
  endDate: string;
  startDate: string;
  type: 'WEEKLY';
}

export type GuidePeriodResponseTypes =
  GuideMonthlyPeriodResponseTypes | GuideWeeklyPeriodResponseTypes;

export interface GuideNoticeResponseTypes {
  code: string;
  message: string;
}

export interface GuideMatchedEvidenceResponseTypes {
  condition: string;
  count: number;
  sourceField: string;
  sourceTable: string;
}

export interface GuideItemResponseTypes {
  category: GuideCategoryTypes;
  guideId: number;
  summary: string;
  title: string;
}

export interface GuidePatternItemResponseTypes extends GuideItemResponseTypes {
  category: 'P';
  matchedRuleCodes: string[];
}

export interface GuideHealthItemResponseTypes extends GuideItemResponseTypes {
  category: 'H';
}

export interface GuideWarningItemResponseTypes extends GuideItemResponseTypes {
  category: 'W';
}

export interface GuidePatternSectionResponseTypes {
  category: 'P';
  categoryLabel: string;
  dataStatus: GuideSectionDataStatusTypes;
  guides: GuidePatternItemResponseTypes[];
  notice: GuideNoticeResponseTypes | null;
  period: GuideWeeklyPeriodResponseTypes;
  recordedDays: number;
  requiredDays: number;
  sectionDescription: string;
  sectionTitle: string;
}

export interface GuideHealthSectionResponseTypes {
  category: 'H';
  categoryLabel: string;
  guides: GuideHealthItemResponseTypes[];
  sectionDescription: string;
  sectionTitle: string;
}

export interface GuideDetectedFlagResponseTypes {
  detectedDate: string;
  flagCode: string;
  label: string;
  sourceRecordId?: number;
}

export interface GuideWarningSectionResponseTypes {
  category: 'W';
  categoryLabel: string;
  guides: GuideWarningItemResponseTypes[];
  sectionDescription: string;
  sectionTitle: string;
}

export interface GuidesDataResponseTypes {
  healthGuideSection: GuideHealthSectionResponseTypes;
  patternGuideSection: GuidePatternSectionResponseTypes;
  sectionOrder: GuideSectionOrderTypes[];
  warningGuideSection: GuideWarningSectionResponseTypes;
}

export type GuidesResponseTypes =
  ApiSuccessResponseTypes<GuidesDataResponseTypes>;

export interface GuideDetailRuleResponseTypes {
  condition: string;
  ruleCode: string;
}

export interface GuidePatternMatchedEvidenceResponseTypes extends GuideMatchedEvidenceResponseTypes {
  description: string;
  matched: boolean;
}

export interface GuideWarningMatchedEvidenceResponseTypes {
  detectedFlags: GuideDetectedFlagResponseTypes[];
  matched: boolean;
}

export type GuideDetailMatchedEvidenceResponseTypes =
  | GuidePatternMatchedEvidenceResponseTypes
  | GuideWarningMatchedEvidenceResponseTypes
  | null;

export interface GuideRelatedRecordsResponseTypes {
  highCaffeineDays?: number;
  highStressDays?: number;
  lowSleepDays?: number;
  lowWaterDays?: number;
  totalRecordedDays: number;
}

export interface GuideDetailDataResponseTypes {
  category: GuideCategoryTypes;
  categoryLabel: string;
  content: string;
  feedbackStatus: GuideFeedbackStatusTypes;
  guideContentId: number;
  matchedEvidence: GuideDetailMatchedEvidenceResponseTypes;
  period: GuidePeriodResponseTypes | null;
  relatedRecords: GuideRelatedRecordsResponseTypes | null;
  rule: GuideDetailRuleResponseTypes | null;
  title: string;
}

export type GuideDetailResponseTypes =
  ApiSuccessResponseTypes<GuideDetailDataResponseTypes>;
export type PostGuideFeedbackResponseTypes =
  ApiSuccessResponseTypes<GuideFeedbackResponseDataTypes>;
export type PatchGuideFeedbackResponseTypes =
  ApiSuccessResponseTypes<GuideFeedbackUpdateResponseDataTypes>;
export type DeleteGuideFeedbackResponseTypes = unknown;
