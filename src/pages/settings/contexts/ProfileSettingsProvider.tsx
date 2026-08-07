import { useEffect, useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import ProfileSettingsContext from '@/pages/settings/contexts/profileSettingsContext';

interface ProfileSettingsStateTypes {
  nicknameDraft: string | undefined;
  profileImageFile: File | null;
  profileImagePreview: string | null;
}

type ProfileSettingsActionTypes =
  | { type: 'UPDATE_NICKNAME'; nickname: string }
  | { type: 'SELECT_PROFILE_IMAGE'; imageFile: File; previewUrl: string }
  | { type: 'CLEAR_PROFILE_IMAGE' }
  | { type: 'RESET_PROFILE_DRAFT' };

const INITIAL_PROFILE_SETTINGS_STATE: ProfileSettingsStateTypes = {
  nicknameDraft: undefined,
  profileImageFile: null,
  profileImagePreview: null,
};

const profileSettingsReducer = (
  state: ProfileSettingsStateTypes,
  action: ProfileSettingsActionTypes,
): ProfileSettingsStateTypes => {
  switch (action.type) {
    case 'UPDATE_NICKNAME':
      return {
        ...state,
        nicknameDraft: action.nickname,
      };
    case 'SELECT_PROFILE_IMAGE':
      return {
        ...state,
        profileImageFile: action.imageFile,
        profileImagePreview: action.previewUrl,
      };
    case 'CLEAR_PROFILE_IMAGE':
      return {
        ...state,
        profileImageFile: null,
        profileImagePreview: null,
      };
    case 'RESET_PROFILE_DRAFT':
      return INITIAL_PROFILE_SETTINGS_STATE;
  }
};

const ProfileSettingsProvider = () => {
  const [state, dispatch] = useReducer(
    profileSettingsReducer,
    INITIAL_PROFILE_SETTINGS_STATE,
  );

  useEffect(() => {
    const previewUrl = state.profileImagePreview;

    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [state.profileImagePreview]);

  const updateNicknameDraft = (nickname: string) => {
    dispatch({ type: 'UPDATE_NICKNAME', nickname });
  };

  const selectProfileImage = (imageFile: File) => {
    dispatch({
      type: 'SELECT_PROFILE_IMAGE',
      imageFile,
      previewUrl: URL.createObjectURL(imageFile),
    });
  };

  const clearProfileImage = () => {
    dispatch({ type: 'CLEAR_PROFILE_IMAGE' });
  };

  const resetProfileDraft = () => {
    dispatch({ type: 'RESET_PROFILE_DRAFT' });
  };

  return (
    <ProfileSettingsContext.Provider
      value={{
        nicknameDraft: state.nicknameDraft,
        profileImageFile: state.profileImageFile,
        profileImagePreview: state.profileImagePreview,
        updateNicknameDraft,
        selectProfileImage,
        clearProfileImage,
        resetProfileDraft,
      }}
    >
      <Outlet />
    </ProfileSettingsContext.Provider>
  );
};

export default ProfileSettingsProvider;
