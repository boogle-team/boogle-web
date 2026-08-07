import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  loadHomeRoute,
  loadMainLayoutRoute,
  loadOnboardingProfileRoute,
  loadOnboardingRoute,
} from '@/routes/lazyRouteLoaders';
import useAuthVerification from '@/shared/hooks/useAuthVerification';

import type { AuthVerificationStatusTypes } from '@/shared/hooks/useAuthVerification';

type DestinationPreparationStatusTypes = 'pending' | 'ready' | 'error';

interface AppEntryStateTypes {
  isSplashFinished: boolean;
  destinationPreparationStatus: DestinationPreparationStatusTypes;
  destinationPreparationAttempt: number;
}

type AppEntryActionTypes =
  | { type: 'FINISH_SPLASH' }
  | { type: 'START_DESTINATION_PREPARATION' }
  | { type: 'COMPLETE_DESTINATION_PREPARATION' }
  | { type: 'FAIL_DESTINATION_PREPARATION' }
  | { type: 'RETRY_DESTINATION_PREPARATION' };

const INITIAL_APP_ENTRY_STATE: AppEntryStateTypes = {
  isSplashFinished: false,
  destinationPreparationStatus: 'pending',
  destinationPreparationAttempt: 0,
};

const appEntryReducer = (
  state: AppEntryStateTypes,
  action: AppEntryActionTypes,
): AppEntryStateTypes => {
  switch (action.type) {
    case 'FINISH_SPLASH':
      return { ...state, isSplashFinished: true };
    case 'START_DESTINATION_PREPARATION':
      return { ...state, destinationPreparationStatus: 'pending' };
    case 'COMPLETE_DESTINATION_PREPARATION':
      return { ...state, destinationPreparationStatus: 'ready' };
    case 'FAIL_DESTINATION_PREPARATION':
      return { ...state, destinationPreparationStatus: 'error' };
    case 'RETRY_DESTINATION_PREPARATION':
      return {
        ...state,
        destinationPreparationStatus: 'pending',
        destinationPreparationAttempt: state.destinationPreparationAttempt + 1,
      };
  }
};

const prepareDestinationRoute = async (
  authVerificationStatus: AuthVerificationStatusTypes,
) => {
  switch (authVerificationStatus) {
    case 'authenticated':
      await Promise.all([loadMainLayoutRoute(), loadHomeRoute()]);
      return;
    case 'onboardingRequired':
      await loadOnboardingProfileRoute();
      return;
    case 'unauthenticated':
      await loadOnboardingRoute();
      return;
    default:
      return;
  }
};

const getDestinationPath = (
  authVerificationStatus: AuthVerificationStatusTypes,
) => {
  switch (authVerificationStatus) {
    case 'authenticated':
      return '/home';
    case 'onboardingRequired':
      return '/onboarding/profile';
    case 'unauthenticated':
      return '/onboarding';
    default:
      return null;
  }
};

const useAppEntry = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    appEntryReducer,
    INITIAL_APP_ENTRY_STATE,
  );
  const { authVerificationStatus, verifyAuthStatus } = useAuthVerification({
    shouldRefreshOnStart: true,
  });

  useEffect(() => {
    let isEffectActive = true;

    if (authVerificationStatus === 'checking') {
      return () => {
        isEffectActive = false;
      };
    }

    const prepareRoute = async () => {
      try {
        await prepareDestinationRoute(authVerificationStatus);

        if (isEffectActive) {
          dispatch({ type: 'COMPLETE_DESTINATION_PREPARATION' });
        }
      } catch {
        if (isEffectActive) {
          dispatch({ type: 'FAIL_DESTINATION_PREPARATION' });
        }
      }
    };

    void prepareRoute();

    return () => {
      isEffectActive = false;
    };
  }, [authVerificationStatus, state.destinationPreparationAttempt]);

  useEffect(() => {
    if (
      !state.isSplashFinished ||
      state.destinationPreparationStatus !== 'ready'
    ) {
      return;
    }

    const destinationPath = getDestinationPath(authVerificationStatus);

    if (destinationPath) {
      navigate(destinationPath, { replace: true });
    }
  }, [
    authVerificationStatus,
    navigate,
    state.destinationPreparationStatus,
    state.isSplashFinished,
  ]);

  const handleSplashFinish = useCallback(() => {
    dispatch({ type: 'FINISH_SPLASH' });
  }, []);

  const handleRetryButtonClick = () => {
    if (state.destinationPreparationStatus === 'error') {
      dispatch({ type: 'RETRY_DESTINATION_PREPARATION' });
      return;
    }

    dispatch({ type: 'START_DESTINATION_PREPARATION' });
    void verifyAuthStatus();
  };

  return {
    isSplashFinished: state.isSplashFinished,
    shouldFinishSplash:
      authVerificationStatus !== 'checking' &&
      state.destinationPreparationStatus !== 'pending',
    hasRecoverableError:
      authVerificationStatus === 'recoverableError' ||
      state.destinationPreparationStatus === 'error',
    handleSplashFinish,
    handleRetryButtonClick,
  };
};

export default useAppEntry;
