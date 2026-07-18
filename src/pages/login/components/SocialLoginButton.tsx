import type { ButtonHTMLAttributes } from 'react';

import GoogleLogo from '@/shared/assets/icons/googleLogo.svg';
import KakaoLogo from '@/shared/assets/icons/kakaoLogo.svg';

const SOCIAL_LOGIN_BUTTON_CONFIGS = {
  kakao: {
    logo: KakaoLogo,
    label: '카카오로 로그인',
    className: 'bg-[#FEE500]',
  },
  google: {
    logo: GoogleLogo,
    label: 'Google로 로그인',
    className: 'h-14 bg-gray-1',
  },
} as const;

type SocialLoginProviderTypes = keyof typeof SOCIAL_LOGIN_BUTTON_CONFIGS;

interface SocialLoginButtonPropTypes
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialLoginProviderTypes;
}

const SocialLoginButton = ({
  provider,
  className = '',
  type = 'button',
  ...props
}: SocialLoginButtonPropTypes) => {
  const socialLoginButtonConfig = SOCIAL_LOGIN_BUTTON_CONFIGS[provider];

  const buttonClassName = [
    'body-m flex w-full items-center justify-between gap-4 rounded-xl px-16 py-4 min-[390px]:pr-[7.4375rem] min-[390px]:pl-[7.5rem] text-gray-10 transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
    socialLoginButtonConfig.className,
    className,
  ].join(' ');

  return (
    <button className={buttonClassName} type={type} {...props}>
      <img
        src={socialLoginButtonConfig.logo}
        alt=""
        className="h-[1.125rem] w-[1.125rem] shrink-0"
      />
      <span className="shrink-0 whitespace-nowrap">
        {socialLoginButtonConfig.label}
      </span>
    </button>
  );
};

export default SocialLoginButton;