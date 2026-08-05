import Button from '@/shared/components/Button';
import ProfileComplete from './components/ProfileComplete';
import StepLayout from './components/StepLayout';
import AgeGenderStep from './components/steps/AgeGenderStep';
import BowelRhythmStep from './components/steps/BowelRhythmStep';
import MenstrualCycleStep from './components/steps/MenstrualCycleStep';
import NicknameStep from './components/steps/NicknameStep';
import useProfileInput from './hooks/useProfileInput';
import type { ProfileInputValueTypes } from './types/loginTypes';

interface ProfileInputPagePropTypes {
  onComplete: (value: ProfileInputValueTypes) => void;
  onBackToSocial: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const ProfileInputPage = ({
  onComplete,
  onBackToSocial,
  isSubmitting = false,
  errorMessage = null,
}: ProfileInputPagePropTypes) => {
  const {
    step,
    isCompleted,
    nickname,
    profileImagePreviewUrl,
    profileImageErrorMessage,
    bowelRhythm,
    ageGroup,
    gender,
    isMenstrualCycleStepVisible,
    isNicknameValid,
    isProfileImageValid,
    isAgeGenderValid,
    setNickname,
    setBowelRhythm,
    setAgeGroup,
    setGender,
    handleNextButtonClick,
    handleBackButtonClick,
    handleProfileImageChange,
    handleAgeGenderNextButtonClick,
    handleMenstrualCycleAgreeButtonClick,
    handleMenstrualCycleSkipButtonClick,
    handleGoHomeButtonClick,
  } = useProfileInput({ onComplete, onBackToSocial });

  if (isCompleted) {
    return (
      <ProfileComplete
        onGoHome={handleGoHomeButtonClick}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    );
  }

  if (isMenstrualCycleStepVisible) {
    return (
      <StepLayout
        title="기준선 설정"
        currentStep={3}
        onBackButtonClick={handleBackButtonClick}
        footer={
          <div className="flex flex-col gap-3">
            <p className="caption text-center text-[#999999]">
              언제든 설정에서 변경할 수 있어요
            </p>
            <Button
              text="동의하고 기록할게요"
              onClick={handleMenstrualCycleAgreeButtonClick}
            />
            <Button
              text="괜찮아요, 건너뛸게요"
              variant="neutral"
              onClick={handleMenstrualCycleSkipButtonClick}
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
            onClick={handleNextButtonClick}
            disabled={!isNicknameValid || !isProfileImageValid}
          />
        }
      >
        <NicknameStep
          nickname={nickname}
          onNicknameChange={setNickname}
          profileImageUrl={profileImagePreviewUrl}
          profileImageErrorMessage={profileImageErrorMessage}
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
          <Button
            text="다음"
            onClick={handleNextButtonClick}
            disabled={!bowelRhythm}
          />
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
