import { api } from '@/shared/apis/axiosInstance';
import type { UserOnboardingResponseTypes } from '@/shared/types/userTypes';

export const getUserOnboarding = async () => {
  const { data } = await api.get<UserOnboardingResponseTypes>(
    '/api/v1/users/me/onboarding',
  );

  return data;
};