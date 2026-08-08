import { isAxiosError } from 'axios';
import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getApiErrorCode, getApiErrorMessage } from '@/shared/apis/apiError';
import {
  resumePushTokenSynchronization,
  synchronizePushToken,
} from '@/shared/apis/pushTokenSynchronization';
import type { ApiErrorResponseTypes } from '@/shared/types/apiTypes';
import { saveAuthTokens } from '@/shared/utils/authTokenStorage';
import {
  LOGIN_ACCOUNT_LINK_CANCEL_MESSAGE,
  LOGIN_ACCOUNT_LINK_EXPIRED_MESSAGE,
  LOGIN_ACCOUNT_LINK_RETRY_MESSAGE,
  OAUTH_CALLBACK_ERROR_MESSAGE,
} from '@/pages/login/constants/loginConstants';
import type {
  LoginNavigationStateTypes,
  OAuthAccountLinkRequiredDataTypes,
  OAuthCallbackStatusTypes,
  OAuthExchangeDataTypes,
  OAuthExchangeRequestTypes,
  OAuthExchangeResponseTypes,
} from '@/pages/login/types/loginTypes';

import useOAuthAccountLinkMutation from './useOAuthAccountLinkMutation';
import useOAuthExchangeMutation from './useOAuthExchangeMutation';

interface OAuthCallbackStateTypes {
  status: OAuthCallbackStatusTypes;
  accountLinkData: OAuthAccountLinkRequiredDataTypes | null;
  errorMessage: string | null;
}

type OAuthCallbackActionTypes =
  | {
      type: 'SHOW_LINK_CONFIRMATION';
      payload: OAuthAccountLinkRequiredDataTypes;
    }
  | { type: 'START_LINKING' }
  | { type: 'SHOW_LINK_ERROR'; payload: string }
  | { type: 'SHOW_ERROR'; payload: string };

const INITIAL_OAUTH_CALLBACK_STATE: OAuthCallbackStateTypes = {
  status: 'PROCESSING',
  accountLinkData: null,
  errorMessage: null,
};

const oauthExchangePromiseMap = new Map<
  string,
  Promise<OAuthExchangeResponseTypes>
>();

const getOAuthExchangePromise = (
  requestBody: OAuthExchangeRequestTypes,
  mutateAsync: (
    requestBody: OAuthExchangeRequestTypes,
  ) => Promise<OAuthExchangeResponseTypes>,
) => {
  const cachedPromise = oauthExchangePromiseMap.get(
    requestBody.oauthResultCode,
  );

  if (cachedPromise) {
    return cachedPromise;
  }

  const exchangePromise = mutateAsync(requestBody);

  oauthExchangePromiseMap.set(requestBody.oauthResultCode, exchangePromise);

  return exchangePromise;
};

