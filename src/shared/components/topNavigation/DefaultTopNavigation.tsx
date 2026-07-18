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
    <header className={`w-full bg-beige-1 ${className}`}>
      <div aria-hidden="true" className="h-[3.06rem]" />

      <div className="relative h-14.25 border-b border-gray-3">
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

        <h1 className="title absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[1.125rem] font-medium leading-[1.4] tracking-[-0.0225rem] text-gray-10">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default DefaultTopNavigation;
