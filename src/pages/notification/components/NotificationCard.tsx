import ChartIcon from '@/shared/assets/icons/notificationPageIcons/chartIcon.svg?react';
import ClockIcon from '@/shared/assets/icons/notificationPageIcons/clockIcon.svg?react';
import FlameIcon from '@/shared/assets/icons/notificationPageIcons/flameIcon.svg?react';
import RoundedChartIcon from '@/shared/assets/icons/notificationPageIcons/roundedChartIcon.svg?react';
import WarningNoticeIcon from '@/shared/assets/icons/notificationPageIcons/warningNotice.svg?react';

import { getNotificationTimestamp } from '@/pages/notification/utils/notificationDate';

import type {
  NotificationCategoryTypes,
  NotificationIconTypes,
  NotificationItemTypes,
  NotificationTypeTypes,
} from '@/pages/notification/types/notificationTypes';
import type { ComponentType, SVGProps } from 'react';

interface NotificationCardPropTypes {
  notification: NotificationItemTypes;
  onClick: () => void;
}

const NOTIFICATION_ICON_MAP = {
  warning: WarningNoticeIcon,
  record: ClockIcon,
  weeklyReport: ChartIcon,
  monthlyReport: RoundedChartIcon,
  streak: FlameIcon,
} satisfies Record<
  NotificationIconTypes,
  ComponentType<SVGProps<SVGSVGElement>>
>;

const DEFAULT_NOTIFICATION_ICON_MAP = {
  W: 'warning',
  R: 'record',
  P: 'weeklyReport',
} satisfies Record<NotificationCategoryTypes, NotificationIconTypes>;

const NOTIFICATION_TYPE_ICON_MAP = {
  WARNING: 'warning',
  RECORD_REMINDER: 'record',
  REPORT_READY: 'weeklyReport',
  PDF_SAVED: 'monthlyReport',
  STREAK: 'streak',
} satisfies Record<NotificationTypeTypes, NotificationIconTypes>;

const NotificationCard = ({
  notification,
  onClick,
}: NotificationCardPropTypes) => {
  const isWarning = notification.category === 'W';
  const iconType = notification.type
    ? NOTIFICATION_TYPE_ICON_MAP[notification.type]
    : DEFAULT_NOTIFICATION_ICON_MAP[notification.category];
  const NotificationIcon = NOTIFICATION_ICON_MAP[iconType];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-start gap-4 rounded-xl p-3 text-left ${
        isWarning
          ? 'border border-orange-3 bg-orange-1'
          : 'bg-beige-1 shadow-sm'
      }`}
    >
      <NotificationIcon
        aria-hidden="true"
        focusable="false"
        className="h-10 w-10 shrink-0"
      />

      <span className="min-w-0 flex-1 pr-2">
        <strong
          className={`label-bold block ${
            isWarning ? 'text-orange-7' : 'text-gray-10'
          }`}
        >
          {notification.title}
        </strong>
        <span className="caption-reg mt-[0.13rem] block text-gray-7">
          {notification.content}
        </span>
        <time
          dateTime={notification.regDate}
          className="micro mt-1 block text-gray-6"
        >
          {getNotificationTimestamp(notification.regDate)}
        </time>
      </span>

      {!notification.isRead && (
        <>
          <span className="sr-only">읽지 않음</span>
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 h-1.5 w-1.5 rounded-[99px] bg-semantic-danger"
          />
        </>
      )}
    </button>
  );
};

export default NotificationCard;
