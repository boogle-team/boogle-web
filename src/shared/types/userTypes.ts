export type UserGenderTypes = 'F' | 'M' | 'N';

export type UserAgeGroupTypes = 10 | 20 | 30 | 40;

export type UserBaselineTypeTypes = 'R' | 'C' | 'L' | 'U';

export interface UserOnboardingTypes {
  id: number;
  nickname: string;
  profileImage: string | null;
  profileImageSource: string;
  gender: string | null;
  ageGroup: number | null;
  baselineType: string | null;
  sensitiveInfoAgreed: boolean;
  onboardingCompleted: boolean;
}

export interface UserOnboardingResponseTypes {
  success: boolean;
  data: UserOnboardingTypes;
  message: string;
}

export interface SaveUserOnboardingRequestTypes {
  nickname: string;
  profileImageFile: File | null;
  gender: UserGenderTypes;
  ageGroup: UserAgeGroupTypes;
  baselineType: UserBaselineTypeTypes;
  sensitiveInfoAgreed: boolean;
  sensitiveInfoPolicyVersion: string;
}
