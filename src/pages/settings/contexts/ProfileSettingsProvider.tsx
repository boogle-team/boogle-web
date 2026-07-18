import { useState, type ReactNode } from 'react';

import ProfileSettingsContext from './profileSettingsContext';

import type {
  AgeGroupTypes,
  BaselineTypeTypes,
  GenderTypes,
  MemberProfileTypes,
} from '../types/settingsTypes';

interface ProfileSettingsProviderPropTypes {
  children: ReactNode;
}

const INITIAL_MEMBER_PROFILE: MemberProfileTypes = {
  ageGroup: 20,
  gender: 'F',
  baselineType: 'R',
};

const ProfileSettingsProvider = ({
  children,
}: ProfileSettingsProviderPropTypes) => {
  const [memberProfile, setMemberProfile] = useState(INITIAL_MEMBER_PROFILE);

  const saveBaselineInfo = (ageGroup: AgeGroupTypes, gender: GenderTypes) => {
    setMemberProfile((prevMemberProfile) => ({
      ...prevMemberProfile,
      ageGroup,
      gender,
    }));
  };

  const saveBaselineType = (baselineType: BaselineTypeTypes) => {
    setMemberProfile((prevMemberProfile) => ({
      ...prevMemberProfile,
      baselineType,
    }));
  };

  return (
    <ProfileSettingsContext.Provider
      value={{ memberProfile, saveBaselineInfo, saveBaselineType }}
    >
      {children}
    </ProfileSettingsContext.Provider>
  );
};

export default ProfileSettingsProvider;
