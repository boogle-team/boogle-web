import { useNavigate } from 'react-router-dom';

import GoogleIcon from '@/shared/assets/icons/googleLogo.svg?react';
import KakaoIcon from '@/shared/assets/icons/kakaoLogo.svg?react';
import Button from '@/shared/components/Button';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import { useUserQuery } from '@/pages/settings/hooks/useSettingsQueries';

import type { ProviderTypes } from '@/pages/settings/types/settingsTypes';

interface ProviderIconPropTypes {
  provider: ProviderTypes;
}

const formatRegDate = (regDate: string) =>
  regDate.split('T')[0].replaceAll('-', '.');

const ProviderIcon = ({ provider }: ProviderIconPropTypes) => {
  if (provider === 'KAKAO') {
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

  return (
    <span
      role="img"
      aria-label="구글"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-4 bg-white"
    >
      <GoogleIcon aria-hidden="true" className="h-3 w-3" />
    </span>
  );
};

const LoginAccount = () => {
  const navigate = useNavigate();
  const { data: member, isLoading, isError, refetch } = useUserQuery();
  const socialAccount = member?.socialAccounts[0];
  const formattedRegDate = member ? formatRegDate(member.regDate) : '';

  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2"
        title="로그인 계정"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1 px-4 pb-6">
        {isLoading && (
          <p className="body-m py-12 text-center text-gray-7">
            계정 정보를 불러오고 있어요.
          </p>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <p className="body-m text-gray-7">계정 정보를 불러오지 못했어요.</p>
            <Button
              className="max-w-40"
              text="다시 시도"
              size="sm"
              onClick={() => void refetch()}
            />
          </div>
        )}

        {member && socialAccount && (
          <>
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
                <span className="caption text-gray-8">{formattedRegDate}</span>
              </div>
            </section>
          </>
        )}

        {member && !socialAccount && (
          <p className="body-m py-12 text-center text-gray-7">
            연결된 소셜 계정이 없어요.
          </p>
        )}
      </main>
    </div>
  );
};

export default LoginAccount;
