import { useState } from 'react';

import { useNotificationSettingMutation } from '@/pages/settings/hooks/useNotificationSettingMutation';
import { useNotificationSettingsQuery } from '@/pages/settings/hooks/useNotificationSettingsQuery';
import type {
  MemberAlarmTypes,
  YnTypes,
} from '@/pages/settings/types/settingsTypes';
import { requestFirebasePushToken } from '@/shared/apis/firebaseMessaging';
import { usePushTokenRegistrationMutation } from '@/shared/hooks/usePushTokenRegistrationMutation';
import type { PushTokenRequestStatusTypes } from '@/shared/types/firebaseMessagingTypes';

const DISABLED_MEMBER_ALARM: MemberAlarmTypes = {
  recordAlarm: 'N',
  reportAlarm: 'N',
  warnAlarm: 'N',
};

const PUSH_TOKEN_FAILURE_MESSAGE_MAP: Record<
  Exclude<PushTokenRequestStatusTypes, 'success'>,
  string
> = {
  unsupported: '이 브라우저에서는 푸시 알림을 지원하지 않아요.',
  permissionDenied: '브라우저 설정에서 알림 권한을 허용해주세요.',
  permissionDismissed: '알림 권한을 허용해야 설정을 켤 수 있어요.',
  serviceWorkerUnavailable:
    '알림 서비스를 준비하지 못했어요. 잠시 후 다시 시도해주세요.',
  messagingUnavailable: 'Firebase 알림 서비스를 사용할 수 없어요.',
  tokenUnavailable: '푸시 알림 토큰을 발급받지 못했어요.',
  failed: '푸시 알림 설정 중 오류가 발생했어요.',
};

const useAlarmSettings = () => {
  const [alarmNoticeMessage, setAlarmNoticeMessage] = useState<string | null>(
    null,
  );
  const {
    notificationSettings,
    isNotificationSettingsLoading,
    isNotificationSettingsError,
  } = useNotificationSettingsQuery();
  const { updateNotificationSetting, isNotificationSettingPending } =
    useNotificationSettingMutation();
  const { registerPushToken, isPushTokenRegistrationPending } =
    usePushTokenRegistrationMutation();

  const memberAlarm = notificationSettings ?? DISABLED_MEMBER_ALARM;
  const isAlarmSettingDisabled =
    isNotificationSettingsLoading ||
    isNotificationSettingsError ||
    isNotificationSettingPending ||
    isPushTokenRegistrationPending;
  const resolvedAlarmNoticeMessage = isNotificationSettingsError
    ? '알림 설정을 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    : alarmNoticeMessage;

  const updateAlarmSetting = async (
    alarmKey: keyof MemberAlarmTypes,
    alarmValue: YnTypes,
  ) => {
    await updateNotificationSetting({ alarmKey, alarmValue });
    setAlarmNoticeMessage(null);
  };

  const enableAlarmSetting = async (alarmKey: keyof MemberAlarmTypes) => {
    const pushTokenResult = await requestFirebasePushToken();

    if (pushTokenResult.status !== 'success' || !pushTokenResult.token) {
      const status = pushTokenResult.status;

      setAlarmNoticeMessage(
        status === 'success'
          ? PUSH_TOKEN_FAILURE_MESSAGE_MAP.tokenUnavailable
          : PUSH_TOKEN_FAILURE_MESSAGE_MAP[status],
      );
      return;
    }

    await registerPushToken({ token: pushTokenResult.token });
    await updateAlarmSetting(alarmKey, 'Y');
  };

  const toggleAlarm = async (alarmKey: keyof MemberAlarmTypes) => {
    if (!notificationSettings || isAlarmSettingDisabled) {
      return;
    }

    setAlarmNoticeMessage(null);

    try {
      if (notificationSettings[alarmKey] === 'Y') {
        await updateAlarmSetting(alarmKey, 'N');
        return;
      }

      await enableAlarmSetting(alarmKey);
    } catch {
      setAlarmNoticeMessage(
        '알림 설정을 저장하지 못했어요. 다시 시도해주세요.',
      );
    }
  };

  return {
    memberAlarm,
    toggleAlarm,
    isAlarmSettingDisabled,
    alarmNoticeMessage: resolvedAlarmNoticeMessage,
  };
};

export default useAlarmSettings;
