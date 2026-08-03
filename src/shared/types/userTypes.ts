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