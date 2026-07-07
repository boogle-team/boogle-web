import { ChevronLeft } from 'lucide-react';
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
    <header
      className={`relative h-[3.5625rem] w-full border-b border-gray-3 bg-beige-1 ${className}`}
    >
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={handleBackButtonClick}
        className="absolute left-layout top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
      >
        <ChevronLeft
          aria-hidden="true"
          className="h-6 w-6 text-gray-8"
          strokeWidth={2}
        />
      </button>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <h1 className="body-m whitespace-nowrap text-center tracking-[-0.02rem] text-gray-10">
          {title}
        </h1>

        {subTitle ? (
          <p className="caption whitespace-nowrap text-center tracking-[-0.015rem] text-gray-7">
            {subTitle}
          </p>
        ) : null}
      </div>
    </header>
  );
};

export default DetailTopNavigation;