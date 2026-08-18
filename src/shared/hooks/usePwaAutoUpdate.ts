import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;

export const usePwaAutoUpdate = () => {
  const cleanupUpdateCheckRef = useRef<(() => void) | null>(null);

  useRegisterSW({
    immediate: true,
    onRegisteredSW: (_serviceWorkerUrl, registration) => {
      if (!registration) {
        return;
      }

      cleanupUpdateCheckRef.current?.();

      const checkForUpdate = () => {
        if (document.visibilityState !== 'visible') {
          return;
        }

        void registration.update();
      };

      document.addEventListener('visibilitychange', checkForUpdate);
      const intervalId = window.setInterval(
        checkForUpdate,
        UPDATE_CHECK_INTERVAL,
      );

      cleanupUpdateCheckRef.current = () => {
        document.removeEventListener('visibilitychange', checkForUpdate);
        window.clearInterval(intervalId);
      };
    },
  });

  useEffect(() => {
    return () => {
      cleanupUpdateCheckRef.current?.();
      cleanupUpdateCheckRef.current = null;
    };
  }, []);
};
