import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getOAuthLoginUrl } from '@/pages/login/apis/loginApis';
import LoginToast from '@/pages/login/components/LoginToast';
import SocialLogin from '@/pages/login/SocialLogin';
import type {
  LoginNavigationStateTypes,
  SocialLoginProviderTypes,
} from '@/pages/login/types/loginTypes';

const LOGIN_TOAST_DURATION = 2500;

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationState = location.state as LoginNavigationStateTypes | null;
  const [toastMessage, setToastMessage] = useState<string | null>(
    () => navigationState?.toastMessage ?? null,
  );

  useEffect(() => {
    if (!navigationState?.toastMessage) return;

    navigate('/login', { replace: true, state: null });
  }, [navigationState?.toastMessage, navigate]);

  useEffect(() => {
    if (!toastMessage) return;

    const toastTimerId = window.setTimeout(() => {
      setToastMessage(null);
    }, LOGIN_TOAST_DURATION);

    return () => window.clearTimeout(toastTimerId);
  }, [toastMessage]);

  const handleSocialLoginClick = (provider: SocialLoginProviderTypes) => {
    window.location.assign(getOAuthLoginUrl(provider));
  };

  return (
    <>
      <SocialLogin
        onKakaoLogin={() => handleSocialLoginClick('kakao')}
        onGoogleLogin={() => handleSocialLoginClick('google')}
      />
      <LoginToast message={toastMessage} />
    </>
  );
};

export default Login;
