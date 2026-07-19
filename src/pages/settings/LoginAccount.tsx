import { useNavigate } from 'react-router-dom';

import GoogleIcon from '@/shared/assets/icons/GoogleIcon.svg?react';
import KakaoIcon from '@/shared/assets/icons/KakaoIcon.svg?react';
import NaverIcon from '@/shared/assets/icons/NaverIcon.svg?react';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type { ProviderTypes, SocialAccountTypes } from './types/settingsTypes';

interface ProviderIconPropTypes {
  provider: ProviderTypes;
}

const MOCK_SOCIAL_ACCOUNT: SocialAccountTypes = {
  provider: 'K',
  maskedEmail: 'boogle****@kakao.com',
  regDate: '2026.06.13',
};

const ProviderIcon = ({ provider }: ProviderIconPropTypes) => {
  if (provider === 'K') {
    return (
      <span
        role="img"
        aria-label="카카오"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FEE500]"
      >
        <KakaoIcon aria-hidden="true" className="h-3 w-3 text-[#3A2929]" />
      </span>
    );
  }

  if (provider === 'N') {
    return (
      <span
        role="img"
        aria-label="네이버"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#03C75A]"
      >
        <NaverIcon aria-hidden="true" className="h-3 w-3 text-white" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label="구글"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-4 bg-white"
    >
      <GoogleIcon aria-hidden="true" className="h-3 w-3 text-[#4285F4]" />
    </span>
  );
};

const LoginAccount = () => {
  const navigate = useNavigate();
  const socialAccount = MOCK_SOCIAL_ACCOUNT;

  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="로그인 계정"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1 px-4 pb-6">
        <section className="mt-6">
          <h2 className="body-m mb-2 px-2 text-gray-8">연동된 계정</h2>

          <div className="flex min-h-12 items-center justify-between rounded-xl border border-gray-4 bg-beige-1 px-4 py-3">
            <span className="label text-gray-10">계정</span>

            <div className="flex min-w-0 items-center gap-2">
              <ProviderIcon provider={socialAccount.provider} />
              <span className="caption truncate text-gray-8">
                {socialAccount.maskedEmail}
              </span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="body-m mb-2 px-2 text-gray-8">계정 정보</h2>

          <div className="flex min-h-12 items-center justify-between rounded-xl border border-gray-4 bg-beige-1 px-4 py-3">
            <span className="label text-gray-10">가입일</span>
            <span className="caption text-gray-8">{socialAccount.regDate}</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginAccount;
