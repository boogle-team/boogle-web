import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  NOTIFICATION_SETTINGS_QUERY_KEY,
  patchNotificationSetting,
} from '@/pages/settings/apis/notificationSettingsApi';

export const useNotificationSettingMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateNotificationSetting,
    isPending: isNotificationSettingPending,
  } = useMutation({
    mutationFn: patchNotificationSetting,
    onSuccess: (notificationSettings) => {
      queryClient.setQueryData(
        NOTIFICATION_SETTINGS_QUERY_KEY,
        notificationSettings,
      );
    },
  });

  return {
    updateNotificationSetting,
    isNotificationSettingPending,
  };
};
