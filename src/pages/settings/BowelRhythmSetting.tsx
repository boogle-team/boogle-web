import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import useProfileSettings from './hooks/useProfileSettings';

import type { BaselineTypeTypes } from './types/settingsTypes';

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
  const { memberProfile, saveBaselineType } = useProfileSettings();
  const [selectedBaselineType, setSelectedBaselineType] =
    useState<BaselineTypeTypes>(memberProfile.baselineType);

  const handleOptionClick = (value: BaselineTypeTypes) => {
    setSelectedBaselineType(value);
  };

  const handleBackClick = () => {
    navigate('/settings/profile');
  };

  const handleSaveClick = () => {
    saveBaselineType(selectedBaselineType);
    navigate('/settings/profile');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="기준선 정보"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-6">
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
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full rounded-xl border py-[0.88rem] text-center transition-all duration-200 ease-in-out ${
                    isSelected
                      ? 'border-orange-7 bg-orange-1'
                      : 'border-gray-5 bg-beige-1'
                  }`}
                >
                  <p
                    className={`text-[0.875rem] font-semibold leading-[1.225rem] tracking-[-0.00109375rem] transition-colors duration-200 ease-in-out ${
                      isSelected ? 'text-orange-7' : 'text-gray-7'
                    }`}
                  >
                    {option.label}
                  </p>
                </button>
              );
            })}
          </section>
        </div>

        <div className="mt-auto pt-12">
          <Button text="저장하기" variant="primary" onClick={handleSaveClick} />
        </div>
      </main>
    </div>
  );
};

export default BowelRhythmSetting;
