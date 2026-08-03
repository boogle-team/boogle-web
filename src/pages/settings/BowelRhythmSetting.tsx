import { useNavigate } from 'react-router-dom';

import SettingsBottomAction from '@/pages/settings/components/SettingsBottomAction';
import SettingsQueryStatePage from '@/pages/settings/components/SettingsQueryStatePage';
import UnsavedChangesToast from '@/pages/settings/components/UnsavedChangesToast';
import useBowelRhythmSettings from '@/pages/settings/hooks/useBowelRhythmSettings';
import useUnsavedChangesToast from '@/pages/settings/hooks/useUnsavedChangesToast';
import Button from '@/shared/components/Button';
import Chip from '@/shared/components/Chip';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type { BaselineTypeTypes } from '@/pages/settings/types/settingsTypes';

const BOWEL_RHYTHM_OPTIONS: {
  label: string;
  value: BaselineTypeTypes;
}[] = [
  {
    label: '변비 경향이 있어요',
    value: 'C',
  },
  {
    label: '규칙적이에요 (주 3회 이상)',
    value: 'R',
  },
  {
    label: '묽은 변 경향이 있어요',
    value: 'L',
  },
  {
    label: '잘 모르겠어요',
    value: 'U',
  },
];

const BowelRhythmSetting = () => {
  const navigate = useNavigate();
  const {
    selectedBaselineType,
    isModified,
    isReady,
    isLoading,
    isError,
    isSaving,
    errorMessage,
    selectBaselineType,
    saveSettings,
    refetch,
  } = useBowelRhythmSettings();
  const { isToastVisible, dismissToast, handleBackAttempt } =
    useUnsavedChangesToast();

  const handleOptionClick = (value: BaselineTypeTypes) => {
    selectBaselineType(value);
    dismissToast();
  };

  const handleBackClick = () => {
    handleBackAttempt(isModified, () => navigate('/settings/profile'));
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
        loadingMessage="배변 리듬을 불러오고 있어요."
        errorMessage="배변 리듬을 불러오지 못했어요."
        onBackButtonClick={handleBackClick}
        onRetryClick={() => void refetch()}
      />
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="기준선 정보"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
        <div className="flex-1">
          <section className="mt-6 text-center">
            <h1 className="text-[1.375rem] font-semibold leading-[1.7875rem] tracking-[-0.06875rem] text-gray-10">
              평소 <span className="text-orange-6">배변 리듬</span>이 어떻게
              되세요?
            </h1>

            <p className="mt-[0.37rem] text-[0.875rem] font-medium leading-[1.225rem] tracking-[-0.0175rem] text-gray-7">
              입력하면 <span className="text-orange-6">더 정확한 기준선</span>을
              만들 수 있어요
            </p>
          </section>

          <section className="mt-8 flex flex-col gap-2">
            {BOWEL_RHYTHM_OPTIONS.map((option) => {
              const isSelected = selectedBaselineType === option.value;

              return (
                <Chip
                  key={option.value}
                  text={option.label}
                  isSelected={isSelected}
                  onClick={() => handleOptionClick(option.value)}
                />
              );
            })}
          </section>
        </div>

        <SettingsBottomAction>
          {errorMessage && (
            <p role="alert" className="caption mb-2 text-semantic-danger">
              {errorMessage}
            </p>
          )}
          <Button
            text={isSaving ? '저장 중...' : '저장하기'}
            variant="primary"
            disabled={!selectedBaselineType || isLoading || isSaving}
            onClick={handleSaveClick}
          />
        </SettingsBottomAction>
      </main>

      <UnsavedChangesToast isVisible={isToastVisible} />
    </div>
  );
};

export default BowelRhythmSetting;
