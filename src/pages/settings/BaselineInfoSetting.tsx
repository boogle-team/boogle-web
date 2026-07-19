import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import Chip from '@/shared/components/Chip';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import useProfileSettings from './hooks/useProfileSettings';

import type { AgeGroupTypes, GenderTypes } from './types/settingsTypes';

const AGE_GROUP_OPTIONS: {
  label: string;
  value: AgeGroupTypes;
}[] = [
  { label: '10대', value: 10 },
  { label: '20대', value: 20 },
  { label: '30대', value: 30 },
  { label: '40대 이상', value: 40 },
];

const GENDER_OPTIONS: {
  label: string;
  value: GenderTypes;
}[] = [
  { label: '여성', value: 'F' },
  { label: '남성', value: 'M' },
  { label: '선택 안함', value: 'N' },
];

const BaselineInfoSetting = () => {
  const navigate = useNavigate();
  const { memberProfile, saveBaselineInfo } = useProfileSettings();

  const [selectedAgeGroup, setSelectedAgeGroup] = useState(
    memberProfile.ageGroup,
  );
  const [selectedGender, setSelectedGender] = useState(memberProfile.gender);

  const handleBackClick = () => {
    navigate('/settings/profile');
  };

  const handleSaveClick = () => {
    saveBaselineInfo(selectedAgeGroup, selectedGender);
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
                  onClick={() => setSelectedAgeGroup(option.value)}
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
                  onClick={() => setSelectedGender(option.value)}
                />
              );
            })}
          </div>
        </section>

        <div className="mt-auto pt-12">
          <Button text="저장하기" variant="primary" onClick={handleSaveClick} />
        </div>
      </main>
    </div>
  );
};

export default BaselineInfoSetting;
