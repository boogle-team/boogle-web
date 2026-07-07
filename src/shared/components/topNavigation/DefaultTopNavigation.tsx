import type { TopNavigationPropTypes } from './topNavigation.types';

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
      className={`relative h-[3.5625rem] w-full border-b border-gray-3 ${className}`}
    >
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

      <h1 className="body-m absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center tracking-[-0.02rem] text-gray-10">
        {title}
      </h1>
    </header>
  );
};

export default DefaultTopNavigation;