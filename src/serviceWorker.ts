/// <reference lib="webworker" />

import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

import {
  FIREBASE_CONFIG,
  IS_FIREBASE_CONFIGURED,
} from '@/shared/constants/firebaseConstants';
import { NOTIFICATION_DESTINATION_MAP } from '@/pages/notification/constants/notificationConstants';

import type { NotificationLinkToTypes } from '@/pages/notification/types/notificationTypes';

declare const self: ServiceWorkerGlobalScope;

// workbox-window의 messageSkipWaiting()이 보내는 메시지 타입과 동일해야 한다.
const SKIP_WAITING_MESSAGE_TYPE = 'SKIP_WAITING';

const DEFAULT_NOTIFICATION_TITLE = '부글';
const DEFAULT_NOTIFICATION_BODY = '새로운 알림이 도착했어요.';
const DEFAULT_NOTIFICATION_LINK_TO = 'HOME';

interface PushNotificationDataTypes {
  linkTo?: unknown;
}

const isNotificationLinkTo = (
  linkTo: unknown,
): linkTo is NotificationLinkToTypes =>
  typeof linkTo === 'string' &&
  Object.hasOwn(NOTIFICATION_DESTINATION_MAP, linkTo);

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('/index.html'), {
    denylist: [/^\/api\//],
  }),
);

// 사용자가 업데이트를 수락하기 전까지 새 서비스 워커를 대기 상태로 둔다.
// 즉시 skipWaiting을 호출하면 기록 입력 중에 화면이 갱신될 수 있다.
self.addEventListener('message', (event) => {
  if (event.data?.type === SKIP_WAITING_MESSAGE_TYPE) {
    void self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

const registerFirebaseBackgroundMessageHandler = () => {
  if (!IS_FIREBASE_CONFIGURED) {
    return;
  }

  try {
    const firebaseApp = initializeApp(FIREBASE_CONFIG);
    const messaging = getMessaging(firebaseApp);

    onBackgroundMessage(messaging, async (payload) => {
      // notification payload는 FCM이 자동 표시하므로 중복 알림을 만들지 않습니다.
      if (payload.notification) {
        return;
      }

      const {
        notificationId = '',
        title = DEFAULT_NOTIFICATION_TITLE,
        body = DEFAULT_NOTIFICATION_BODY,
        type = '',
        linkTo = DEFAULT_NOTIFICATION_LINK_TO,
      } = payload.data ?? {};

      await self.registration.showNotification(title, {
        body,
        icon: '/pwa-192x192.png',
        tag: notificationId
          ? `boogle-notification-${notificationId}`
          : undefined,
        data: {
          notificationId,
          type,
          linkTo,
        },
      });
    });
  } catch {
    // Firebase 초기화 실패가 기존 PWA 캐시 동작을 중단하지 않도록 합니다.
  }
};

registerFirebaseBackgroundMessageHandler();

const handleNotificationClick = (event: NotificationEvent) => {
  event.notification.close();

  const notificationData = event.notification.data as
    PushNotificationDataTypes | undefined;

  const destinationPath = isNotificationLinkTo(notificationData?.linkTo)
    ? NOTIFICATION_DESTINATION_MAP[notificationData.linkTo]
    : NOTIFICATION_DESTINATION_MAP.HOME;

  const destinationUrl = new URL(destinationPath, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      const windowClients = clients.filter(
        (client): client is WindowClient =>
          client.type === 'window' &&
          new URL(client.url).origin === self.location.origin,
      );

      const exactWindowClient = windowClients.find(
        (client) => client.url === destinationUrl,
      );
      const existingWindowClient = exactWindowClient ?? windowClients[0];

      if (existingWindowClient) {
        try {
          const navigatedWindowClient =
            existingWindowClient.url === destinationUrl
              ? existingWindowClient
              : await existingWindowClient.navigate(destinationUrl);

          await (navigatedWindowClient ?? existingWindowClient).focus();
          return;
        } catch {
          // 현재 서비스 워커가 제어하지 않는 창이면 새 창으로 대체합니다.
        }
      }

      await self.clients.openWindow(destinationUrl);
    })(),
  );
};

self.addEventListener('notificationclick', handleNotificationClick);
