import type { ReactNode } from 'react';

interface TopNavigationPropTypes {
  title?: string;
  isBackButtonVisible?: boolean;
  isDividerVisible?: boolean;
  onBackButtonClick?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

const TopNavigation = ({
  title,
  isBackButtonVisible = true,
  isDividerVisible = true,
  onBackButtonClick,
  rightElement,
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
      className={`relative h-[5.75rem] w-full bg-beige-5 ${
        isDividerVisible ? 'border-b border-beige-7' : ''
      } ${className}`}
    >
      {isBackButtonVisible && (
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBackButtonClick}
          className="absolute left-[0.5rem] top-[2.75rem] flex h-[3rem] w-[3rem] items-center justify-center"
        >
          <span
            aria-hidden="true"
            className="font-base text-[1.125rem] font-normal leading-none text-gray-8"
          >
            ‹
          </span>
        </button>
      )}

      {title && (
        <h1 className="font-base absolute left-1/2 top-[3.6875rem] -translate-x-1/2 whitespace-nowrap text-center text-[0.9375rem] font-bold leading-none text-gray-10">
          {title}
        </h1>
      )}

      {rightElement && (
        <div className="absolute right-layout top-[3.375rem] flex items-center">
          {rightElement}
        </div>
      )}
    </header>
  );
};

export default TopNavigation;