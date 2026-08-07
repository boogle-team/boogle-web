import type {
  UserAgeGroupTypes,
  UserBaselineTypeTypes,
  UserGenderTypes,
  UserProfileImageSourceTypes,
} from '@/shared/types/userTypes';

export type GenderTypes = UserGenderTypes;

export type ProviderTypes = 'GOOGLE' | 'KAKAO';

export type BaselineTypeTypes = UserBaselineTypeTypes;

export type AgeGroupTypes = UserAgeGroupTypes;

export type YnTypes = 'Y' | 'N';

export type ProfileImageSourceTypes = UserProfileImageSourceTypes;

export interface MemberTypes {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  profileImageSource: ProfileImageSourceTypes;
  gender: GenderTypes | null;
  ageGroup: AgeGroupTypes | null;
  baselineType: BaselineTypeTypes | null;
  sensitiveInfoAgreed: boolean;
  onboardingCompleted: boolean;
  socialAccounts: SocialAccountTypes[];
  regDate: string;
}

export interface SocialAccountTypes {
  provider: ProviderTypes;
  maskedEmail: string;
  linkedAt: string;
}

export interface MemberAlarmTypes {
  recordAlarm: YnTypes;
  reportAlarm: YnTypes;
  warnAlarm: YnTypes;
}
