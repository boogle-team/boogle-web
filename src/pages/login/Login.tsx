import { getOAuthLoginUrl } from '@/pages/login/apis/loginApis';
import SocialLogin from '@/pages/login/SocialLogin';
import type { SocialLoginProviderTypes } from '@/pages/login/types/loginTypes';

const Login = () => {
  const handleSocialLoginClick = (provider: SocialLoginProviderTypes) => {
    window.location.assign(getOAuthLoginUrl(provider));
  };

  return (
    <SocialLogin
      onKakaoLogin={() => handleSocialLoginClick('kakao')}
      onGoogleLogin={() => handleSocialLoginClick('google')}
    />
  );
};

export default Login;
