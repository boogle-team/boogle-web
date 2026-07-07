import { Bell, ChevronDown, Settings } from 'lucide-react';
import type { TopNavigationPropTypes } from './types/topNavigationPropsTypes';

const HomeTopNavigation = ({
  title,
  subTitle,
  onTitleClick,
  onNotificationButtonClick,
  onSettingButtonClick,
  className = '',
}: TopNavigationPropTypes) => {
  const handleTitleClick = () => {
    if (onTitleClick) {
      onTitleClick();
    }
  };

  const handleNotificationButtonClick = () => {
    if (onNotificationButtonClick) {
      onNotificationButtonClick();
    }
  };

  const handleSettingButtonClick = () => {
    if (onSettingButtonClick) {
      onSettingButtonClick();
    }
  };

  return (
    <header
      className={`flex h-[3.5625rem] w-full items-center justify-between border-b border-gray-3 bg-beige-1 px-layout ${className}`}
    >
      <button
        type="button"
        onClick={handleTitleClick}
        className="flex items-center gap-[0.375rem]"
      >
        <div className="flex items-center gap-[0.375rem]">
          <span className="title whitespace-nowrap leading-[1.3] tracking-[-0.03125rem] text-gray-10">
            {title}
          </span>

          {subTitle ? (
            <span className="body-m whitespace-nowrap leading-[1.4] tracking-[-0.0125rem] text-gray-10">
              {subTitle}
            </span>
          ) : null}
        </div>

        <ChevronDown
          aria-hidden="true"
          className="h-[1.5rem] w-[1.5rem] text-gray-8"
          strokeWidth={1.5}
        />
      </button>

      <div className="flex items-center gap-[0.75rem]">
        <button
          type="button"
          aria-label="알림"
          onClick={handleNotificationButtonClick}
          className="relative flex h-[1.75rem] w-[1.75rem] items-center justify-center"
        >
          <Bell
            aria-hidden="true"
            className="h-[1.25rem] w-[1.25rem] text-gray-7"
            strokeWidth={2}
          />
          <span className="absolute right-[0.125rem] top-[0.125rem] h-[0.375rem] w-[0.375rem] rounded-full bg-semantic-danger" />
        </button>

        <button
          type="button"
          aria-label="설정"
          onClick={handleSettingButtonClick}
          className="flex h-[1.75rem] w-[1.75rem] items-center justify-center"
        >
          <Settings
            aria-hidden="true"
            className="h-[1.25rem] w-[1.25rem] text-gray-7"
            strokeWidth={2}
          />
        </button>
      </div>
    </header>
  );
};

export default HomeTopNavigation;