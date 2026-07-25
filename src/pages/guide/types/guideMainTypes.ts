import type { ComponentType, SVGProps } from 'react';
import type { GuideFeedbackTypes } from './guideApiTypes';

export type GuideMainCategoryTypes = 'P' | 'H' | 'W';
export type GuideFeedbackStatusTypes = GuideFeedbackTypes | null;

export interface GuideMainItemTypes {
  category: GuideMainCategoryTypes;
  feedbackStatus: GuideFeedbackStatusTypes;
  guideContentId: number;
  iconBackgroundColor: string;
  iconColor: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  routeId: string;
  summary: string;
  title: string;
}
