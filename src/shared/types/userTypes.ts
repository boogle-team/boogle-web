import type { ApiResponseTypes } from '@/shared/types/apiTypes';

export type UserGenderTypes = 'F' | 'M' | 'N';

export type UserAgeGroupTypes = 10 | 20 | 30 | 40;

export type UserBaselineTypeTypes = 'R' | 'C' | 'L' | 'U';

export type UserProfileImageSourceTypes = 'SOCIAL' | 'CUSTOM';

export interface UserOnboardingTypes {
  id: number;
  nickname: string;
  profileImage: string | null;
  profileImageSource: UserProfileImageSourceTypes;
  gender: UserGenderTypes | null;
  ageGroup: UserAgeGroupTypes | null;
  baselineType: UserBaselineTypeTypes | null;
  sensitiveInfoAgreed: boolean;
  onboardingCompleted: boolean;
}

export type UserOnboardingResponseTypes = ApiResponseTypes<UserOnboardingTypes>;

export interface SaveUserOnboardingRequestTypes {
  nickname: string;
  profileImageFile: File | null;
  gender: UserGenderTypes;
  ageGroup: UserAgeGroupTypes;
  baselineType: UserBaselineTypeTypes;
  sensitiveInfoAgreed: boolean;
  sensitiveInfoPolicyVersion: string;
}
