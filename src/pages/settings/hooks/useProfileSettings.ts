import { useContext, useState } from 'react';

import ProfileSettingsContext from '@/pages/settings/contexts/profileSettingsContext';
import { usePatchUserMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { useUserOnboardingSettingsQuery } from '@/pages/settings/hooks/useSettingsQueries';
import { getApiErrorMessage } from '@/shared/apis/apiError';

const PROFILE_SAVE_ERROR_MESSAGE =
  '프로필을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';
const PROFILE_IMAGE_ERROR_MESSAGE =
  'JPEG, PNG, WebP 형식의 50MB 이하 이미지를 선택해 주세요.';
const PROFILE_IMAGE_MAX_SIZE = 50 * 1024 * 1024;
const SUPPORTED_PROFILE_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const useProfileSettings = () => {
  const profileDraftContext = useContext(ProfileSettingsContext);
  const {
    data: memberProfile,
    isLoading,
    isError,
    refetch,
  } = useUserOnboardingSettingsQuery();
  const patchUserMutation = usePatchUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!profileDraftContext) {
    throw new Error(
      'useProfileSettings는 ProfileSettingsProvider 안에서 사용해야 합니다.',
    );
  }

  const {
    nicknameDraft: nicknameDraftState,
    profileImageFile,
    profileImagePreview,
    updateNicknameDraft: updateProfileNicknameDraft,
    selectProfileImage: selectProfileDraftImage,
    clearProfileImage,
    resetProfileDraft: resetProfileDraftContext,
  } = profileDraftContext;
  const nicknameDraft = nicknameDraftState ?? memberProfile?.nickname ?? '';

  const updateNicknameDraft = (nickname: string) => {
    updateProfileNicknameDraft(nickname);
    setErrorMessage(null);
  };

  const selectProfileImage = (imageFile: File) => {
    const isSupportedType = SUPPORTED_PROFILE_IMAGE_TYPES.has(imageFile.type);
    const isSupportedSize = imageFile.size <= PROFILE_IMAGE_MAX_SIZE;

    if (!isSupportedType || !isSupportedSize) {
      clearProfileImage();
      setErrorMessage(PROFILE_IMAGE_ERROR_MESSAGE);
      return;
    }

    selectProfileDraftImage(imageFile);
    setErrorMessage(null);
  };

  const resetProfileDraft = () => {
    resetProfileDraftContext();
    setErrorMessage(null);
  };

  const saveProfile = async () => {
    const nickname = nicknameDraft.trim();

    setErrorMessage(null);

    try {
      await patchUserMutation.mutateAsync({
        nickname,
        ...(profileImageFile ? { profileImageFile } : {}),
      });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, PROFILE_SAVE_ERROR_MESSAGE));
      throw error;
    }
  };

  return {
    memberProfile,
    nicknameDraft,
    profileImagePreview,
    errorMessage,
    isLoading,
    isError,
    isSaving: patchUserMutation.isPending,
    updateNicknameDraft,
    selectProfileImage,
    resetProfileDraft,
    saveProfile,
    refetch,
  };
};

export default useProfileSettings;
