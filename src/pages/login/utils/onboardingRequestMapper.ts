import type { ProfileInputValueTypes } from '@/pages/login/types/loginTypes';
import type {
  SaveUserOnboardingRequestTypes,
  UserAgeGroupTypes,
  UserBaselineTypeTypes,
  UserGenderTypes,
} from '@/shared/types/userTypes';

const SENSITIVE_INFO_POLICY_VERSION = '2026-07-01';

const GENDER_MAP: Record<
  NonNullable<ProfileInputValueTypes['gender']>,
  UserGenderTypes
> = {
  female: 'F',
  male: 'M',
  none: 'N',
};

const AGE_GROUP_MAP: Record<
  NonNullable<ProfileInputValueTypes['ageGroup']>,
  UserAgeGroupTypes
> = {
  teens: 10,
  twenties: 20,
  thirties: 30,
  fortiesAndOlder: 40,
};

const BASELINE_TYPE_MAP: Record<
  NonNullable<ProfileInputValueTypes['bowelRhythm']>,
  UserBaselineTypeTypes
> = {
  regular: 'R',
  constipation: 'C',
  loose: 'L',
  unknown: 'U',
};

export const mapProfileInputToOnboardingRequest = ({
  nickname,
  profileImageFile,
  bowelRhythm,
  ageGroup,
  gender,
  shouldTrackMenstrualCycle,
}: ProfileInputValueTypes): SaveUserOnboardingRequestTypes => {
  if (!bowelRhythm || !ageGroup || !gender) {
    throw new Error('Required onboarding profile value is missing.');
  }

  return {
    nickname: nickname.trim(),
    profileImageFile,
    gender: GENDER_MAP[gender],
    ageGroup: AGE_GROUP_MAP[ageGroup],
    baselineType: BASELINE_TYPE_MAP[bowelRhythm],
    sensitiveInfoAgreed: shouldTrackMenstrualCycle,
    sensitiveInfoPolicyVersion: SENSITIVE_INFO_POLICY_VERSION,
  };
};
