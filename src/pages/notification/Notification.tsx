import { useNavigate } from 'react-router-dom';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import NotificationList from './components/NotificationList';
import {
  MOCK_NOTIFICATION_DATA,
  NOTIFICATION_DESTINATION_MAP,
} from './constants/notificationConstants';
import { useNotificationReadState } from './hooks/useNotificationReadState';

import type { NotificationItemTypes } from './types/notificationTypes';

const Notification = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead } = useNotificationReadState(
    MOCK_NOTIFICATION_DATA.notifications,
  );

  const handleBackButtonClick = () => {
    navigate('/');
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
          onNotificationClick={handleNotificationClick}
        />
      </main>
    </div>
  );
};

export default Notification;
