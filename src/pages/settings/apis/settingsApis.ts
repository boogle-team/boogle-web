import { api } from '@/shared/apis/axiosInstance';

import type {
  DeleteAccountRequestTypes,
  DeleteAccountResponseTypes,
  MemberResponseTypes,
  PatchSensitiveInfoConsentRequestTypes,
  PatchUserRequestTypes,
  ProfileImageResponseTypes,
  PutProfileImageRequestTypes,
  SensitiveInfoConsentResponseTypes,
} from '@/pages/settings/types/settingsApiTypes';

const USER_PATH = '/api/v1/users/me';

export const getUser = async () => {
  const { data } = await api.get<MemberResponseTypes>(USER_PATH);

  return data.data;
};

export const patchUser = async (requestBody: PatchUserRequestTypes) => {
  const formData = new FormData();
  const { profileImageFile, ...userInformation } = requestBody;

  Object.entries(userInformation).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, `${value}`);
    }
  });

  if (profileImageFile) {
    formData.append('profileImage', profileImageFile);
  }

  const { data } = await api.patch<MemberResponseTypes>(USER_PATH, formData);

  return data.data;
};

export const deleteUser = async (requestBody: DeleteAccountRequestTypes) => {
  const { data } = await api.delete<DeleteAccountResponseTypes>(USER_PATH, {
    data: requestBody,
  });

  return data.data;
};

export const getSensitiveInfoConsent = async () => {
  const { data } = await api.get<SensitiveInfoConsentResponseTypes>(
    `${USER_PATH}/sensitive-info-consent`,
  );

  return data.data;
};

export const patchSensitiveInfoConsent = async (
  requestBody: PatchSensitiveInfoConsentRequestTypes,
) => {
  const { data } = await api.patch<SensitiveInfoConsentResponseTypes>(
    `${USER_PATH}/sensitive-info-consent`,
    requestBody,
  );

  return data.data;
};

export const putProfileImage = async ({
  imageFile,
}: PutProfileImageRequestTypes) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await api.put<ProfileImageResponseTypes>(
    `${USER_PATH}/profile-image`,
    formData,
  );

  return data.data;
};

export const deleteProfileImage = async () => {
  const { data } = await api.delete<ProfileImageResponseTypes>(
    `${USER_PATH}/profile-image`,
  );

  return data.data;
};
