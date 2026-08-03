import { useNavigate } from 'react-router-dom';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import NotificationList from './components/NotificationList';
import { NOTIFICATION_DESTINATION_MAP } from './constants/notificationConstants';
import { useNotifications } from './hooks/useNotifications';

import type { NotificationItemTypes } from './types/notificationTypes';

const Notification = () => {
  const navigate = useNavigate();
  const { notifications, isLoading, isError, refetch, markNotificationAsRead } =
    useNotifications();

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  const handleNotificationClick = (notification: NotificationItemTypes) => {
    markNotificationAsRead(notification.id);
    navigate(NOTIFICATION_DESTINATION_MAP[notification.linkTo]);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-5">
      <DefaultTopNavigation
        title="알림"
        onBackButtonClick={handleBackButtonClick}
        isBorderVisible={false}
        className="mt-[3.06rem] bg-beige-5"
      />

      <main className="flex-1 bg-beige-5 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
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
