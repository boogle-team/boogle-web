import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging';

import {
  FIREBASE_CONFIG,
  IS_FIREBASE_MESSAGING_CONFIGURED,
} from '@/shared/constants/firebaseConstants';

const getFirebaseApp = (): FirebaseApp | null => {
  if (!IS_FIREBASE_MESSAGING_CONFIGURED) {
    return null;
  }

  return getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);
};

export const getFirebaseMessaging = async (): Promise<Messaging | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  const isMessagingSupported = await isSupported();

  if (!isMessagingSupported) {
    return null;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return null;
  }

  return getMessaging(firebaseApp);
};
