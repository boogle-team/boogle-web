import { useState } from 'react';

import useProfileSettings from './useProfileSettings';

import type { AgeGroupTypes, GenderTypes } from '../types/settingsTypes';

const useBaselineInfoSettings = () => {
  const { memberProfile, saveBaselineInfo } = useProfileSettings();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(
    memberProfile.ageGroup,
  );
  const [selectedGender, setSelectedGender] = useState(memberProfile.gender);

  const isModified =
    selectedAgeGroup !== memberProfile.ageGroup ||
    selectedGender !== memberProfile.gender;

  const selectAgeGroup = (ageGroup: AgeGroupTypes) => {
    setSelectedAgeGroup(ageGroup);
  };

  const selectGender = (gender: GenderTypes) => {
    setSelectedGender(gender);
  };

  const saveSettings = () => {
    saveBaselineInfo(selectedAgeGroup, selectedGender);
  };

  return {
    selectedAgeGroup,
    selectedGender,
    isModified,
    selectAgeGroup,
    selectGender,
    saveSettings,
  };
};

export default useBaselineInfoSettings;
