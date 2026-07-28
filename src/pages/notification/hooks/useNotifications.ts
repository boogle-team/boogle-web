import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getNotifications,
  NOTIFICATION_QUERY_KEY,
  patchNotificationRead,
} from '@/pages/notification/apis/notificationApi';

import type { GetNotificationsDataTypes } from '@/pages/notification/types/notificationTypes';

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: getNotifications,
  });

  const { mutate: markNotificationAsRead } = useMutation({
    mutationFn: patchNotificationRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEY });

      const previousNotifications =
        queryClient.getQueryData<GetNotificationsDataTypes>(
          NOTIFICATION_QUERY_KEY,
        );

      queryClient.setQueryData<GetNotificationsDataTypes>(
        NOTIFICATION_QUERY_KEY,
        (previous) => {
          if (!previous) return previous;

          const selectedNotification = previous.notifications.find(
            (notification) => notification.id === notificationId,
          );

          return {
            notifications: previous.notifications.map((notification) =>
              notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification,
            ),
            unreadCount:
              selectedNotification && !selectedNotification.isRead
                ? Math.max(previous.unreadCount - 1, 0)
                : previous.unreadCount,
          };
        },
      );

      return { previousNotifications };
    },
    onError: (_error, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          NOTIFICATION_QUERY_KEY,
          context.previousNotifications,
        );
      }
    },
    onSuccess: (readNotification) => {
      queryClient.setQueryData<GetNotificationsDataTypes>(
        NOTIFICATION_QUERY_KEY,
        (previous) => {
          if (!previous) return previous;

          return {
            notifications: previous.notifications.map((notification) =>
              notification.id === readNotification.id
                ? { ...notification, isRead: readNotification.isRead }
                : notification,
            ),
            unreadCount: readNotification.unreadCount,
          };
        },
      );
    },
  });

  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
    isLoading,
    isError,
    refetch,
    markNotificationAsRead,
  };
};
