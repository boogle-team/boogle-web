import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Onboarding from './Onboarding';
import ProfileInputPage from './ProfileInputPage';
import SocialLogin from './SocialLogin';
import Splash from './Splash';
import type {
  LoginPhaseTypes,
  ProfileInputValueTypes,
} from './types/loginTypes';

// 로그인/온보딩 전체 플로우를 phase 상태로 전환한다.
// splash → onboarding → social → profile → (완료 시) 홈으로 이동
const Login = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<LoginPhaseTypes>('splash');

  const handleSocialLogin = () => {
    // TODO: 실제 소셜 로그인(카카오/구글) 연동. 성공 시 프로필 입력으로 이동.
    setPhase('profile');
  };

  const handleProfileBackToSocial = () => {
    setPhase('social');
  };

  const handleProfileComplete = (value: ProfileInputValueTypes) => {
    // TODO: 수집된 프로필 데이터 서버 저장
    void value;
    navigate('/');
  };

  if (phase === 'splash' || phase === 'onboarding') {
    return (
      <div className="relative min-h-dvh overflow-hidden">
        <Onboarding onStart={() => setPhase('social')} />
        {phase === 'splash' && (
          <Splash onFinish={() => setPhase('onboarding')} />
        )}
      </div>
    );
  }

  if (phase === 'social') {
    return (
      <SocialLogin
        onKakaoLogin={handleSocialLogin}
        onGoogleLogin={handleSocialLogin}
      />
    );
  }

  return (
    <ProfileInputPage
      onComplete={handleProfileComplete}
      onBackToSocial={handleProfileBackToSocial}
    />
  );
};

export default Login;
