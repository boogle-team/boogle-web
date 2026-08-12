import { useNavigate } from 'react-router-dom';

import SettingsBottomAction from '@/pages/settings/components/SettingsBottomAction';
import SettingsQueryStatePage from '@/pages/settings/components/SettingsQueryStatePage';
import UnsavedChangesToast from '@/pages/settings/components/UnsavedChangesToast';
import {
  AGE_GROUP_OPTIONS,
  GENDER_OPTIONS,
} from '@/pages/settings/constants/settingsConstants';
import useBaselineInfoSettings from '@/pages/settings/hooks/useBaselineInfoSettings';
import useUnsavedChangesToast from '@/pages/settings/hooks/useUnsavedChangesToast';
import Button from '@/shared/components/Button';
import Chip from '@/shared/components/Chip';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type {
  AgeGroupTypes,
  GenderTypes,
} from '@/pages/settings/types/settingsTypes';

const BaselineInfoSetting = () => {
  const navigate = useNavigate();
  const {
    selectedAgeGroup,
    selectedGender,
    isModified,
    isReady,
    isLoading,
    isError,
    isSaving,
    errorMessage,
    selectAgeGroup,
    selectGender,
    saveSettings,
    refetch,
  } = useBaselineInfoSettings();
  const { isToastVisible, dismissToast, handleBackAttempt } =
    useUnsavedChangesToast();

  const handleBackClick = () => {
    handleBackAttempt(isModified, () => navigate('/settings/profile'));
  };

  const handleAgeGroupClick = (ageGroup: AgeGroupTypes) => {
    selectAgeGroup(ageGroup);
    dismissToast();
  };

  const handleGenderClick = (gender: GenderTypes) => {
    selectGender(gender);
    dismissToast();
  };

  const handleSaveClick = async () => {
    const isSaved = await saveSettings();

    if (isSaved) {
      navigate('/settings/profile');
    }
  };

  if (isLoading || isError || !isReady) {
    return (
      <SettingsQueryStatePage
        title="기준선 정보"
        isLoading={isLoading}
        loadingMessage="기준선 정보를 불러오고 있어요."
        errorMessage="기준선 정보를 불러오지 못했어요."
        onBackButtonClick={handleBackClick}
        onRetryClick={() => void refetch()}
      />
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2"
        title="기준선 정보"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(var(--settings-fixed-action-space)+var(--safe-area-bottom))]">
        <section className="mt-6 text-center">
          <h1 className="text-[1.375rem] font-semibold leading-[1.7875rem] tracking-[-0.06875rem] text-gray-10">
            정보를 조금만 더 알려주세요!
          </h1>

          <p className="mt-[0.37rem] text-[0.875rem] font-medium leading-[1.225rem] tracking-[-0.0175rem] text-gray-7">
            입력하면 <span className="text-orange-6">더 정확한 기준선</span>을
            만들 수 있어요
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-center text-[1rem] font-medium leading-[1.4rem] tracking-[-0.02rem] text-gray-8">
            나이대
          </h2>

          <div className="mx-auto flex w-full max-w-[17rem] flex-wrap justify-center gap-2 min-[400px]:max-w-none">
            {AGE_GROUP_OPTIONS.map((option) => {
              const isSelected = selectedAgeGroup === option.value;

              return (
                <Chip
                  key={option.value}
                  text={option.label}
                  size="compact"
                  isSelected={isSelected}
                  onClick={() => handleAgeGroupClick(option.value)}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-8 border-t border-gray-4 pt-8">
          <h2 className="mb-3 text-center text-[1rem] font-medium leading-[1.4rem] tracking-[-0.02rem] text-gray-8">
            성별
          </h2>

          <div className="mx-auto flex w-full max-w-[17rem] flex-wrap justify-center gap-2">
            {GENDER_OPTIONS.map((option) => {
              const isSelected = selectedGender === option.value;

              return (
                <Chip
                  key={option.value}
                  text={option.label}
                  size="compact"
                  isSelected={isSelected}
                  onClick={() => handleGenderClick(option.value)}
                />
              );
            })}
          </div>
        </section>

        <SettingsBottomAction>
          {errorMessage && (
            <p role="alert" className="caption mb-2 text-semantic-danger">
              {errorMessage}
            </p>
          )}
          <Button
            text={isSaving ? '저장 중...' : '저장하기'}
            variant="primary"
            disabled={
              !isModified ||
              !selectedAgeGroup ||
              !selectedGender ||
              isLoading ||
              isSaving
            }
            onClick={handleSaveClick}
          />
        </SettingsBottomAction>
      </main>

      <UnsavedChangesToast isVisible={isToastVisible} />
    </div>
  );
};

export default BaselineInfoSetting;
