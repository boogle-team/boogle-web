export type GuideCategoryTypes = '장 건강 정보' | '나 기록 기반' | '주의 신호';

export interface GuideMetricTypes {
  colorClassName?: string;
  label: string;
  value: number;
}

export interface GuideRelatedTypes {
  icon: 'sleep' | 'stool' | 'stress';
  id?: string;
  title: string;
}

export interface GuideWarningSignTypes {
  description: string;
  notice: string;
  title: string;
}

export interface GuideDetailTypes {
  actionDescription?: string;
  actionSource?: string;
  actionTitle?: string;
  category: GuideCategoryTypes;
  description: string;
  id: string;
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
