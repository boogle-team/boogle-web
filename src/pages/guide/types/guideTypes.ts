import type { GuideFeedbackStatusTypes } from '@/pages/guide/types/guideApiTypes';

export type GuideDetailCategoryTypes = 'info' | 'personal' | 'warning';
export type GuideMetricColorTypes = 'danger' | 'warning';

export interface GuideMetricTypes {
  color: GuideMetricColorTypes;
  comparison: string;
  id: string;
  label: string;
  threshold: number;
  unit: string;
  value: number;
}

export interface GuideRelatedTypes {
  guideId: number;
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
  title: string;
}

export interface GuideInfoSectionTypes {
  description: string;
  title: string;
}

interface GuideDetailCommonTypes {
  actions: GuideActionTypes[];
  description: string;
  guideId: number;
  relatedGuides: GuideRelatedTypes[];
  source: string;
  title: string;
  type: GuideDetailCategoryTypes;
}

export interface GuideInfoDetailTypes extends GuideDetailCommonTypes {
  infoSections: GuideInfoSectionTypes[];
  type: 'info';
}

export interface GuidePersonalDetailTypes extends GuideDetailCommonTypes {
  feedbackStatus: GuideFeedbackStatusTypes;
  infoSections: GuideInfoSectionTypes[];
  metrics: GuideMetricTypes[];
  notice?: string;
  type: 'personal';
}

export interface GuideWarningDetailTypes extends GuideDetailCommonTypes {
  notice: string;
  type: 'warning';
  warningSigns: GuideWarningSignTypes[];
}

export type GuideDetailTypes =
  GuideInfoDetailTypes | GuidePersonalDetailTypes | GuideWarningDetailTypes;