const oauthCallbackReducer = (
  state: OAuthCallbackStateTypes,
  action: OAuthCallbackActionTypes,
): OAuthCallbackStateTypes => {
  switch (action.type) {
    case 'SHOW_LINK_CONFIRMATION':
      return {
        status: 'LINK_CONFIRMATION',
        accountLinkData: action.payload,
        errorMessage: null,
      };
    case 'START_LINKING':
      return {
        ...state,
        status: 'LINKING',
        errorMessage: null,
      };
    case 'SHOW_LINK_ERROR':
      return {
        ...state,
        status: 'LINK_CONFIRMATION',
        errorMessage: action.payload,
      };
    case 'SHOW_ERROR':
      return {
        status: 'ERROR',
        accountLinkData: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

const getAccountLinkRequiredData = (error: unknown) => {
  if (
    !isAxiosError<ApiErrorResponseTypes<OAuthAccountLinkRequiredDataTypes>>(
      error,
    )
  ) {
    return null;
  }

  const { status, data } = error.response ?? {};

  if (status !== 409 || data?.code !== 'SOCIAL_ACCOUNT_LINK_REQUIRED') {
    return null;
  }

  return data.data ?? null;
};

const getLoginNavigationState = (toastMessage: string) =>
  ({ toastMessage }) satisfies LoginNavigationStateTypes;

const getOAuthSuccessRedirectPath = ({
  nextAction,
  onboardingCompleted,
}: OAuthExchangeDataTypes) => {
  if (nextAction === 'ONBOARDING_REQUIRED' || !onboardingCompleted) {
    return '/onboarding/profile';
  }

  return '/home';
};

export const useOAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(
    oauthCallbackReducer,
    INITIAL_OAUTH_CALLBACK_STATE,
  );
  const { mutateAsync: exchangeOAuth } = useOAuthExchangeMutation();
  const { mutate: linkOAuthAccount, isPending: isLinkMutationPending } =
    useOAuthAccountLinkMutation();

  const oauthResultCode = searchParams.get('oauthResultCode');
  const oauthError = searchParams.get('error');
  const oauthErrorDescription = searchParams.get('errorDescription');
  const isInvalidCallback = Boolean(oauthError || !oauthResultCode);

  const handleOAuthLoginSuccess = useCallback(
    ({ data }: OAuthExchangeResponseTypes) => {
      saveAuthTokens(data);
      resumePushTokenSynchronization();
      void synchronizePushToken();
      navigate(getOAuthSuccessRedirectPath(data), { replace: true });
    },
    [navigate],
  );

  const navigateToLoginWithToast = useCallback(
    (toastMessage: string) => {
      navigate('/login', {
        replace: true,
        state: getLoginNavigationState(toastMessage),
      });
    },
    [navigate],
  );

  useEffect(() => {
    let isMounted = true;

    void Promise.resolve().then(async () => {
      if (isInvalidCallback || !oauthResultCode) {
        dispatch({
          type: 'SHOW_ERROR',
          payload:
            oauthErrorDescription || oauthError || OAUTH_CALLBACK_ERROR_MESSAGE,
        });
        return;
      }

      try {
        const response = await getOAuthExchangePromise(
          { oauthResultCode },
          exchangeOAuth,
        );

        if (!isMounted) return;

        handleOAuthLoginSuccess(response);
      } catch (error) {
        if (!isMounted) return;

        const accountLinkData = getAccountLinkRequiredData(error);

        if (accountLinkData) {
          dispatch({
            type: 'SHOW_LINK_CONFIRMATION',
            payload: accountLinkData,
          });
          return;
        }

        dispatch({
          type: 'SHOW_ERROR',
          payload: getApiErrorMessage(error, OAUTH_CALLBACK_ERROR_MESSAGE),
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [
    exchangeOAuth,
    handleOAuthLoginSuccess,
    isInvalidCallback,
    oauthError,
    oauthErrorDescription,
    oauthResultCode,
  ]);

  const handleAccountLinkCancel = useCallback(() => {
    navigateToLoginWithToast(LOGIN_ACCOUNT_LINK_CANCEL_MESSAGE);
  }, [navigateToLoginWithToast]);

  const handleAccountLinkConfirm = useCallback(() => {
    if (!state.accountLinkData || state.status === 'LINKING') return;

    dispatch({ type: 'START_LINKING' });

    linkOAuthAccount(
      { accountLinkToken: state.accountLinkData.accountLinkToken },
      {
        onSuccess: handleOAuthLoginSuccess,
        onError: (error) => {
          const errorCode = getApiErrorCode(error);

          if (errorCode === 'AUTH_ACCOUNT_LINK_TOKEN_EXPIRED') {
            navigateToLoginWithToast(LOGIN_ACCOUNT_LINK_EXPIRED_MESSAGE);
            return;
          }

          if (errorCode === 'AUTH_WITHDRAWN_USER') {
            dispatch({
              type: 'SHOW_ERROR',
              payload: getApiErrorMessage(error, OAUTH_CALLBACK_ERROR_MESSAGE),
            });
            return;
          }

          dispatch({
            type: 'SHOW_LINK_ERROR',
            payload: getApiErrorMessage(
              error,
              LOGIN_ACCOUNT_LINK_RETRY_MESSAGE,
            ),
          });
        },
      },
    );
  }, [
    handleOAuthLoginSuccess,
    linkOAuthAccount,
    navigateToLoginWithToast,
    state.accountLinkData,
    state.status,
  ]);

  const handleLoginButtonClick = useCallback(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return {
    status: state.status,
    accountLinkData: state.accountLinkData,
    errorMessage: state.errorMessage,
    isLinking: state.status === 'LINKING' || isLinkMutationPending,
    handleAccountLinkCancel,
    handleAccountLinkConfirm,
    handleLoginButtonClick,
  };
};
