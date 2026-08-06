// 프로필 입력 스텝 번호
export type ProfileStepTypes = 1 | 2 | 3;

// 기본 설정(배변 리듬) 선택지 값
export type BowelRhythmValueTypes =
  'regular' | 'constipation' | 'loose' | 'unknown';

export type AgeGroupValueTypes =
  'teens' | 'twenties' | 'thirties' | 'fortiesAndOlder';

export type GenderValueTypes = 'female' | 'male' | 'none';

export type SocialLoginProviderTypes = 'kakao' | 'google';

export type OAuthNextActionTypes = 'HOME' | 'ONBOARDING_REQUIRED';

export type OAuthCallbackStatusTypes =
  'PROCESSING' | 'LINK_CONFIRMATION' | 'LINKING' | 'ERROR';

export interface AuthTokenDataTypes {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface OAuthUserTypes {
  id: number;
  email: string;
  nickname: string | null;
  profileImage: string | null;
  profileImageSource: string | null;
  gender: string | null;
  ageGroup: number | null;
  baselineType: string | null;
  sensitiveInfoAgreed: boolean;
}

export interface OAuthExchangeRequestTypes {
  oauthResultCode: string;
}

export interface OAuthAccountLinkRequestTypes {
  accountLinkToken: string;
}

export interface OAuthAccountLinkRequiredDataTypes {
  accountLinkToken: string;
  existingProvider: SocialLoginProviderTypes;
  requestedProvider: SocialLoginProviderTypes;
  maskedEmail: string;
  expiresAt: string;
}

export interface AuthRefreshRequestTypes {
  refreshToken: string;
}

export interface AuthLogoutRequestTypes {
  accessToken: string;
  refreshToken: string;
}

export interface OAuthExchangeDataTypes extends AuthTokenDataTypes {
  isNewUser: boolean;
  user: OAuthUserTypes;
  nextAction: OAuthNextActionTypes;
  onboardingCompleted: boolean;
}

export interface OAuthExchangeResponseTypes {
  success: boolean;
  data: OAuthExchangeDataTypes;
  message: string;
}

export type OAuthAccountLinkResponseTypes = OAuthExchangeResponseTypes;

export interface AuthRefreshResponseTypes {
  success: boolean;
  data: AuthTokenDataTypes;
  message: string;
}

export interface LoginNavigationStateTypes {
  toastMessage?: string;
}

// 프로필 입력 최종 수집 데이터
export interface ProfileInputValueTypes {
  nickname: string;
  profileImageFile: File | null;
  bowelRhythm: BowelRhythmValueTypes | null;
  ageGroup: AgeGroupValueTypes | null;
  gender: GenderValueTypes | null;
  shouldTrackMenstrualCycle: boolean;
}
