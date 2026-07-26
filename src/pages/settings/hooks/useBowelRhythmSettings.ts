import { useState } from 'react';

import useProfileSettings from './useProfileSettings';

import type { BaselineTypeTypes } from '../types/settingsTypes';

const useBowelRhythmSettings = () => {
  const { memberProfile, saveBaselineType } = useProfileSettings();
  const [selectedBaselineType, setSelectedBaselineType] =
    useState<BaselineTypeTypes>(memberProfile.baselineType);

  const isModified = selectedBaselineType !== memberProfile.baselineType;

  const selectBaselineType = (baselineType: BaselineTypeTypes) => {
    setSelectedBaselineType(baselineType);
  };

  const saveSettings = () => {
    saveBaselineType(selectedBaselineType);
  };

  return {
    selectedBaselineType,
    isModified,
    selectBaselineType,
    saveSettings,
  };
};

export default useBowelRhythmSettings;
