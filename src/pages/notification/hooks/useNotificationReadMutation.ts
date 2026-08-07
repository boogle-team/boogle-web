import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  NOTIFICATION_QUERY_KEY,
  patchNotificationRead,
} from '@/pages/notification/apis/notificationApi';

import type { GetNotificationsDataTypes } from '@/pages/notification/types/notificationTypes';

export const useNotificationReadMutation = () => {
  const queryClient = useQueryClient();

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
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY,
      });
    },
  });

  return { markNotificationAsRead };
};
