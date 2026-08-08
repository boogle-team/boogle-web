import { useQuery } from '@tanstack/react-query';

import {
  getNotificationSettings,
  NOTIFICATION_SETTINGS_QUERY_KEY,
} from '@/pages/settings/apis/notificationSettingsApi';

export const useNotificationSettingsQuery = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: NOTIFICATION_SETTINGS_QUERY_KEY,
    queryFn: getNotificationSettings,
  });

  return {
    notificationSettings: data ?? null,
    isNotificationSettingsLoading: isLoading,
    isNotificationSettingsError: isError,
    refetchNotificationSettings: refetch,
  };
};
