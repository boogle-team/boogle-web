import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getNotifications,
  NOTIFICATION_QUERY_KEY,
} from '../apis/notificationApi';

import type { GetNotificationsDataTypes } from '../types/notificationTypes';

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: getNotifications,
  });

  const markNotificationAsReadLocally = (notificationId: number) => {
    queryClient.setQueryData<GetNotificationsDataTypes>(
      NOTIFICATION_QUERY_KEY,
      (previous) => {
        if (!previous) return previous;

        const notifications = previous.notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification,
        );

        return {
          notifications,
          unreadCount: notifications.filter(
            (notification) => !notification.isRead,
          ).length,
        };
      },
    );
  };

  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
    isLoading,
    isError,
    refetch,
    markNotificationAsReadLocally,
  };
};
