import { useMutation } from '@tanstack/react-query';

import { cleanupSynchronizedPushToken } from '@/shared/apis/pushTokenSynchronization';

export const usePushTokenCleanup = () => {
  const {
    mutateAsync: cleanupPushToken,
    isPending: isPushTokenDeletionPending,
  } = useMutation({
    mutationFn: cleanupSynchronizedPushToken,
  });

  return {
    cleanupPushToken,
    isPushTokenDeletionPending,
  };
};
