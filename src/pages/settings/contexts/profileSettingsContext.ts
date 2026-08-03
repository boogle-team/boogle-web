import { createContext } from 'react';

export interface ProfileSettingsContextValueTypes {
  nicknameDraft: string | undefined;
  profileImageFile: File | null;
  profileImagePreview: string | null;
  updateNicknameDraft: (nickname: string) => void;
  selectProfileImage: (imageFile: File) => void;
  clearProfileImage: () => void;
  resetProfileDraft: () => void;
}

const ProfileSettingsContext =
  createContext<ProfileSettingsContextValueTypes | null>(null);

export default ProfileSettingsContext;
