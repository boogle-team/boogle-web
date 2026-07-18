export type TopNavigationVariantTypes = 'default' | 'home' | 'detail';

export interface TopNavigationPropTypes {
  variant?: TopNavigationVariantTypes;
  title: string;
  subTitle?: string;
  onBackButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
  onTitleClick?: () => void;
  onNotificationButtonClick?: () => void;
  onSettingButtonClick?: () => void;
  hasUnreadNotification?: boolean;
  isBackButtonVisible?: boolean;
  isBorderVisible?: boolean;
  isDeleteButtonVisible?: boolean;
  className?: string;
}
