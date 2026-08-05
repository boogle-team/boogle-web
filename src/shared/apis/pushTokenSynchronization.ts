import { getCurrentFirebasePushToken } from '@/shared/apis/firebaseMessaging';
import { postPushToken } from '@/shared/apis/pushTokenApi';

let synchronizationPromise: Promise<boolean> | null = null;
let lastSynchronizedToken: string | null = null;

const hasAuthenticatedSession = () =>
  typeof window !== 'undefined' &&
  Boolean(window.localStorage.getItem('accessToken'));

const runPushTokenSynchronization = async (): Promise<boolean> => {
  if (!hasAuthenticatedSession()) {
    return false;
  }

  const token = await getCurrentFirebasePushToken();

  if (!token || token === lastSynchronizedToken) {
    return Boolean(token);
  }

  await postPushToken({ token });
  lastSynchronizedToken = token;

  return true;
};

export const synchronizePushToken = (): Promise<boolean> => {
  if (synchronizationPromise) {
    return synchronizationPromise;
  }

  synchronizationPromise = runPushTokenSynchronization()
    .catch(() => false)
    .finally(() => {
      synchronizationPromise = null;
    });

  return synchronizationPromise;
};

export const resetPushTokenSynchronization = () => {
  lastSynchronizedToken = null;
};
