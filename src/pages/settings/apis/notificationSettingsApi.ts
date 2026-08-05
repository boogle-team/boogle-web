import { api } from '@/shared/apis/axiosInstance';

import type {
  MemberAlarmTypes,
  NotificationSettingsResponseTypes,
  PatchNotificationSettingVariablesTypes,
} from '@/pages/settings/types/settingsTypes';

export const NOTIFICATION_SETTINGS_QUERY_KEY = [
  'notificationSettings',
] as const;

const NOTIFICATION_SETTINGS_API_ENDPOINT =
  '/api/v1/users/me/notification-settings';

export const getNotificationSettings = async (): Promise<MemberAlarmTypes> => {
  const { data } = await api.get<NotificationSettingsResponseTypes>(
    NOTIFICATION_SETTINGS_API_ENDPOINT,
  );

  return data.data;
};

export const patchNotificationSetting = async ({
  alarmKey,
  alarmValue,
}: PatchNotificationSettingVariablesTypes): Promise<MemberAlarmTypes> => {
  const { data } = await api.patch<NotificationSettingsResponseTypes>(
    NOTIFICATION_SETTINGS_API_ENDPOINT,
    { [alarmKey]: alarmValue },
  );

  return data.data;
};
