import BoogleLogo from '@/shared/assets/illustrations/boogleLogo.svg?react';

import SocialLoginButton from './components/SocialLoginButton';

// 소셜 로그인 페이지: 로고 + 카카오/구글 로그인 버튼
interface SocialLoginPropTypes {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
}

const SocialLogin = ({ onKakaoLogin, onGoogleLogin }: SocialLoginPropTypes) => {
  return (
    <div className="flex min-h-dvh flex-col bg-beige-5 px-layout pb-18">
      <div className="flex flex-1 flex-col items-center justify-center">
        <BoogleLogo className="w-[13.75rem] h-[6.25rem] text-orange-5" />
        <p className="body-lg mt-4 text-gray-8">내 장 건강을 위한 작은 습관</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <SocialLoginButton provider="kakao" onClick={onKakaoLogin} />
        <SocialLoginButton provider="google" onClick={onGoogleLogin} />
      </div>
    </div>
  );
};

export default SocialLogin;
