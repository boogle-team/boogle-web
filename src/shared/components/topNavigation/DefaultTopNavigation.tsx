import ChevronLeftIcon from '@/shared/assets/icons/chevronLeftIcon.svg?react';
import type { TopNavigationPropTypes } from './types/topNavigationPropsTypes';

const DefaultTopNavigation = ({
  title,
  onBackButtonClick,
  className = '',
}: TopNavigationPropTypes) => {
  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    window.history.back();
  };

  return (
    <header
      className={`relative h-[3.5625rem] w-full border-b border-gray-3 bg-beige-1 ${className}`}
    >
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={handleBackButtonClick}
        className="absolute left-[1rem] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center p-3"
      >
        <ChevronLeftIcon
          aria-hidden="true"
          className="h-[1rem] w-[0.49619rem] shrink-0 text-gray-8"
        />
      </button>

      <h1 className="title absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center leading-[1.3] tracking-[-0.03125rem] text-gray-10">
        {title}
      </h1>
    </header>
  );
};

export default DefaultTopNavigation;
