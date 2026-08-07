import { useQuery } from '@tanstack/react-query';

import {
  getNotifications,
  NOTIFICATION_QUERY_KEY,
} from '@/pages/notification/apis/notificationApi';

export const useNotificationsQuery = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: getNotifications,
  });

  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
    isLoading,
    isError,
    refetch,
  };
};
