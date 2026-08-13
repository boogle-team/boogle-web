import { useQuery } from '@tanstack/react-query';

import {
  getSensitiveInfoConsent,
  getUser,
} from '@/pages/settings/apis/settingsApis';
import { getUserOnboarding } from '@/shared/apis/getUserOnboarding';

export const SETTINGS_USER_QUERY_KEY = ['settings', 'user'] as const;
export const SETTINGS_ONBOARDING_QUERY_KEY = [
  'settings',
  'onboarding',
] as const;
export const SETTINGS_SENSITIVE_CONSENT_QUERY_KEY = [
  'settings',
  'sensitiveInfoConsent',
] as const;

export const useUserQuery = (isEnabled = true) =>
  useQuery({
    queryKey: SETTINGS_USER_QUERY_KEY,
    queryFn: getUser,
    enabled: isEnabled,
  });

export const useUserOnboardingSettingsQuery = () =>
  useQuery({
    queryKey: SETTINGS_ONBOARDING_QUERY_KEY,
    queryFn: async () => {
      const response = await getUserOnboarding();

      return response.data;
    },
  });

export const useSensitiveInfoConsentQuery = () =>
  useQuery({
    queryKey: SETTINGS_SENSITIVE_CONSENT_QUERY_KEY,
    queryFn: getSensitiveInfoConsent,
  });
