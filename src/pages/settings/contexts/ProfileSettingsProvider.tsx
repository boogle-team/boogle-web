import { useReducer, type ReactNode } from 'react';

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

interface ProfileSettingsStateTypes {
  memberProfile: MemberProfileTypes;
  nicknameDraft: string;
}

type ProfileSettingsActionTypes =
  | { type: 'UPDATE_NICKNAME_DRAFT'; nickname: string }
  | { type: 'RESET_NICKNAME_DRAFT' }
  | { type: 'SAVE_NICKNAME'; nickname: string }
  | {
      type: 'SAVE_BASELINE_INFO';
      ageGroup: AgeGroupTypes;
      gender: GenderTypes;
    }
  | { type: 'SAVE_BASELINE_TYPE'; baselineType: BaselineTypeTypes };

const INITIAL_MEMBER_PROFILE: MemberProfileTypes = {
  nickname: '이연수',
  ageGroup: 20,
  gender: 'F',
  baselineType: 'R',
};

const INITIAL_PROFILE_SETTINGS_STATE: ProfileSettingsStateTypes = {
  memberProfile: INITIAL_MEMBER_PROFILE,
  nicknameDraft: INITIAL_MEMBER_PROFILE.nickname,
};

const profileSettingsReducer = (
  state: ProfileSettingsStateTypes,
  action: ProfileSettingsActionTypes,
): ProfileSettingsStateTypes => {
  switch (action.type) {
    case 'UPDATE_NICKNAME_DRAFT':
      return {
        ...state,
        nicknameDraft: action.nickname,
      };
    case 'RESET_NICKNAME_DRAFT':
      return {
        ...state,
        nicknameDraft: state.memberProfile.nickname,
      };
    case 'SAVE_NICKNAME':
      return {
        memberProfile: {
          ...state.memberProfile,
          nickname: action.nickname,
        },
        nicknameDraft: action.nickname,
      };
    case 'SAVE_BASELINE_INFO':
      return {
        ...state,
        memberProfile: {
          ...state.memberProfile,
          ageGroup: action.ageGroup,
          gender: action.gender,
        },
      };
    case 'SAVE_BASELINE_TYPE':
      return {
        ...state,
        memberProfile: {
          ...state.memberProfile,
          baselineType: action.baselineType,
        },
      };
  }
};

const ProfileSettingsProvider = ({
  children,
}: ProfileSettingsProviderPropTypes) => {
  const [state, dispatch] = useReducer(
    profileSettingsReducer,
    INITIAL_PROFILE_SETTINGS_STATE,
  );

  const updateNicknameDraft = (nickname: string) => {
    dispatch({ type: 'UPDATE_NICKNAME_DRAFT', nickname });
  };

  const resetNicknameDraft = () => {
    dispatch({ type: 'RESET_NICKNAME_DRAFT' });
  };

  const saveNickname = (nickname: string) => {
    dispatch({ type: 'SAVE_NICKNAME', nickname });
  };

  const saveBaselineInfo = (ageGroup: AgeGroupTypes, gender: GenderTypes) => {
    dispatch({ type: 'SAVE_BASELINE_INFO', ageGroup, gender });
  };

  const saveBaselineType = (baselineType: BaselineTypeTypes) => {
    dispatch({ type: 'SAVE_BASELINE_TYPE', baselineType });
  };

  return (
    <ProfileSettingsContext.Provider
      value={{
        memberProfile: state.memberProfile,
        nicknameDraft: state.nicknameDraft,
        updateNicknameDraft,
        resetNicknameDraft,
        saveNickname,
        saveBaselineInfo,
        saveBaselineType,
      }}
    >
      {children}
    </ProfileSettingsContext.Provider>
  );
};

export default ProfileSettingsProvider;
