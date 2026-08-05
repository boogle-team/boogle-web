import { useMutation } from '@tanstack/react-query';

import { postPushToken } from '@/shared/apis/pushTokenApi';

export const usePushTokenRegistrationMutation = () => {
  const {
    mutateAsync: registerPushToken,
    isPending: isPushTokenRegistrationPending,
  } = useMutation({
    mutationFn: postPushToken,
  });

  return {
    registerPushToken,
    isPushTokenRegistrationPending,
  };
};
