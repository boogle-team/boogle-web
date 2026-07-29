import NotificationCard from '@/pages/notification/components/NotificationCard';
import { groupNotificationsByDate } from '@/pages/notification/utils/notificationDate';
import NotificationEmptyState from '@/shared/assets/icons/notificationPageIcons/notificationEmptyState.svg?react';

import type { NotificationItemTypes } from '@/pages/notification/types/notificationTypes';

type NotificationListStatusTypes = 'loading' | 'success' | 'error';

const NotificationListSkeleton = () => {
  return (
    <div aria-label="알림을 불러오는 중" className="flex flex-col gap-2 pt-6">
      {[0, 1, 2].map((skeletonId) => (
        <div
          key={skeletonId}
          className="flex animate-pulse gap-4 rounded-xl bg-beige-1 p-3"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-beige-6" />
          <div className="flex-1 py-1">
            <div className="h-4 w-2/3 rounded bg-beige-6" />
            <div className="mt-2 h-3 w-full rounded bg-beige-6" />
            <div className="mt-2 h-2.5 w-1/4 rounded bg-beige-6" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface NotificationListPropTypes {
  notifications: NotificationItemTypes[];
  status?: NotificationListStatusTypes;
  onNotificationClick: (notification: NotificationItemTypes) => void;
  onRetry?: () => void;
}

const NotificationList = ({
  notifications,
  status = 'success',
  onNotificationClick,
  onRetry,
}: NotificationListPropTypes) => {
  if (status === 'loading') {
    return <NotificationListSkeleton />;
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <strong className="label-bold text-gray-10">
          알림을 불러오지 못했어요
        </strong>
        <p className="caption-reg mt-2 text-gray-7">
          잠시 후 다시 시도해주세요.
        </p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="label-semi mt-4 rounded-lg bg-orange-5 px-4 py-2 text-beige-1"
          >
            다시 시도
          </button>
        ) : null}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-6.625rem)] -translate-y-8 flex-col items-center justify-center text-center">
        <NotificationEmptyState
          aria-hidden="true"
          className="h-[7.5rem] w-[7.5rem] shrink-0"
        />
        <strong className="body-m-bold mt-5 text-gray-10">
          아직 새로운 알림이 없어요
        </strong>
        <p className="caption mt-2 text-gray-7">
          새로운 소식이 오면 알려드릴게요.
        </p>
      </div>
    );
  }

  const notificationGroups = groupNotificationsByDate(notifications);

  return notificationGroups.map((notificationGroup, groupIndex) => (
    <section
      key={notificationGroup.dateLabel}
      className={
        groupIndex === 0 ? 'pt-6' : 'mt-8 border-t border-beige-7 pt-8'
      }
    >
      <h2 className="label-semi mb-2 text-gray-8">
        {notificationGroup.dateLabel}
      </h2>

      <div className="flex flex-col gap-2">
        {notificationGroup.notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClick={() => onNotificationClick(notification)}
          />
        ))}
      </div>
    </section>
  ));
};

export default NotificationList;
