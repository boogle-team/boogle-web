import type { ApiResponseTypes } from '@/shared/types/apiTypes';

import type {
  AgeGroupTypes,
  BaselineTypeTypes,
  GenderTypes,
  MemberTypes,
  ProfileImageSourceTypes,
} from '@/pages/settings/types/settingsTypes';

export interface PatchUserRequestTypes {
  nickname?: string;
  gender?: GenderTypes;
  ageGroup?: AgeGroupTypes;
  baselineType?: BaselineTypeTypes;
  profileImageFile?: File;
}

export type DeleteAccountReasonTypes =
  'RECORDING_INCONVENIENT' | 'NO_NEEDED_INFO' | 'USING_OTHER_APP' | 'OTHER';

export interface DeleteAccountRequestTypes {
  reason?: DeleteAccountReasonTypes;
  confirmation: '탈퇴합니다';
}

export interface SensitiveInfoConsentTypes {
  agreed: boolean;
  policyVersion: string;
  agreedAt: string | null;
  withdrawnAt: string | null;
}

export interface PatchSensitiveInfoConsentRequestTypes {
  agreed: boolean;
  policyVersion: string;
}

export interface ProfileImageTypes {
  profileImage: string;
  profileImageSource: ProfileImageSourceTypes;
}

export interface PutProfileImageRequestTypes {
  imageFile: File;
}

export type MemberResponseTypes = ApiResponseTypes<MemberTypes>;
export type DeleteAccountResponseTypes = ApiResponseTypes<null>;
export type SensitiveInfoConsentResponseTypes =
  ApiResponseTypes<SensitiveInfoConsentTypes>;
export type ProfileImageResponseTypes = ApiResponseTypes<ProfileImageTypes>;
