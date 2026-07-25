import { useNavigate } from 'react-router-dom';

import SocialLogin from '@/pages/login/SocialLogin';

const Login = () => {
  const navigate = useNavigate();

  const handleSocialLogin = () => {
    // TODO: 실제 소셜 로그인 연동 성공 후 온보딩 프로필 입력으로 이동.
    navigate('/onboarding/profile');
  };

  return (
    <SocialLogin
      onKakaoLogin={handleSocialLogin}
      onGoogleLogin={handleSocialLogin}
    />
  );
};

export default Login;
