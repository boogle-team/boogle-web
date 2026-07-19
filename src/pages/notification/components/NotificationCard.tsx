import {
  ChartNoAxesColumnIncreasing,
  Clock3,
  Flame,
  TriangleAlert,
} from 'lucide-react';

import { getNotificationTimestamp } from '../utils/notificationDate';

import type {
  NotificationItemTypes,
  NotificationTypeTypes,
} from '../types/notificationTypes';

interface NotificationCardPropTypes {
  notification: NotificationItemTypes;
  onClick: () => void;
}

const getNotificationIcon = (type: NotificationTypeTypes) => {
  const iconClassName = 'h-6 w-6 text-beige-1';

  if (type === 'N101') {
    return <TriangleAlert aria-hidden="true" className={iconClassName} />;
  }

  if (type === 'N102') {
    return <Clock3 aria-hidden="true" className={iconClassName} />;
  }

  if (type === 'N105') {
    return <Flame aria-hidden="true" className={iconClassName} />;
  }

  return (
    <ChartNoAxesColumnIncreasing aria-hidden="true" className={iconClassName} />
  );
};

const NotificationCard = ({
  notification,
  onClick,
}: NotificationCardPropTypes) => {
  const isWarning = notification.type === 'N101';
  const isReport = notification.type === 'N103' || notification.type === 'N104';

  const iconBackgroundClassName = isReport
    ? 'bg-yellow-3'
    : isWarning
      ? 'bg-orange-5'
      : 'bg-orange-3';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-start gap-3 rounded-[12px] p-[0.75rem] text-left ${
        isWarning
          ? 'border border-orange-3 bg-orange-1'
          : 'bg-beige-1 shadow-sm'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${iconBackgroundClassName}`}
      >
        {getNotificationIcon(notification.type)}
      </span>

      <span className="min-w-0 flex-1 pr-2">
        <strong
          className={`label-bold block ${
            isWarning ? 'text-orange-7' : 'text-gray-10'
          }`}
        >
          {notification.title}
        </strong>
        <span className="caption-reg mt-1 block text-gray-7">
          {notification.description}
        </span>
        <time
          dateTime={notification.createdAt}
          className="micro mt-1 block text-gray-6"
        >
          {getNotificationTimestamp(notification.createdAt)}
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
