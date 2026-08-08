import { useEffect, useState } from 'react';
import { onMessage, type Unsubscribe } from 'firebase/messaging';
import { useQueryClient } from '@tanstack/react-query';

import { NOTIFICATION_QUERY_KEY } from '@/pages/notification/apis/notificationApi';
import { getFirebaseMessaging } from '@/shared/apis/firebase';

import type { ForegroundNotificationTypes } from '@/pages/notification/types/foregroundNotificationTypes';

const FOREGROUND_NOTIFICATION_DURATION = 4000;
const DEFAULT_NOTIFICATION_TITLE = '부글';
const DEFAULT_NOTIFICATION_BODY = '새로운 알림이 도착했어요.';

export const useForegroundNotification = () => {
  const queryClient = useQueryClient();
  const [foregroundNotification, setForegroundNotification] =
    useState<ForegroundNotificationTypes | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    let isDisposed = false;

    void getFirebaseMessaging()
      .then((messaging) => {
        if (!messaging || isDisposed) {
          return;
        }

        unsubscribe = onMessage(messaging, (payload) => {
          const title =
            payload.data?.title ??
            payload.notification?.title ??
            DEFAULT_NOTIFICATION_TITLE;
          const body =
            payload.data?.body ??
            payload.notification?.body ??
            DEFAULT_NOTIFICATION_BODY;

          setForegroundNotification({ title, body });

          void queryClient.invalidateQueries({
            queryKey: NOTIFICATION_QUERY_KEY,
          });
        });
      })
      .catch(() => undefined);

    return () => {
      isDisposed = true;
      unsubscribe?.();
    };
  }, [queryClient]);

  useEffect(() => {
    if (!foregroundNotification) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setForegroundNotification(null);
    }, FOREGROUND_NOTIFICATION_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [foregroundNotification]);

  const dismissForegroundNotification = () => {
    setForegroundNotification(null);
  };

  return {
    foregroundNotification,
    dismissForegroundNotification,
  };
};
