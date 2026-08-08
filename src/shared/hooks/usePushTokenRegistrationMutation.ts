import { useMutation } from '@tanstack/react-query';

import { registerSynchronizedPushToken } from '@/shared/apis/pushTokenSynchronization';

export const usePushTokenRegistrationMutation = () => {
  const {
    mutateAsync: registerPushToken,
    isPending: isPushTokenRegistrationPending,
  } = useMutation({
    mutationFn: registerSynchronizedPushToken,
  });

  return {
    registerPushToken,
    isPushTokenRegistrationPending,
  };
};
