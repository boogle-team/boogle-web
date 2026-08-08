import { deleteToken, getToken } from 'firebase/messaging';

import { getFirebaseMessaging } from '@/shared/apis/firebase';
import { FIREBASE_VAPID_KEY } from '@/shared/constants/firebaseConstants';

import type { PushTokenRequestResultTypes } from '@/shared/types/firebaseMessagingTypes';

const SERVICE_WORKER_READY_TIMEOUT = 10000;

const waitForServiceWorkerRegistration =
  async (): Promise<ServiceWorkerRegistration | null> => {
    const existingRegistration =
      await navigator.serviceWorker.getRegistration();

    if (existingRegistration) {
      return existingRegistration;
    }

    return new Promise((resolve) => {
      const timeoutId = window.setTimeout(() => {
        resolve(null);
      }, SERVICE_WORKER_READY_TIMEOUT);

      void navigator.serviceWorker.ready
        .then((serviceWorkerRegistration) => {
          window.clearTimeout(timeoutId);
          resolve(serviceWorkerRegistration);
        })
        .catch(() => {
          window.clearTimeout(timeoutId);
          resolve(null);
        });
    });
  };

const getNotificationPermission = async (): Promise<NotificationPermission> => {
  if (Notification.permission !== 'default') {
    return Notification.permission;
  }

  return Notification.requestPermission();
};

const isFirebasePushSupported = () =>
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator;

export const requestFirebasePushToken =
  async (): Promise<PushTokenRequestResultTypes> => {
    if (!isFirebasePushSupported()) {
      return { status: 'unsupported', token: null };
    }

    try {
      const notificationPermission = await getNotificationPermission();

      if (notificationPermission === 'denied') {
        return { status: 'permissionDenied', token: null };
      }

      if (notificationPermission === 'default') {
        return { status: 'permissionDismissed', token: null };
      }

      const messaging = await getFirebaseMessaging();

      if (!messaging) {
        return { status: 'messagingUnavailable', token: null };
      }

      const serviceWorkerRegistration =
        await waitForServiceWorkerRegistration();

      if (!serviceWorkerRegistration) {
        return { status: 'serviceWorkerUnavailable', token: null };
      }

      const token = await getToken(messaging, {
        vapidKey: FIREBASE_VAPID_KEY,
        serviceWorkerRegistration,
      });

      if (!token) {
        return { status: 'tokenUnavailable', token: null };
      }

      return { status: 'success', token };
    } catch {
      return { status: 'failed', token: null };
    }
  };

export const getCurrentFirebasePushToken = async (): Promise<string | null> => {
  if (!isFirebasePushSupported() || Notification.permission !== 'granted') {
    return null;
  }

  try {
    const messaging = await getFirebaseMessaging();
    const serviceWorkerRegistration = await waitForServiceWorkerRegistration();

    if (!messaging || !serviceWorkerRegistration) {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
      serviceWorkerRegistration,
    });

    return token || null;
  } catch {
    return null;
  }
};

export const deleteFirebasePushToken = async (): Promise<boolean> => {
  if (!isFirebasePushSupported()) {
    return false;
  }

  try {
    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      return false;
    }

    return await deleteToken(messaging);
  } catch {
    return false;
  }
};
