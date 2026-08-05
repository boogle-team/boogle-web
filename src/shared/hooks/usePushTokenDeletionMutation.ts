import { useMutation } from '@tanstack/react-query';

import { deletePushToken } from '@/shared/apis/pushTokenApi';

export const usePushTokenDeletionMutation = () => {
  const {
    mutateAsync: unregisterPushToken,
    isPending: isPushTokenDeletionPending,
  } = useMutation({
    mutationFn: deletePushToken,
  });

  return {
    unregisterPushToken,
    isPushTokenDeletionPending,
  };
};
