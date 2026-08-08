import { useNavigate } from 'react-router-dom';

import NotificationList from '@/pages/notification/components/NotificationList';
import { NOTIFICATION_DESTINATION_MAP } from '@/pages/notification/constants/notificationConstants';
import { useNotificationReadMutation } from '@/pages/notification/hooks/useNotificationReadMutation';
import { useNotificationsQuery } from '@/pages/notification/hooks/useNotificationsQuery';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type { NotificationItemTypes } from '@/pages/notification/types/notificationTypes';

const Notification = () => {
  const navigate = useNavigate();
  const { notifications, isLoading, isError, refetch } =
    useNotificationsQuery();
  const { markNotificationAsRead } = useNotificationReadMutation();

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  const handleNotificationClick = (notification: NotificationItemTypes) => {
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
    }

    navigate(NOTIFICATION_DESTINATION_MAP[notification.linkTo] ?? '/');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-5">
      <DefaultTopNavigation
        title="알림"
        onBackButtonClick={handleBackButtonClick}
        isBorderVisible={false}
        className="bg-beige-5"
      />

      <main className="flex flex-1 flex-col bg-beige-5 px-4 pb-[calc(var(--page-bottom-padding)+var(--safe-area-bottom))]">
        <NotificationList
          notifications={notifications}
          status={isLoading ? 'loading' : isError ? 'error' : 'success'}
          onNotificationClick={handleNotificationClick}
          onRetry={refetch}
        />
      </main>
    </div>
  );
};

export default Notification;
