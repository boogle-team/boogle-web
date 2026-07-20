import { createContext } from 'react';

import type {
  AgeGroupTypes,
  BaselineTypeTypes,
  GenderTypes,
  MemberProfileTypes,
} from '../types/settingsTypes';

export interface ProfileSettingsContextValueTypes {
  memberProfile: MemberProfileTypes;
  nicknameDraft: string;
  updateNicknameDraft: (nickname: string) => void;
  resetNicknameDraft: () => void;
  saveNickname: (nickname: string) => void;
  saveBaselineInfo: (ageGroup: AgeGroupTypes, gender: GenderTypes) => void;
  saveBaselineType: (baselineType: BaselineTypeTypes) => void;
}

const ProfileSettingsContext =
  createContext<ProfileSettingsContextValueTypes | null>(null);

export default ProfileSettingsContext;
