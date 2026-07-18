import type { ComponentType, SVGProps } from 'react';

export interface GuideMainItemTypes {
  description: string;
  iconBackgroundColor: string;
  iconColor: string;
  id?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}
