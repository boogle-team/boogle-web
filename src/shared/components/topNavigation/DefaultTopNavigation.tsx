import ChevronLeftIcon from '@/shared/assets/icons/chevronLeftIcon.svg?react';
import type { TopNavigationPropTypes } from './types/topNavigationPropsTypes';

const DefaultTopNavigation = ({
  title,
  onBackButtonClick,
  isBackButtonVisible = true,
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
      className={`grid h-[3.5625rem] w-full grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] items-center border-b border-gray-3 bg-beige-1 px-[1rem] ${className}`}
    >
      {isBackButtonVisible ? (
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBackButtonClick}
          className="flex h-8 w-8 items-center justify-center justify-self-start p-3"
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="h-[1rem] w-[0.49619rem] shrink-0 text-gray-8"
          />
        </button>
      ) : (
        <div aria-hidden="true" />
      )}

      <h1 className="body-lg min-w-0 justify-self-center whitespace-nowrap text-center leading-[1.3] tracking-[-0.03125rem] text-gray-10">
        {title}
      </h1>

      <div aria-hidden="true" />
    </header>
  );
};

export default DefaultTopNavigation;
