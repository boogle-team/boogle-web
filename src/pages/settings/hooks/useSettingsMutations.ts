import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteProfileImage,
  deleteUser,
  patchSensitiveInfoConsent,
  patchUser,
  putProfileImage,
} from '@/pages/settings/apis/settingsApis';
import {
  SETTINGS_ONBOARDING_QUERY_KEY,
  SETTINGS_SENSITIVE_CONSENT_QUERY_KEY,
  SETTINGS_USER_QUERY_KEY,
} from '@/pages/settings/hooks/useSettingsQueries';

const useInvalidateUserSettings = () => {
  const queryClient = useQueryClient();

  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: SETTINGS_USER_QUERY_KEY }),
      queryClient.invalidateQueries({
        queryKey: SETTINGS_ONBOARDING_QUERY_KEY,
      }),
    ]);
};

export const usePatchUserMutation = () => {
  const invalidateUserSettings = useInvalidateUserSettings();

  return useMutation({
    mutationFn: patchUser,
    onSuccess: invalidateUserSettings,
  });
};

export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: deleteUser,
  });

export const usePatchSensitiveInfoConsentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchSensitiveInfoConsent,
    onSuccess: (sensitiveInfoConsent) => {
      queryClient.setQueryData(
        SETTINGS_SENSITIVE_CONSENT_QUERY_KEY,
        sensitiveInfoConsent,
      );
      void queryClient.invalidateQueries({ queryKey: SETTINGS_USER_QUERY_KEY });
    },
  });
};

export const usePutProfileImageMutation = () => {
  const invalidateUserSettings = useInvalidateUserSettings();

  return useMutation({
    mutationFn: putProfileImage,
    onSuccess: invalidateUserSettings,
  });
};

export const useDeleteProfileImageMutation = () => {
  const invalidateUserSettings = useInvalidateUserSettings();

  return useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: invalidateUserSettings,
  });
};
