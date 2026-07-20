import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import InputText from '@/shared/components/InputText';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import ProfileInfoRow from './components/ProfileInfoRow';
import SettingsBottomAction from './components/SettingsBottomAction';
import SettingsNotice from './components/SettingsNotice';
import {
  AGE_GROUP_LABEL_MAP,
  BASELINE_TYPE_DETAIL_LABEL_MAP,
  GENDER_LABEL_MAP,
} from './constants/settingsConstants';
import useProfileSettings from './hooks/useProfileSettings';

import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';
import Camera from '@/shared/assets/icons/camera.svg?react';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const {
    memberProfile,
    nicknameDraft,
    updateNicknameDraft,
    resetNicknameDraft,
    saveNickname,
  } = useProfileSettings();

  const handleBackClick = () => {
    resetNicknameDraft();
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

  const handleNicknameChange = (value: string) => {
    if (value.length <= 10) {
      updateNicknameDraft(value);
    }
  };

  const handleSaveClick = () => {
    const trimmedNickname = nicknameDraft.trim();

    if (!trimmedNickname) {
      return;
    }

    saveNickname(trimmedNickname);
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2 [&_svg]:h-4.5 [&_svg]:w-2.5"
        title="프로필 수정"
        onBackButtonClick={handleBackClick}
        isBorderVisible={false}
      />

      <main className="flex-1 bg-beige-1 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
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
            <p className="body-m mb-2 px-2 leading-6 text-gray-8">닉네임</p>

            <InputText
              value={nicknameDraft}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요"
              maxCount={10}
            />
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-baseline gap-2 px-2">
              <span className="text-gray-8">기준선 정보</span>
              <span className="text-[0.875rem] text-orange-5">선택</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-4 bg-white">
              <ProfileInfoRow
                title="평소 배변 리듬"
                value={
                  BASELINE_TYPE_DETAIL_LABEL_MAP[memberProfile.baselineType]
                }
                onClick={handleBowelRhythmClick}
              />
            </div>

            <div className="mt-2 divide-y divide-gray-4 overflow-hidden rounded-2xl border border-gray-4 bg-white">
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

          <SettingsNotice className="mt-2 px-2">
            <div className="flex flex-col">
              <span>기준선 정보는 패턴 분석 초기값으로만 쓰여요.</span>
              <span>기록이 쌓이면 실제 데이터가 우선 반영돼요.</span>
            </div>
          </SettingsNotice>

          <SettingsBottomAction>
            <Button
              text="저장하기"
              variant="primary"
              disabled={!nicknameDraft.trim()}
              onClick={handleSaveClick}
            />
          </SettingsBottomAction>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
