import Button from '@/shared/components/Button';
import { useEffect, useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import useLottieAnimationData from '@/pages/login/hooks/useLottieAnimationData';

const ONBOARDING_ANIMATION_SPEED = 0.6;
const ONBOARDING_ANIMATION_PATH = '/lottie/onboardingAnimation.json';

// 스플래시 다음에 뜨는 온보딩 화면: 카피 + 일러스트 + 시작하기 버튼
interface OnboardingPropTypes {
  onStart: () => void;
}

const Onboarding = ({ onStart }: OnboardingPropTypes) => {
  const onboardingLottieRef = useRef<LottieRefCurrentProps>(null);
  const { animationData } = useLottieAnimationData(ONBOARDING_ANIMATION_PATH);

  const handleOnboardingAnimationDomLoaded = () => {
    onboardingLottieRef.current?.setSpeed(ONBOARDING_ANIMATION_SPEED);
  };

  useEffect(() => {
    onboardingLottieRef.current?.setSpeed(ONBOARDING_ANIMATION_SPEED);
  }, [animationData]);

  return (
    <div className="flex min-h-dvh flex-col bg-beige-4 px-layout pb-[calc(var(--onboarding-bottom-padding)+var(--safe-area-bottom))] pt-[calc(var(--onboarding-top-padding)+var(--safe-area-top))]">
      <h1 className="display-lg text-center text-gray-10">
        기록으로 시작하는
        <br />
        나만의 <span className="text-orange-7">장 컨디션 관리</span>
      </h1>
      <p className="body-m mt-4 text-center text-gray-7">
        매일의 부글·생활 기록이 쌓이면, 나의 패턴이 보여요
      </p>

      <div className="flex flex-1 items-center justify-center">
        {animationData !== null && (
          <Lottie
            lottieRef={onboardingLottieRef}
            animationData={animationData}
            className="w-[24rem]"
            loop={true}
            autoplay
            onDOMLoaded={handleOnboardingAnimationDomLoaded}
          />
        )}
      </div>

      <Button text="시작하기" onClick={onStart} />
    </div>
  );
};

export default Onboarding;
