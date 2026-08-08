import {
  deleteFirebasePushToken,
  getCurrentFirebasePushToken,
} from '@/shared/apis/firebaseMessaging';
import { deletePushToken, postPushToken } from '@/shared/apis/pushTokenApi';
import type { PushTokenRequestTypes } from '@/shared/types/pushTokenTypes';
import { getAccessToken } from '@/shared/utils/authTokenStorage';

const REGISTERED_PUSH_TOKEN_STORAGE_KEY = 'registeredPushToken';

let synchronizationPromise: Promise<boolean> | null = null;
let pushTokenOperationQueue: Promise<void> = Promise.resolve();
let lastSynchronizedToken: string | null = null;
let isPushTokenRegistrationBlocked = false;

const hasAuthenticatedSession = () =>
  typeof window !== 'undefined' && Boolean(getAccessToken());

const getStoredRegisteredPushToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(REGISTERED_PUSH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeRegisteredPushToken = (token: string) => {
  try {
    window.localStorage.setItem(REGISTERED_PUSH_TOKEN_STORAGE_KEY, token);
  } catch {
    // 저장 실패가 서버 토큰 등록을 실패로 바꾸지 않도록 합니다.
  }
};

const clearStoredRegisteredPushToken = () => {
  try {
    window.localStorage.removeItem(REGISTERED_PUSH_TOKEN_STORAGE_KEY);
  } catch {
    // 저장소 접근 실패가 로그아웃을 막지 않도록 합니다.
  }
};

const enqueuePushTokenOperation = <ResultTypes>(
  operation: () => Promise<ResultTypes>,
): Promise<ResultTypes> => {
  const operationPromise = pushTokenOperationQueue.then(operation, operation);

  pushTokenOperationQueue = operationPromise.then(
    () => undefined,
    () => undefined,
  );

  return operationPromise;
};

const registerPushTokenUnderLock = async (token: string): Promise<boolean> => {
  if (isPushTokenRegistrationBlocked || !hasAuthenticatedSession()) {
    return false;
  }

  if (token === lastSynchronizedToken) {
    return true;
  }

  await postPushToken({ token });
  storeRegisteredPushToken(token);
  lastSynchronizedToken = token;

  return true;
};

export const registerSynchronizedPushToken = ({
  token,
}: PushTokenRequestTypes): Promise<boolean> =>
  enqueuePushTokenOperation(() => registerPushTokenUnderLock(token));

const runPushTokenSynchronization = async (): Promise<boolean> => {
  if (isPushTokenRegistrationBlocked || !hasAuthenticatedSession()) {
    return false;
  }

  const token = await getCurrentFirebasePushToken();

  if (!token || isPushTokenRegistrationBlocked) {
    return false;
  }

  return registerPushTokenUnderLock(token);
};

export const synchronizePushToken = (): Promise<boolean> => {
  if (synchronizationPromise) {
    return synchronizationPromise;
  }

  synchronizationPromise = enqueuePushTokenOperation(
    runPushTokenSynchronization,
  )
    .catch(() => false)
    .finally(() => {
      synchronizationPromise = null;
    });

  return synchronizationPromise;
};

export const cleanupSynchronizedPushToken = (): Promise<boolean> => {
  isPushTokenRegistrationBlocked = true;

  return enqueuePushTokenOperation(async () => {
    const storedToken = getStoredRegisteredPushToken();
    const currentToken = await getCurrentFirebasePushToken();
    const tokensToDelete = [...new Set([storedToken, currentToken])].filter(
      (token): token is string => Boolean(token),
    );
    let isServerCleanupSuccessful = true;

    for (const token of tokensToDelete) {
      try {
        await deletePushToken({ token });
      } catch {
        isServerCleanupSuccessful = false;
      }
    }

    await deleteFirebasePushToken();
    lastSynchronizedToken = null;

    if (isServerCleanupSuccessful) {
      clearStoredRegisteredPushToken();
    }

    return isServerCleanupSuccessful;
  });
};

export const resumePushTokenSynchronization = () => {
  isPushTokenRegistrationBlocked = false;
};
