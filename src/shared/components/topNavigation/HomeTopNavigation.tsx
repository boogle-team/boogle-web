import AlarmBellIcon from '@/shared/assets/icons/alarmBellIcon.svg?react';
import ChevronDownIcon from '@/shared/assets/icons/chevronDownIcon.svg?react';
import NotificationDotIcon from '@/shared/assets/icons/notificationDotIcon.svg?react';
import SettingIcon from '@/shared/assets/icons/settingIcon.svg?react';
import type { TopNavigationPropTypes } from './types/topNavigationPropsTypes';

const HomeTopNavigation = ({
  title,
  subTitle,
  onTitleClick,
  onNotificationButtonClick,
  onSettingButtonClick,
  hasUnreadNotification = false,
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
    <header className={`w-full bg-beige-1 ${className}`}>
      <div aria-hidden="true" className="h-[3.06rem]" />

      <div className="flex h-[3.5625rem] items-center justify-between border-b border-gray-3 px-[1rem]">
        {/* 날짜 / 요일 / 드롭다운 영역 */}
        <button
          type="button"
          onClick={handleTitleClick}
          className="flex items-center gap-[0.5rem]"
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

          <ChevronDownIcon
            aria-hidden="true"
            className="h-[0.5625rem] w-[1rem] shrink-0 text-gray-8"
          />
        </button>

        {/* 오른쪽 아이콘 영역 */}
        <div className="flex items-center gap-3">
          {/* 알림 버튼 */}
          <button
            type="button"
            aria-label={hasUnreadNotification ? '새 알림 있음' : '알림'}
            onClick={handleNotificationButtonClick}
            className="relative flex h-7 w-7 items-center justify-center"
          >
            <AlarmBellIcon
              aria-hidden="true"
              className="h-[1.27875rem] w-[1.20313rem] shrink-0 text-gray-7"
            />

            {hasUnreadNotification ? (
              <NotificationDotIcon
                aria-hidden="true"
                className="absolute right-[0.125rem] top-[0.125rem] h-[0.25rem] w-[0.25rem] shrink-0 text-semantic-danger"
              />
            ) : null}
          </button>

          {/* 설정 버튼 */}
          <button
            type="button"
            aria-label="설정"
            onClick={handleSettingButtonClick}
            className="flex h-7 w-7 items-center justify-center p-0.75"
          >
            <SettingIcon
              aria-hidden="true"
              className="h-5.5 w-5.5 shrink-0 text-gray-7"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeTopNavigation;
