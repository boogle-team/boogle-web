import { useCallback, useEffect, useRef, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;

export const usePwaUpdatePrompt = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  // onRegisteredSW는 useEffect 밖에서 실행되므로 정리 함수를 ref에 보관한다.
  const cleanupUpdateCheckRef = useRef<(() => void) | null>(null);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (_serviceWorkerUrl, registration) => {
      if (!registration) {
        return;
      }

      const checkForUpdate = () => {
        if (document.visibilityState !== 'visible') {
          return;
        }

        // 포그라운드로 돌아오면 숨김 상태를 해제해 대기 중인 업데이트를 다시 알린다.
        setIsDismissed(false);
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

  const handleUpdateApply = useCallback(() => {
    void updateServiceWorker(true);
  }, [updateServiceWorker]);

  // needRefresh를 직접 false로 만들면 대기 중인 서비스 워커 정보를 잃는다.
  // 숨김 상태만 따로 관리해 다음 포그라운드 진입 시 다시 노출한다.
  const handleUpdateDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  return {
    needRefresh: needRefresh && !isDismissed,
    handleUpdateApply,
    handleUpdateDismiss,
  };
};
