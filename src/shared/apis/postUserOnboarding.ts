import { api } from '@/shared/apis/axiosInstance';
import type {
  SaveUserOnboardingRequestTypes,
  UserOnboardingResponseTypes,
} from '@/shared/types/userTypes';

export const postUserOnboarding = async ({
  nickname,
  profileImageFile,
  gender,
  ageGroup,
  baselineType,
  sensitiveInfoAgreed,
  sensitiveInfoPolicyVersion,
}: SaveUserOnboardingRequestTypes) => {
  const formData = new FormData();

  formData.append('nickname', nickname);
  formData.append('gender', gender);
  formData.append('ageGroup', `${ageGroup}`);
  formData.append('baselineType', baselineType);
  formData.append('sensitiveInfoAgreed', `${sensitiveInfoAgreed}`);
  formData.append('sensitiveInfoPolicyVersion', sensitiveInfoPolicyVersion);

  if (profileImageFile) {
    formData.append('profileImage', profileImageFile);
  }

  const { data } = await api.post<UserOnboardingResponseTypes>(
    '/api/v1/users/me/onboarding',
    formData,
  );

  return data;
};
