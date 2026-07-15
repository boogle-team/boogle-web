import Button from '@/shared/components/Button';

// 스플래시 다음에 뜨는 온보딩 화면: 카피 + 일러스트 + 시작하기 버튼
interface OnboardingPropTypes {
  onStart: () => void;
}

const Onboarding = ({ onStart }: OnboardingPropTypes) => {
  return (
    <div className="flex min-h-dvh flex-col bg-beige-6 px-layout pb-[3.69rem] pt-[7.5rem]">
      <h1 className="display-lg text-center text-gray-9">
        기록으로 시작하는
        <br />
        나만의 <span className="text-orange-6">장 컨디션 관리</span>
      </h1>
      <p className="body-m mt-4 text-center text-gray-7">
        매일의 부글·생활 기록이 쌓이면, 나의 패턴이 보여요
      </p>

      {/* TODO: figma 캐릭터 궤도 일러스트 SVG 추출 후 교체 */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-2 border-dashed border-orange-2">
          <span className="absolute -left-3 top-6 h-10 w-10 rounded-full bg-orange-5" />
          <span className="absolute right-2 top-2 h-8 w-8 rounded-full bg-orange-2" />
          <span className="absolute -right-3 top-1/2 h-9 w-9 rounded-full bg-orange-5" />
          <span className="absolute bottom-6 -left-2 h-8 w-8 rounded-full bg-orange-2" />
          <span className="absolute bottom-0 left-1/3 h-9 w-9 rounded-full bg-orange-5" />

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-6">
            <svg viewBox="0 0 48 40" className="h-10 w-14" aria-hidden="true">
              <circle cx="14" cy="12" r="3.5" fill="#ffffff" />
              <circle cx="34" cy="12" r="3.5" fill="#ffffff" />
              <path
                d="M16 24c2.5 3.5 13.5 3.5 16 0"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      <Button text="시작하기" onClick={onStart} />
    </div>
  );
};

export default Onboarding;
