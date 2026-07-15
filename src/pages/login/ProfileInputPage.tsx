import { useState } from 'react';

import Button from '@/shared/components/Button';
import ProfileComplete from './components/ProfileComplete';
import StepLayout from './components/StepLayout';
import BowelRhythmStep from './components/steps/BowelRhythmStep';
import MenstrualCycleStep from './components/steps/MenstrualCycleStep';
import NicknameStep from './components/steps/NicknameStep';
import { PROFILE_TOTAL_STEPS } from './constants/loginConstants';
import type {
  BowelRhythmValueTypes,
  ProfileInputValueTypes,
  ProfileStepTypes,
} from './types/loginTypes';

// 프로필 입력 3스텝 플로우. 완료 시 onComplete(수집 데이터) 호출.
interface ProfileInputPagePropTypes {
  onComplete: (value: ProfileInputValueTypes) => void;
}

const ProfileInputPage = ({ onComplete }: ProfileInputPagePropTypes) => {
  const [step, setStep] = useState<ProfileStepTypes>(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bowelRhythm, setBowelRhythm] =
    useState<BowelRhythmValueTypes | null>(null);

  const goToNextStep = () => {
    setStep((prev) => (prev < PROFILE_TOTAL_STEPS ? ((prev + 1) as ProfileStepTypes) : prev));
  };

  const handleBackButtonClick = () => {
    if (step === 1) {
      window.history.back();
      return;
    }
    setStep((prev) => (prev - 1) as ProfileStepTypes);
  };

  const handleProfileImageChange = (file: File) => {
    setProfileImageUrl(URL.createObjectURL(file));
  };

  // 마지막 스텝에서 동의/스킵 → 완료 화면으로 전환 (수집값은 보관)
  const [shouldTrackMenstrualCycle, setShouldTrackMenstrualCycle] =
    useState(false);

  const completeInput = (shouldTrack: boolean) => {
    setShouldTrackMenstrualCycle(shouldTrack);
    setIsCompleted(true);
  };

  const handleGoHome = () => {
    onComplete({
      nickname,
      profileImageUrl,
      bowelRhythm,
      shouldTrackMenstrualCycle,
    });
  };

  if (isCompleted) {
    return <ProfileComplete onGoHome={handleGoHome} />;
  }

  if (step === 1) {
    return (
      <StepLayout
        title="프로필 입력"
        currentStep={1}
        onBackButtonClick={handleBackButtonClick}
        footer={
          <Button text="다음" onClick={goToNextStep} disabled={!nickname.trim()} />
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
        <div className="flex flex-col gap-3">
          <p className="caption text-center text-gray-6">
            언제든 설정에서 변경할 수 있어요
          </p>
          <Button text="동의하고 기록할게요" onClick={() => completeInput(true)} />
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
};

export default ProfileInputPage;
