import { useMutation } from '@tanstack/react-query';

import { postUserOnboarding } from '@/shared/apis/postUserOnboarding';

const useSaveOnboardingMutation = () =>
  useMutation({
    mutationFn: postUserOnboarding,
  });

export default useSaveOnboardingMutation;
