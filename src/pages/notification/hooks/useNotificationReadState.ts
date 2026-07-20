import { useMemo, useState } from 'react';

import type { NotificationItemTypes } from '../types/notificationTypes';

const READ_NOTIFICATION_IDS_STORAGE_KEY = 'boogle.notification.readIds';

const getStoredReadNotificationIds = () => {
  try {
    const storedReadNotificationIds = sessionStorage.getItem(
      READ_NOTIFICATION_IDS_STORAGE_KEY,
    );

    if (!storedReadNotificationIds) return [];

    const parsedReadNotificationIds: unknown = JSON.parse(
      storedReadNotificationIds,
    );

    if (!Array.isArray(parsedReadNotificationIds)) return [];

    return parsedReadNotificationIds.filter(
      (notificationId): notificationId is number =>
        typeof notificationId === 'number',
    );
  } catch {
    return [];
  }
};

export const useNotificationReadState = (
  initialNotifications: NotificationItemTypes[],
) => {
  const [readNotificationIds, setReadNotificationIds] = useState<number[]>(
    getStoredReadNotificationIds,
  );

  const notifications = useMemo(
    () =>
      initialNotifications.map((notification) => ({
        ...notification,
        isRead:
          notification.isRead || readNotificationIds.includes(notification.id),
      })),
    [initialNotifications, readNotificationIds],
  );

  const markNotificationAsRead = (notificationId: number) => {
    setReadNotificationIds((currentReadNotificationIds) => {
      if (currentReadNotificationIds.includes(notificationId)) {
        return currentReadNotificationIds;
      }

      const nextReadNotificationIds = [
        ...currentReadNotificationIds,
        notificationId,
      ];

      sessionStorage.setItem(
        READ_NOTIFICATION_IDS_STORAGE_KEY,
        JSON.stringify(nextReadNotificationIds),
      );

      return nextReadNotificationIds;
    });
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return {
    notifications,
    unreadCount,
    markNotificationAsRead,
  };
};
