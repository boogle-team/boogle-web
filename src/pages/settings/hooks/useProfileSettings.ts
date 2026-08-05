import { useContext, useState } from 'react';

import ProfileSettingsContext from '@/pages/settings/contexts/profileSettingsContext';
import { usePatchUserMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { useUserOnboardingSettingsQuery } from '@/pages/settings/hooks/useSettingsQueries';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import { PROFILE_IMAGE_ERROR_MESSAGE } from '@/shared/constants/profileImageConstants';
import { isValidProfileImage } from '@/shared/utils/profileImageValidation';

const PROFILE_SAVE_ERROR_MESSAGE =
  '프로필을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';

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
  const [profileImageErrorMessage, setProfileImageErrorMessage] = useState<
    string | null
  >(null);

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
    resetProfileDraft: resetProfileDraftContext,
  } = profileDraftContext;
  const nicknameDraft = nicknameDraftState ?? memberProfile?.nickname ?? '';
  const isProfileImageValid = profileImageErrorMessage === null;
  const isNicknameModified =
    nicknameDraftState !== undefined &&
    nicknameDraftState !== memberProfile?.nickname;
  const isModified = Boolean(
    memberProfile && (isNicknameModified || profileImageFile),
  );

  const updateNicknameDraft = (nickname: string) => {
    updateProfileNicknameDraft(nickname);
    setErrorMessage(null);
  };

  const selectProfileImage = (imageFile: File) => {
    if (!isValidProfileImage(imageFile)) {
      setProfileImageErrorMessage(PROFILE_IMAGE_ERROR_MESSAGE);
      setErrorMessage(null);
      return;
    }

    selectProfileDraftImage(imageFile);
    setProfileImageErrorMessage(null);
    setErrorMessage(null);
  };

  const resetProfileDraft = () => {
    resetProfileDraftContext();
    setProfileImageErrorMessage(null);
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
    profileImageErrorMessage,
    errorMessage,
    isProfileImageValid,
    isModified,
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
