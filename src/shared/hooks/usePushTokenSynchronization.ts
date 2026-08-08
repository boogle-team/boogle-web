import { useEffect } from 'react';

import { synchronizePushToken } from '@/shared/apis/pushTokenSynchronization';

export const usePushTokenSynchronization = () => {
  useEffect(() => {
    void synchronizePushToken();
  }, []);
};
