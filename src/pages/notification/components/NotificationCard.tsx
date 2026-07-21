import chartIcon from '@/shared/assets/icons/notificationPageIcons/chartIcon.svg?url';
import clockIcon from '@/shared/assets/icons/notificationPageIcons/clockIcon.svg?url';
import flameIcon from '@/shared/assets/icons/notificationPageIcons/flameIcon.svg?url';
import roundedChartIcon from '@/shared/assets/icons/notificationPageIcons/roundedChartIcon.svg?url';
import warningNoticeIcon from '@/shared/assets/icons/notificationPageIcons/warningNotice.svg?url';

import { getNotificationTimestamp } from '../utils/notificationDate';

import type {
  NotificationCategoryTypes,
  NotificationIconTypes,
  NotificationItemTypes,
} from '../types/notificationTypes';

interface NotificationCardPropTypes {
  notification: NotificationItemTypes;
  onClick: () => void;
}

const NOTIFICATION_ICON_MAP = {
  warning: warningNoticeIcon,
  record: clockIcon,
  weeklyReport: chartIcon,
  monthlyReport: roundedChartIcon,
  streak: flameIcon,
} satisfies Record<NotificationIconTypes, string>;

const DEFAULT_NOTIFICATION_ICON_MAP = {
  W: 'warning',
  R: 'record',
  P: 'weeklyReport',
} satisfies Record<NotificationCategoryTypes, NotificationIconTypes>;

const NotificationCard = ({
  notification,
  onClick,
}: NotificationCardPropTypes) => {
  const isWarning = notification.category === 'W';
  const iconType =
    notification.iconType ??
    DEFAULT_NOTIFICATION_ICON_MAP[notification.category];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-start gap-4 rounded-[12px] p-[0.75rem] text-left ${
        isWarning
          ? 'border border-orange-3 bg-orange-1'
          : 'bg-beige-1 shadow-sm'
      }`}
    >
      <img
        src={NOTIFICATION_ICON_MAP[iconType]}
        alt=""
        aria-hidden="true"
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
        <span
          aria-label="읽지 않은 알림"
          className="absolute top-3 right-3 h-1.5 w-1.5 rounded-[99px] bg-semantic-danger"
        />
      )}
    </button>
  );
};

export default NotificationCard;
