import { useState } from 'react';

import { usePatchUserMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { useUserOnboardingSettingsQuery } from '@/pages/settings/hooks/useSettingsQueries';
import { getApiErrorMessage } from '@/shared/apis/apiError';

import type { BaselineTypeTypes } from '@/pages/settings/types/settingsTypes';

const BOWEL_RHYTHM_SAVE_ERROR_MESSAGE =
  '배변 리듬을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';

const useBowelRhythmSettings = () => {
  const {
    data: memberProfile,
    isLoading,
    isError,
    refetch,
  } = useUserOnboardingSettingsQuery();
  const patchUserMutation = usePatchUserMutation();
  const [selectedBaselineTypeDraft, setSelectedBaselineTypeDraft] =
    useState<BaselineTypeTypes>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const selectedBaselineType =
    selectedBaselineTypeDraft ?? memberProfile?.baselineType ?? null;

  const isModified = Boolean(
    memberProfile && selectedBaselineType !== memberProfile.baselineType,
  );

  const selectBaselineType = (baselineType: BaselineTypeTypes) => {
    setSelectedBaselineTypeDraft(baselineType);
    setErrorMessage(null);
  };

  const saveSettings = async () => {
    if (!selectedBaselineType) return false;

    setErrorMessage(null);

    try {
      await patchUserMutation.mutateAsync({
        baselineType: selectedBaselineType,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, BOWEL_RHYTHM_SAVE_ERROR_MESSAGE),
      );
      return false;
    }
  };

  return {
    selectedBaselineType,
    isModified,
    isReady: Boolean(memberProfile),
    isLoading,
    isError,
    isSaving: patchUserMutation.isPending,
    errorMessage,
    selectBaselineType,
    saveSettings,
    refetch,
  };
};

export default useBowelRhythmSettings;
