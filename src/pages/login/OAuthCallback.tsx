import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/shared/components/Button';
import useOAuthExchangeMutation from '@/pages/login/hooks/useOAuthExchangeMutation';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasExchangedRef = useRef(false);
  const { mutate, isPending, isError, error } = useOAuthExchangeMutation();

  const oauthResultCode = searchParams.get('oauthResultCode');
  const oauthError = searchParams.get('error');
  const oauthErrorDescription = searchParams.get('errorDescription');
  const isInvalidCallback = Boolean(oauthError || !oauthResultCode);

  const handleLoginButtonClick = () => {
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (hasExchangedRef.current || isInvalidCallback || !oauthResultCode) {
      return;
    }

    hasExchangedRef.current = true;

    mutate(
      { oauthResultCode },
      {
        onSuccess: ({ data }) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          if (
            data.nextAction === 'ONBOARDING_REQUIRED' ||
            !data.onboardingCompleted
          ) {
            navigate('/onboarding/profile', { replace: true });
            return;
          }

          navigate('/', { replace: true });
        },
      },
    );
  }, [isInvalidCallback, mutate, navigate, oauthResultCode]);

  const errorMessage =
    oauthErrorDescription ||
    oauthError ||
    (error instanceof Error ? error.message : null) ||
    '\uB85C\uADF8\uC778\uC744 \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.';

  if (!isInvalidCallback && !isError) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-beige-5 px-layout text-center">
        <p className="body-lg text-gray-10">
          {isPending
            ? '\uB85C\uADF8\uC778 \uCC98\uB9AC \uC911\uC785\uB2C8\uB2E4.'
            : '\uB85C\uADF8\uC778 \uC815\uBCF4\uB97C \uD655\uC778\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-beige-5 px-layout">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="title-md text-gray-10">
            {'\uB85C\uADF8\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.'}
          </h1>
          <p className="body-m text-gray-7">{errorMessage}</p>
        </div>
        <Button
          text={'\uB85C\uADF8\uC778\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30'}
          onClick={handleLoginButtonClick}
        />
      </div>
    </div>
  );
};

export default OAuthCallback;
