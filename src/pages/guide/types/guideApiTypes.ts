export type GuideCategoryTypes = 'H' | 'P' | 'W';
export type GuideFeedbackTypes = 'A' | 'G' | 'N';
export type GuideFeedbackStatusTypes = GuideFeedbackTypes | null;
export type GuideSectionDataStatusTypes =
  'AVAILABLE' | 'INSUFFICIENT' | 'NOT_FOUND';
export type GuideRecordDataStatusTypes =
  'ENOUGH' | 'INSUFFICIENT' | 'NOT_FOUND';
export type GuideSectionOrderTypes = 'HEALTH' | 'PATTERN' | 'WARNING';
export type GuideTokenErrorCodeTypes =
  'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'TOKEN_REQUIRED';
export type GuidesErrorCodeTypes =
  GuideTokenErrorCodeTypes | 'GUIDE_FETCH_FAILED';
export type GuideDetailErrorCodeTypes =
  | GuideTokenErrorCodeTypes
  | 'GUIDE_CONTENT_INACTIVE'
  | 'GUIDE_CONTENT_NOT_FOUND'
  | 'GUIDE_DETAIL_FETCH_FAILED'
  | 'GUIDE_INVALID_ID';
export type GuideFeedbackCommonErrorCodeTypes =
  | GuideTokenErrorCodeTypes
  | 'GUIDE_CONTENT_INACTIVE'
  | 'GUIDE_CONTENT_NOT_FOUND'
  | 'GUIDE_INVALID_ID';
export type PostGuideFeedbackErrorCodeTypes =
  | GuideFeedbackCommonErrorCodeTypes
  | 'GUIDE_FEEDBACK_ALREADY_EXISTS'
  | 'GUIDE_FEEDBACK_CREATE_FAILED'
  | 'GUIDE_INVALID_FEEDBACK';
export type PatchGuideFeedbackErrorCodeTypes =
  | GuideFeedbackCommonErrorCodeTypes
  | 'GUIDE_FEEDBACK_NOT_FOUND'
  | 'GUIDE_FEEDBACK_UPDATE_FAILED'
  | 'GUIDE_INVALID_FEEDBACK';
export type DeleteGuideFeedbackErrorCodeTypes =
  | GuideFeedbackCommonErrorCodeTypes
  | 'GUIDE_FEEDBACK_DELETE_FAILED'
  | 'GUIDE_FEEDBACK_NOT_FOUND';

export interface GetGuideDetailRequestTypes {
  guideId: number;
}

export interface GuideFeedbackRequestTypes {
  feedback: GuideFeedbackTypes;
}

export interface GuideFeedbackPathTypes {
  guideId: number;
}

export interface GuideFeedbackResponseDataTypes {
  feedback: GuideFeedbackTypes;
  guideFeedbackId: string;
  guideId: number;
  regDate: string;
}

export interface GuideFeedbackUpdateResponseDataTypes extends GuideFeedbackResponseDataTypes {
  updatedAt: string;
}

export interface GuideFeedbackDeleteResponseDataTypes {
  deleted: boolean;
  guideFeedbackId: string;
  guideId: number;
}

export interface ApiSuccessResponseTypes<TData> {
  data: TData;
  message: string;
  success: true;
}

export interface ApiErrorResponseTypes<TCode extends string = string> {
  code: TCode;
  message: string;
  success: false;
}

export interface GuideWeeklyPeriodResponseTypes {
  endDate: string;
  startDate: string;
  type: 'WEEKLY';
}

export interface GuideNoticeResponseTypes {
  code: string;
  message: string;
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

export interface GuideDetailContentResponseTypes {
  content: string;
  contentId: number;
  order: number;
  subtitle: string | null;
}

export interface GuideDetailAdviceResponseTypes {
  adviceId: number;
  content: string;
  order: number;
}

export interface GuideRecommendedGuideResponseTypes {
  guideId: number;
  summary: string;
  title: string;
}

export interface GuidePatternRecordStatusResponseTypes {
  completionScore: number;
  dataStatus: GuideRecordDataStatusTypes;
  recordedDays: number;
  requiredDays: number;
}

// TODO: level, unit, comparison의 전체 enum 값이 확인되면 유니언 타입으로 좁힌다.
export interface GuidePatternEvidenceResponseTypes {
  comparison: string;
  key: string;
  label: string;
  threshold: number;
  unit: string;
  value: number;
}

export interface GuideMatchedPatternResponseTypes {
  description: string;
  evidence: GuidePatternEvidenceResponseTypes[];
  level: string;
  ruleCode: string;
  title: string;
}

export interface GuidePatternReasonResponseTypes {
  matched: boolean;
  matchedPatterns: GuideMatchedPatternResponseTypes[];
  matchedRuleCodes: string[];
  period: GuideWeeklyPeriodResponseTypes;
  recordStatus: GuidePatternRecordStatusResponseTypes;
}

export interface GuideDetailDataResponseTypes {
  advices: GuideDetailAdviceResponseTypes[];
  category: GuideCategoryTypes;
  categoryLabel: string;
  contents: GuideDetailContentResponseTypes[];
  guideId: number;
  patternReason: GuidePatternReasonResponseTypes | null;
  recommendedGuides: GuideRecommendedGuideResponseTypes[];
  source: string | null;
  summary: string;
  title: string;
}

export type GuideDetailResponseTypes =
  ApiSuccessResponseTypes<GuideDetailDataResponseTypes>;
export type PostGuideFeedbackResponseTypes =
  ApiSuccessResponseTypes<GuideFeedbackResponseDataTypes>;
export type PatchGuideFeedbackResponseTypes =
  ApiSuccessResponseTypes<GuideFeedbackUpdateResponseDataTypes>;
export type DeleteGuideFeedbackResponseTypes =
  ApiSuccessResponseTypes<GuideFeedbackDeleteResponseDataTypes>;
