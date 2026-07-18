import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import InputText from '@/shared/components/InputText';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import ProfileInfoRow from './components/ProfileInfoRow';
import {
  AGE_GROUP_LABEL_MAP,
  BASELINE_TYPE_DETAIL_LABEL_MAP,
  GENDER_LABEL_MAP,
} from './constants/settingsConstants';
import useProfileSettings from './hooks/useProfileSettings';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';
import Camera from '@/shared/assets/icons/camera.svg?react';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { memberProfile } = useProfileSettings();

  const handleBackClick = () => {
    navigate('/settings');
  };

  const handleBowelRhythmClick = () => {
    navigate('/settings/bowel-rhythm');
  };

  const handleAgeGroupClick = () => {
    navigate('/settings/baseline-info');
  };

  const handleGenderClick = () => {
    navigate('/settings/baseline-info');
  };

  const [nickname, setNickname] = useState('땅콩잼');

  const handleNicknameChange = (value: string) => {
    if (value.length <= 10) {
      setNickname(value);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2"
        title="프로필 수정"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1">
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <div className="flex h-30 w-30 items-center justify-center rounded-full bg-orange-3">
              <ProfileFace className="h-20 w-20" />
            </div>

            <button
              type="button"
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
            >
              <Camera className="text-gray-7" />
            </button>
          </div>
        </div>
        <div className="px-4">
          <div className="mt-8">
            <p className="mb-2 body-m leading-6 text-gray-8">닉네임</p>

            <InputText
              value={nickname}
              onChange={handleNicknameChange}
              maxCount={10}
            />
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-gray-8">기준선 정보</span>
              <span className="text-[14px] text-orange-5">선택</span>
            </div>

            <div className="flex flex-col">
              <ProfileInfoRow
                title="평소 배변 리듬"
                value={
                  BASELINE_TYPE_DETAIL_LABEL_MAP[memberProfile.baselineType]
                }
                onClick={handleBowelRhythmClick}
              />
            </div>
            <div className="pt-2 flex flex-col">
              <ProfileInfoRow
                title="나이대"
                value={AGE_GROUP_LABEL_MAP[memberProfile.ageGroup]}
                onClick={handleAgeGroupClick}
              />

              <ProfileInfoRow
                title="성별"
                value={GENDER_LABEL_MAP[memberProfile.gender]}
                onClick={handleGenderClick}
              />
            </div>
          </div>

          <div className="mt-2 flex items-start gap-1.25 text-[0.75rem] font-medium text-gray-7">
            <WarningIcon className="h-[1rem] w-[1rem] shrink-0" />

            <div className="flex flex-col">
              <span>기준선 정보는 패턴 분석 초기값으로만 쓰여요.</span>
              <span>기록이 쌓이면 실제 데이터가 우선 반영돼요.</span>
            </div>
          </div>

          <div className="mt-20 mb-[3.69rem]">
            <Button text="저장하기" variant="primary" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
