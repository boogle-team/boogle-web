import type { TopNavigationPropTypes } from './topNavigation.types';

const DetailTopNavigation = ({
  title,
  subTitle,
  onBackButtonClick,
}: TopNavigationPropTypes) => {
  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    window.history.back();
  };

  return (
    <header className="relative h-[3.5625rem] w-full border-b border-gray-3 bg-beige-1">
      {/* 뒤로가기 버튼 */}
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={handleBackButtonClick}
        className="absolute left-layout top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-gray-8"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-[0.49619rem] shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 18"
          fill="none"
        >
          <path
            d="M8.93893 1L1 8.77143L8.93893 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 중앙 제목 영역 */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <h1 className="body-m whitespace-nowrap text-center tracking-[-0.02rem] text-gray-10">
          {title}
        </h1>

        {subTitle && (
          <p className="caption whitespace-nowrap text-center tracking-[-0.015rem] text-gray-7">
            {subTitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default DetailTopNavigation;