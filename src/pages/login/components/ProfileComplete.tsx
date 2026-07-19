import Button from '@/shared/components/Button';
import OnboardingCompleteCharacter from '@/shared/assets/illustrations/onboardingCompleteCharacter.svg?react';

// 프로필 입력 완료 화면: 캐릭터 + 완료 문구 + 홈 이동 버튼
interface ProfileCompletePropTypes {
  onGoHome: () => void;
}

const ProfileComplete = ({ onGoHome }: ProfileCompletePropTypes) => {
  return (
    <div className="flex min-h-dvh flex-col bg-beige-5 px-layout pb-[3.69rem]">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative">
          <OnboardingCompleteCharacter className="animate-complete-character h-47 w-47" />
        </div>

        <h1 className="display-lg animate-complete-content mt-8 text-center text-gray-10 [animation-delay:300ms]">
          프로필 입력이 완료되었어요
        </h1>
        <p className="label animate-complete-content mt-3 text-center text-gray-7 [animation-delay:450ms]">
          장건강 관리를 함께 시작해 볼까요?
        </p>
      </div>

      <Button text="홈으로 이동" onClick={onGoHome} />
    </div>
  );
};

export default ProfileComplete;
