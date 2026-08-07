import { useState } from 'react';

import { usePatchUserMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { useUserOnboardingSettingsQuery } from '@/pages/settings/hooks/useSettingsQueries';
import { getApiErrorMessage } from '@/shared/apis/apiError';

import type {
  AgeGroupTypes,
  GenderTypes,
} from '@/pages/settings/types/settingsTypes';

const BASELINE_INFO_SAVE_ERROR_MESSAGE =
  '기준선 정보를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';

const useBaselineInfoSettings = () => {
  const {
    data: memberProfile,
    isLoading,
    isError,
    refetch,
  } = useUserOnboardingSettingsQuery();
  const patchUserMutation = usePatchUserMutation();
  const [selectedAgeGroupDraft, setSelectedAgeGroupDraft] =
    useState<AgeGroupTypes>();
  const [selectedGenderDraft, setSelectedGenderDraft] = useState<GenderTypes>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const selectedAgeGroup =
    selectedAgeGroupDraft ?? memberProfile?.ageGroup ?? null;
  const selectedGender = selectedGenderDraft ?? memberProfile?.gender ?? null;

  const isModified = Boolean(
    memberProfile &&
    (selectedAgeGroup !== memberProfile.ageGroup ||
      selectedGender !== memberProfile.gender),
  );

  const selectAgeGroup = (ageGroup: AgeGroupTypes) => {
    setSelectedAgeGroupDraft(ageGroup);
    setErrorMessage(null);
  };

  const selectGender = (gender: GenderTypes) => {
    setSelectedGenderDraft(gender);
    setErrorMessage(null);
  };

  const saveSettings = async () => {
    if (!selectedAgeGroup || !selectedGender) return false;

    setErrorMessage(null);

    try {
      await patchUserMutation.mutateAsync({
        ageGroup: selectedAgeGroup,
        gender: selectedGender,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, BASELINE_INFO_SAVE_ERROR_MESSAGE),
      );
      return false;
    }
  };

  return {
    selectedAgeGroup,
    selectedGender,
    isModified,
    isReady: Boolean(memberProfile),
    isLoading,
    isError,
    isSaving: patchUserMutation.isPending,
    errorMessage,
    selectAgeGroup,
    selectGender,
    saveSettings,
    refetch,
  };
};

export default useBaselineInfoSettings;
