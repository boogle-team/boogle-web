import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/shared/components/Button';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import { saveAuthTokens } from '@/shared/utils/authTokenStorage';
import useOAuthExchangeMutation from '@/pages/login/hooks/useOAuthExchangeMutation';
import type {
  OAuthExchangeRequestTypes,
  OAuthExchangeResponseTypes,
} from '@/pages/login/types/loginTypes';

const OAUTH_CALLBACK_ERROR_MESSAGE = '로그인을 완료하지 못했습니다.';
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

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [callbackErrorMessage, setCallbackErrorMessage] = useState<
    string | null
  >(null);
  const [isExchangePending, setIsExchangePending] = useState(false);
  const { mutateAsync } = useOAuthExchangeMutation();

  const oauthResultCode = searchParams.get('oauthResultCode');
  const oauthError = searchParams.get('error');
  const oauthErrorDescription = searchParams.get('errorDescription');
  const isInvalidCallback = Boolean(oauthError || !oauthResultCode);

  const handleLoginButtonClick = () => {
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    let isMounted = true;

    void Promise.resolve().then(async () => {
      if (isInvalidCallback || !oauthResultCode) {
        return;
      }

      setIsExchangePending(true);
      setCallbackErrorMessage(null);

      try {
        const { data } = await getOAuthExchangePromise(
          { oauthResultCode },
          mutateAsync,
        );

        if (!isMounted) {
          return;
        }

        saveAuthTokens(data);

        if (
          data.nextAction === 'ONBOARDING_REQUIRED' ||
          !data.onboardingCompleted
        ) {
          navigate('/onboarding/profile', { replace: true });
          return;
        }

        navigate('/home', { replace: true });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCallbackErrorMessage(
          getApiErrorMessage(error, OAUTH_CALLBACK_ERROR_MESSAGE),
        );
      } finally {
        if (isMounted) {
          setIsExchangePending(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isInvalidCallback, mutateAsync, navigate, oauthResultCode]);

  const errorMessage =
    oauthErrorDescription ||
    oauthError ||
    callbackErrorMessage ||
    OAUTH_CALLBACK_ERROR_MESSAGE;

  if (!isInvalidCallback && !callbackErrorMessage) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-beige-5 px-layout text-center">
        <p className="body-lg text-gray-10">
          {isExchangePending
            ? '로그인 처리 중입니다.'
            : '로그인 정보를 확인하고 있습니다.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-beige-5 px-layout">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="title-md text-gray-10">로그인에 실패했습니다.</h1>
          <p className="body-m text-gray-7">{errorMessage}</p>
        </div>
        <Button text="로그인으로 돌아가기" onClick={handleLoginButtonClick} />
      </div>
    </div>
  );
};

export default OAuthCallback;
