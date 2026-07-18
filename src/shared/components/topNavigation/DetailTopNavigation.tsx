import ChevronLeftIcon from '@/shared/assets/icons/chevronLeftIcon.svg?react';
import type { TopNavigationPropTypes } from './types/topNavigationPropsTypes';

const DetailTopNavigation = ({
  title,
  subTitle,
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

      <div className="relative h-[3.5625rem] border-b border-gray-3">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBackButtonClick}
          className="absolute left-[1rem] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center gap-[0.625rem] p-3"
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="h-[1rem] w-[0.49619rem] shrink-0 text-gray-8"
          />
        </button>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <h1 className="font-base whitespace-nowrap text-center text-[1rem] font-medium leading-[1.4] tracking-[-0.02rem] text-gray-10">
            {title}
          </h1>

          {subTitle ? (
            <p className="font-base whitespace-nowrap text-center text-[0.75rem] font-medium leading-[1.4] tracking-[-0.015rem] text-gray-7">
              {subTitle}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default DetailTopNavigation;
