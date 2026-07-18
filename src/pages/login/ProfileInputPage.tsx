import { useState } from 'react';

import Button from '@/shared/components/Button';
import ProfileComplete from './components/ProfileComplete';
import StepLayout from './components/StepLayout';
import AgeGenderStep from './components/steps/AgeGenderStep';
import BowelRhythmStep from './components/steps/BowelRhythmStep';
import MenstrualCycleStep from './components/steps/MenstrualCycleStep';
import NicknameStep from './components/steps/NicknameStep';
import {
  NICKNAME_MAX_LENGTH,
  PROFILE_TOTAL_STEPS,
} from './constants/loginConstants';
import type {
  AgeGroupValueTypes,
  BowelRhythmValueTypes,
  GenderValueTypes,
  ProfileInputValueTypes,
  ProfileStepTypes,
} from './types/loginTypes';

// 프로필 입력 3스텝 플로우. 완료 시 onComplete(수집 데이터) 호출.
interface ProfileInputPagePropTypes {
  onComplete: (value: ProfileInputValueTypes) => void;
  onBackToSocial: () => void;
}

const ProfileInputPage = ({
  onComplete,
  onBackToSocial,
}: ProfileInputPagePropTypes) => {
  const [step, setStep] = useState<ProfileStepTypes>(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bowelRhythm, setBowelRhythm] = useState<BowelRhythmValueTypes | null>(
    null,
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroupValueTypes | null>(null);
  const [gender, setGender] = useState<GenderValueTypes | null>(null);
  const [isMenstrualCycleStepVisible, setIsMenstrualCycleStepVisible] =
    useState(false);
  const [shouldTrackMenstrualCycle, setShouldTrackMenstrualCycle] =
    useState(false);

  const isNicknameValid =
    nickname.trim().length > 0 && nickname.length <= NICKNAME_MAX_LENGTH;
  const isAgeGenderValid = Boolean(ageGroup && gender);

  const goToNextStep = () => {
    setStep((prev) =>
      prev < PROFILE_TOTAL_STEPS ? ((prev + 1) as ProfileStepTypes) : prev,
    );
  };

  const handleBackButtonClick = () => {
    if (isMenstrualCycleStepVisible) {
      setIsMenstrualCycleStepVisible(false);
      return;
    }

    if (step === 1) {
      onBackToSocial();
      return;
    }

    setStep((prev) => (prev - 1) as ProfileStepTypes);
  };

  const handleProfileImageChange = (file: File) => {
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const completeInput = (shouldTrack: boolean) => {
    setShouldTrackMenstrualCycle(shouldTrack);
    setIsCompleted(true);
  };

  const handleAgeGenderNextButtonClick = () => {
    if (gender === 'male') {
      completeInput(false);
      return;
    }

    setIsMenstrualCycleStepVisible(true);
  };

  const handleGoHome = () => {
    onComplete({
      nickname,
      profileImageUrl,
      bowelRhythm,
      ageGroup,
      gender,
      shouldTrackMenstrualCycle,
    });
  };

  if (isCompleted) {
    return <ProfileComplete onGoHome={handleGoHome} />;
  }

  if (isMenstrualCycleStepVisible) {
    return (
      <StepLayout
        title="기준선 설정"
        currentStep={3}
        onBackButtonClick={handleBackButtonClick}
        footer={
          <div className="flex flex-col gap-3">
            <p className="caption text-center text-gray-6">
              언제든 설정에서 변경할 수 있어요
            </p>
            <Button
              text="동의하고 기록할게요"
              onClick={() => completeInput(true)}
            />
            <Button
              text="괜찮아요, 건너뛸게요"
              variant="neutral"
              onClick={() => completeInput(false)}
            />
          </div>
        }
      >
        <MenstrualCycleStep />
      </StepLayout>
    );
  }

  if (step === 1) {
    return (
      <StepLayout
        title="프로필 입력"
        currentStep={1}
        onBackButtonClick={handleBackButtonClick}
        footer={
          <Button
            text="다음"
            onClick={goToNextStep}
            disabled={!isNicknameValid}
          />
        }
      >
        <NicknameStep
          nickname={nickname}
          onNicknameChange={setNickname}
          profileImageUrl={profileImageUrl}
          onProfileImageChange={handleProfileImageChange}
        />
      </StepLayout>
    );
  }

  if (step === 2) {
    return (
      <StepLayout
        title="기준선 설정"
        currentStep={2}
        onBackButtonClick={handleBackButtonClick}
        footer={
          <Button text="다음" onClick={goToNextStep} disabled={!bowelRhythm} />
        }
      >
        <BowelRhythmStep value={bowelRhythm} onChange={setBowelRhythm} />
      </StepLayout>
    );
  }

  return (
    <StepLayout
      title="기준선 설정"
      currentStep={3}
      onBackButtonClick={handleBackButtonClick}
      footer={
        <Button
          text="다음"
          onClick={handleAgeGenderNextButtonClick}
          disabled={!isAgeGenderValid}
        />
      }
    >
      <AgeGenderStep
        ageGroup={ageGroup}
        gender={gender}
        onAgeGroupChange={setAgeGroup}
        onGenderChange={setGender}
      />
    </StepLayout>
  );
};

export default ProfileInputPage;
