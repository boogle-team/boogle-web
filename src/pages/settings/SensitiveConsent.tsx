import { useNavigate } from 'react-router-dom';

import SettingsBottomAction from '@/pages/settings/components/SettingsBottomAction';
import SettingsNotice from '@/pages/settings/components/SettingsNotice';
import SettingsQueryStatePage from '@/pages/settings/components/SettingsQueryStatePage';
import ToggleSwitch from '@/pages/settings/components/ToggleSwitch';
import UnsavedChangesToast from '@/pages/settings/components/UnsavedChangesToast';
import useSensitiveConsent from '@/pages/settings/hooks/useSensitiveConsent';
import useUnsavedChangesToast from '@/pages/settings/hooks/useUnsavedChangesToast';
import InfoFlagIcon from '@/shared/assets/icons/infoFlagIcon.svg?react';
import Button from '@/shared/components/Button';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const SensitiveConsent = () => {
  const navigate = useNavigate();
  const {
    sensitiveConsent,
    isAgreed,
    isModified,
    isLoading,
    isError,
    isSaving,
    errorMessage,
    toggleConsent,
    saveConsent,
    refetch,
  } = useSensitiveConsent();
  const { isToastVisible, dismissToast, handleBackAttempt } =
    useUnsavedChangesToast();

  const handleBackClick = () => {
    handleBackAttempt(isModified, () => navigate('/settings'));
  };

  const handleConsentToggleClick = () => {
    toggleConsent();
    dismissToast();
  };

  const handleSaveClick = async () => {
    const isSaved = await saveConsent();

    if (isSaved) {
      dismissToast();
    }
  };

  const consentDate = sensitiveConsent?.agreed
    ? sensitiveConsent.agreedAt
    : sensitiveConsent?.withdrawnAt;
  const formattedConsentDate = consentDate
    ? consentDate.split('T')[0].replaceAll('-', '.')
    : null;

  if (isLoading || isError || !sensitiveConsent) {
    return (
      <SettingsQueryStatePage
        title="민감정보 수집 동의 관리"
        isLoading={isLoading}
        loadingMessage="동의 정보를 불러오고 있어요."
        errorMessage="동의 정보를 불러오지 못했어요."
        onBackButtonClick={handleBackClick}
        onRetryClick={() => void refetch()}
      />
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2"
        title="민감정보 수집 동의 관리"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(var(--settings-fixed-action-space)+var(--safe-area-bottom))]">
        <section className="mt-6 rounded-xl border border-orange-3 bg-orange-1 px-4 py-4">
          <div className="flex items-center gap-2 text-orange-7">
            <InfoFlagIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-orange-6"
            />
            <h2 className="label-semi">민감정보란?</h2>
          </div>
          <p className="caption mt-1 pl-7 text-gray-7">
            생리·호르몬 변화처럼 더 신중하게 다뤄야 하는 건강정보예요
          </p>
        </section>

        <div className="my-8 border-t border-gray-4" />

        <section>
          <h2 className="body-m mb-2 px-2 text-gray-8">동의 항목</h2>

          <div className="rounded-xl border border-gray-4 bg-beige-1 px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="label-bold text-gray-10">
                  생리·호르몬 데이터 수집
                </h3>
                <p className="caption mt-1 text-gray-7">
                  생리 기록 세부 항목에 관련 키트가 표시돼요
                </p>
                <p className="caption mt-1 text-orange-6">
                  {isAgreed ? '동의함' : '동의하지 않음'}
                  {formattedConsentDate && ` · ${formattedConsentDate}`}
                </p>
              </div>

              <ToggleSwitch
                ariaLabel="생리·호르몬 데이터 수집 동의"
                isEnabled={isAgreed}
                isDisabled={isSaving}
                onClick={handleConsentToggleClick}
              />
            </div>
          </div>

          <SettingsNotice className="mt-2 px-2">
            철회 시 관련 항목과 기존 기록 데이터가 삭제돼요
          </SettingsNotice>
        </section>

        <section className="mt-8">
          <h2 className="body-m mb-2 px-2 text-gray-8">수집되는 데이터</h2>

          <div className="caption rounded-xl border border-gray-4 bg-beige-1 px-4 py-3 text-gray-7">
            <p>· 생리·호르몬 상태 (없음 / 생리 중 / 호르몬 변화 있음)</p>
            <p className="mt-1">· 기록 날짜 및 시간</p>
          </div>

          <SettingsNotice className="mt-2 px-2">
            패턴 분석 보조 목적으로만 사용되며 제3자에게 제공되지 않아요
          </SettingsNotice>
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
            disabled={!sensitiveConsent || !isModified || isSaving}
            onClick={handleSaveClick}
          />
        </SettingsBottomAction>
      </main>

      <UnsavedChangesToast isVisible={isToastVisible} />
    </div>
  );
};

export default SensitiveConsent;
