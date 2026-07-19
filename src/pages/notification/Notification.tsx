import { useNavigate } from 'react-router-dom';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import NotificationCard from './components/NotificationCard';
import {
  MOCK_NOTIFICATIONS,
  NOTIFICATION_DESTINATION_MAP,
} from './constants/notificationConstants';
import { groupNotificationsByDate } from './utils/notificationDate';

import type { NotificationItemTypes } from './types/notificationTypes';

const Notification = () => {
  const navigate = useNavigate();
  const notificationGroups = groupNotificationsByDate(MOCK_NOTIFICATIONS);

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleNotificationClick = (notification: NotificationItemTypes) => {
    navigate(NOTIFICATION_DESTINATION_MAP[notification.type]);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        title="알림"
        onBackButtonClick={handleBackButtonClick}
        isBorderVisible={false}
        className="mt-[3.06rem] bg-beige-2"
      />

      <main className="flex-1 bg-beige-5 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {notificationGroups.map((notificationGroup, groupIndex) => (
          <section
            key={notificationGroup.dateLabel}
            className={
              groupIndex === 0 ? 'pt-6' : 'mt-8 border-t border-gray-4 pt-8'
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
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Notification;
