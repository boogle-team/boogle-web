import { useRef, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileInfoRow from '@/pages/settings/components/ProfileInfoRow';
import SettingsBottomAction from '@/pages/settings/components/SettingsBottomAction';
import SettingsNotice from '@/pages/settings/components/SettingsNotice';
import SettingsQueryStatePage from '@/pages/settings/components/SettingsQueryStatePage';
import {
  AGE_GROUP_LABEL_MAP,
  BASELINE_TYPE_DETAIL_LABEL_MAP,
  GENDER_LABEL_MAP,
  NICKNAME_MAX_LENGTH,
} from '@/pages/settings/constants/settingsConstants';
import useProfileSettings from '@/pages/settings/hooks/useProfileSettings';
import Camera from '@/shared/assets/icons/camera.svg?react';
import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';
import Button from '@/shared/components/Button';
import InputText from '@/shared/components/InputText';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const {
    memberProfile,
    nicknameDraft,
    profileImagePreview,
    errorMessage,
    isLoading,
    isError,
    isSaving,
    updateNicknameDraft,
    selectProfileImage,
    resetProfileDraft,
    saveProfile,
    refetch,
  } = useProfileSettings();
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleBackClick = () => {
    resetProfileDraft();
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

  const isNicknameEmpty = !nicknameDraft.trim();
  const isNicknameTooLong = nicknameDraft.length > NICKNAME_MAX_LENGTH;

  const handleProfileImageClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];

    if (imageFile) {
      selectProfileImage(imageFile);
    }

    event.target.value = '';
  };

  const handleSaveClick = async () => {
    const trimmedNickname = nicknameDraft.trim();

    if (!trimmedNickname || isNicknameTooLong || isSaving) {
      return;
    }

    try {
      await saveProfile();
      resetProfileDraft();
      navigate('/settings');
    } catch {
      // 오류 문구는 프로필 상태 훅에서 사용자용 문구로 변환한다.
    }
  };

  const profileImage = profileImagePreview ?? memberProfile?.profileImage;
  const baselineTypeLabel = memberProfile?.baselineType
    ? BASELINE_TYPE_DETAIL_LABEL_MAP[memberProfile.baselineType]
    : '미설정';
  const ageGroupLabel = memberProfile?.ageGroup
    ? AGE_GROUP_LABEL_MAP[memberProfile.ageGroup]
    : '미설정';
  const genderLabel = memberProfile?.gender
    ? GENDER_LABEL_MAP[memberProfile.gender]
    : '미설정';

  if (isLoading || isError || !memberProfile) {
    return (
      <SettingsQueryStatePage
        title="프로필 수정"
        isLoading={isLoading}
        loadingMessage="프로필을 불러오고 있어요."
        errorMessage="프로필을 불러오지 못했어요."
        onBackButtonClick={handleBackClick}
        onRetryClick={() => void refetch()}
        topNavigationClassName="mt-[3.06rem] bg-beige-2 [&_svg]:h-4.5 [&_svg]:w-2.5"
        isBorderVisible={false}
      />
    );
  }

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
            <div className="flex h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-orange-3">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필 이미지 미리보기"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProfileFace className="h-20 w-20" />
              )}
            </div>

            <button
              type="button"
              aria-label="프로필 이미지 선택"
              onClick={handleProfileImageClick}
              className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
            >
              <Camera className="text-gray-7" />
            </button>
            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
        <div className="px-4">
          <div className="mt-8">
            <p className="body-m mb-2 px-2 leading-6 text-gray-8">닉네임</p>

            <InputText
              value={nicknameDraft}
              onChange={updateNicknameDraft}
              placeholder="닉네임을 입력해주세요"
              maxCount={NICKNAME_MAX_LENGTH}
              isError={isNicknameTooLong}
              errorMessage={`${NICKNAME_MAX_LENGTH}자 이내로 입력해주세요`}
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
                value={baselineTypeLabel}
                onClick={handleBowelRhythmClick}
              />
            </div>

            <div className="mt-2 divide-y divide-gray-4 overflow-hidden rounded-2xl border border-gray-4 bg-white">
              <ProfileInfoRow
                title="나이대"
                value={ageGroupLabel}
                onClick={handleAgeGroupClick}
              />

              <ProfileInfoRow
                title="성별"
                value={genderLabel}
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

          {errorMessage && (
            <p role="alert" className="caption mt-4 px-2 text-semantic-danger">
              {errorMessage}
            </p>
          )}

          <SettingsBottomAction>
            <Button
              text={isSaving ? '저장 중...' : '저장하기'}
              variant="primary"
              disabled={
                !memberProfile ||
                isNicknameEmpty ||
                isNicknameTooLong ||
                isSaving
              }
              onClick={handleSaveClick}
            />
          </SettingsBottomAction>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
