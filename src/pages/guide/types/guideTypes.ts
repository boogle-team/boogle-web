import type { GuideFeedbackStatusTypes } from './guideApiTypes';

export type GuideCategoryTypes = '내 기록 기반' | '장 건강 정보' | '주의 신호';

export interface GuideMetricTypes {
  colorClassName?: string;
  label: string;
  value: number;
}

export interface GuideRelatedTypes {
  guideContentId?: number;
  icon: 'sleep' | 'stool' | 'stress';
  id?: string;
  title: string;
}

export interface GuideWarningSignTypes {
  description: string;
  notice: string;
  subDescription?: string;
  title: string;
}

export interface GuideActionTypes {
  description?: string;
  source?: string;
  title: string;
}

export interface GuideInfoSectionTypes {
  description: string;
  title: string;
  visualType?: 'bristolScale';
}

export interface GuideDetailTypes {
  actionDescription?: string;
  actionSource?: string;
  actionTitle?: string;
  actions?: GuideActionTypes[];
  category: GuideCategoryTypes;
  description: string;
  feedbackStatus?: GuideFeedbackStatusTypes;
  guideContentId?: number;
  id: string;
  infoNotice?: string;
  infoSections?: GuideInfoSectionTypes[];
  metrics?: GuideMetricTypes[];
  notice?: string;
  noticeHighlight?: string;
  relatedGuides: GuideRelatedTypes[];
  source: string;
  sourceDescription?: string;
  sourceUrl: string;
  summaryDescription: string;
  summaryTitle: string;
  title: string;
  type: 'info' | 'personal' | 'warning';
  warningSigns?: GuideWarningSignTypes[];
}
