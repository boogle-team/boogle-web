import type { ReactNode } from 'react';

export type TopNavigationVariantTypes = 'default' | 'home' | 'detail';

export interface TopNavigationPropTypes {
  variant?: TopNavigationVariantTypes;
  title: string;
  subTitle?: string;
  rightElement?: ReactNode;
  onBackButtonClick?: () => void;
  onTitleClick?: () => void;
  onNotificationButtonClick?: () => void;
  onSettingButtonClick?: () => void;
  className?: string;
}