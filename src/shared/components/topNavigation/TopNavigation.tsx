import DefaultTopNavigation from './DefaultTopNavigation';
import DetailTopNavigation from './DetailTopNavigation';
import HomeTopNavigation from './HomeTopNavigation';
import type { TopNavigationPropTypes } from './topNavigation.types';

const TopNavigation = ({ variant = 'default', ...props }: TopNavigationPropTypes) => {
  if (variant === 'home') {
    return <HomeTopNavigation {...props} />;
  }

  if (variant === 'detail') {
    return <DetailTopNavigation {...props} />;
  }

  return <DefaultTopNavigation {...props} />;
};

export default TopNavigation;