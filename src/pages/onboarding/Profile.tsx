import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileInputPage from '@/pages/login/ProfileInputPage';
import useSaveOnboardingMutation from '@/pages/login/hooks/useSaveOnboardingMutation';
import { mapProfileInputToOnboardingRequest } from '@/pages/login/utils/onboardingRequestMapper';
import { getApiErrorMessage } from '@/shared/apis/apiError';

import type { ProfileInputValueTypes } from '@/pages/login/types/loginTypes';

const ONBOARDING_SAVE_ERROR_MESSAGE =
  '온보딩 정보를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';

const Profile = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending } = useSaveOnboardingMutation();

  const handleProfileBackToLogin = () => {
    navigate('/login');
  };

  const handleProfileComplete = (value: ProfileInputValueTypes) => {
    if (isPending) {
      return;
    }

    setErrorMessage(null);

    try {
      const onboardingRequest = mapProfileInputToOnboardingRequest(value);

      mutate(onboardingRequest, {
        onSuccess: () => {
          navigate('/home', { replace: true });
        },
        onError: (error) => {
          setErrorMessage(
            getApiErrorMessage(error, ONBOARDING_SAVE_ERROR_MESSAGE),
          );
        },
      });
    } catch {
      setErrorMessage(ONBOARDING_SAVE_ERROR_MESSAGE);
    }
  };

  return (
    <ProfileInputPage
      onComplete={handleProfileComplete}
      onBackToSocial={handleProfileBackToLogin}
      isSubmitting={isPending}
      errorMessage={errorMessage}
    />
  );
};

export default Profile;
