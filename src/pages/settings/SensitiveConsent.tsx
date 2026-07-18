import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InfoFlagIcon from '@/shared/assets/icons/infoFlagIcon.svg?react';
import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import Button from '@/shared/components/Button';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import ToggleSwitch from './components/ToggleSwitch';

import type { TfTypes } from './types/settingsTypes';

const SensitiveConsent = () => {
  const navigate = useNavigate();
  const [sensInfo, setSensInfo] = useState<TfTypes>('T');
  const [savedSensInfo, setSavedSensInfo] = useState<TfTypes>('T');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const isModified = sensInfo !== savedSensInfo;

  useEffect(() => {
    if (!isToastVisible) return;

    const timerId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);

    return () => window.clearTimeout(timerId);
  }, [isToastVisible]);

  const handleBackClick = () => {
    if (isModified) {
      setIsToastVisible(true);
      return;
    }

    navigate('/settings');
  };

  const handleConsentToggleClick = () => {
    setSensInfo((prevSensInfo) => (prevSensInfo === 'T' ? 'F' : 'T'));
    setIsToastVisible(false);
  };

  const handleSaveClick = () => {
    setSavedSensInfo(sensInfo);
    setIsToastVisible(false);
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2 mt-[3.06rem]"
        title="민감정보 수집 동의 관리"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
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
          <h2 className="label mb-2 text-gray-8">동의 항목</h2>

          <div className="rounded-xl border border-gray-4 bg-beige-1 px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="label-semi text-gray-10">
                  생리·호르몬 데이터 수집
                </h3>
                <p className="caption mt-1 text-gray-7">
                  생리 기록 세부 항목에 관련 키트가 표시돼요
                </p>
                <p className="caption mt-1 text-orange-6">
                  동의함 · 2026.06.20
                </p>
              </div>

              <ToggleSwitch
                ariaLabel="생리·호르몬 데이터 수집 동의"
                isEnabled={sensInfo === 'T'}
                onClick={handleConsentToggleClick}
              />
            </div>
          </div>

          <p className="caption mt-2 flex items-start gap-1.5 text-gray-7">
            <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span className="caption">
              철회 시 관련 항목과 기존 기록 데이터가 삭제돼요
            </span>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="label mb-2 text-gray-8">수집되는 데이터</h2>

          <div className="caption rounded-xl border border-gray-4 bg-beige-1 px-4 py-3 text-gray-7">
            <p>· 생리·호르몬 상태 (없음 / 생리 중 / 호르몬 변화 있음)</p>
            <p className="mt-1">· 기록 날짜 및 시간</p>
          </div>

          <p className="caption mt-2 flex items-start gap-1.5 text-gray-7">
            <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <span className="caption">
              패턴 분석 보조 목적으로만 사용되며 제3자에게 제공되지 않아요
            </span>
          </p>
        </section>

        <div className="mt-auto pt-12">
          <Button text="저장하기" variant="primary" onClick={handleSaveClick} />
        </div>
      </main>

      {isToastVisible && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[398px] -translate-x-1/2 items-center gap-2 rounded-xl bg-orange-5 px-4 py-3 text-beige-1 shadow-md"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
          <span className="caption">저장하지 않고 나가면 수정되지 않아요!</span>
        </div>
      )}
    </div>
  );
};

export default SensitiveConsent;
