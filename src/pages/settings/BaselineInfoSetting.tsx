import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import Chip from '@/shared/components/Chip';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import SettingsBottomAction from './components/SettingsBottomAction';
import UnsavedChangesToast from './components/UnsavedChangesToast';
import {
  AGE_GROUP_OPTIONS,
  GENDER_OPTIONS,
} from './constants/settingsConstants';
import useBaselineInfoSettings from './hooks/useBaselineInfoSettings';
import useUnsavedChangesToast from './hooks/useUnsavedChangesToast';

import type { AgeGroupTypes, GenderTypes } from './types/settingsTypes';

const BaselineInfoSetting = () => {
  const navigate = useNavigate();
  const {
    selectedAgeGroup,
    selectedGender,
    isModified,
    selectAgeGroup,
    selectGender,
    saveSettings,
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

  const handleSaveClick = () => {
    saveSettings();
    navigate('/settings/profile');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="기준선 정보"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
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

          <div className="grid grid-cols-4 gap-1.5">
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

        <section className="mt-8 border-t border-gray-4 pt-8 px-[2.81rem]">
          <h2 className="mb-3 text-center text-[1rem] font-medium leading-[1.4rem] tracking-[-0.02rem] text-gray-8">
            성별
          </h2>

          <div className="grid grid-cols-3 gap-2">
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
          <Button text="저장하기" variant="primary" onClick={handleSaveClick} />
        </SettingsBottomAction>
      </main>

      <UnsavedChangesToast isVisible={isToastVisible} />
    </div>
  );
};

export default BaselineInfoSetting;
