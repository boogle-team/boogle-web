export type TopNavigationVariantTypes = 'default' | 'home' | 'detail';

export interface TopNavigationPropTypes {
  variant?: TopNavigationVariantTypes;
  title: string;
  subTitle?: string;
  onBackButtonClick?: () => void;
  onTitleClick?: () => void;
  onNotificationButtonClick?: () => void;
  onSettingButtonClick?: () => void;
  className?: string;
}