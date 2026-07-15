import { PROFILE_TOTAL_STEPS } from '../constants/loginConstants';

// 다단계 진행 표시 바. 꽃모양 노드 + 점선 연결.
// step 개수/현재 step만 받는 순수 컴포넌트라 다른 다단계 플로우에서도 재사용 가능.
interface StepBarPropTypes {
  currentStep: number;
  totalSteps?: number;
}

// 꽃모양 노드 하나
interface StepNodePropTypes {
  index: number;
  isActive: boolean;
}

const StepNode = ({ index, isActive }: StepNodePropTypes) => {
  const flowerColor = isActive ? 'text-orange-6' : 'text-orange-2';
  const numberColor = isActive ? 'text-beige-1' : 'text-orange-3';

  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
      {/* TODO: figma 꽃모양 노드 SVG 추출 후 교체 */}
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={`h-full w-full ${flowerColor}`}
        fill="currentColor"
      >
        <path d="M16 2c2 0 3.6 1.4 4 3.3C21.7 4 24 4.3 25.4 5.7c1.4 1.4 1.7 3.7.4 5.4C27.6 11.4 29 13 29 15s-1.4 3.6-3.2 4c1.3 1.7 1 4-.4 5.4-1.4 1.4-3.7 1.7-5.4.4C19.6 26.6 18 28 16 28s-3.6-1.4-4-3.2c-1.7 1.3-4 1-5.4-.4-1.4-1.4-1.7-3.7-.4-5.4C4.4 18.6 3 17 3 15s1.4-3.6 3.3-4C5 9.4 5.3 7.1 6.7 5.7 8.1 4.3 10.4 4 12 5.3 12.4 3.4 14 2 16 2Z" />
      </svg>
      <span
        className={`caption-bold absolute inset-0 flex items-center justify-center ${numberColor}`}
      >
        {index}
      </span>
    </span>
  );
};

const StepBar = ({
  currentStep,
  totalSteps = PROFILE_TOTAL_STEPS,
}: StepBarPropTypes) => {
  const steps = Array.from({ length: totalSteps }, (_, order) => order + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {steps.map((step, order) => {
        const isLast = order === steps.length - 1;

        return (
          <div key={step} className="flex items-center gap-2">
            <StepNode index={step} isActive={step === currentStep} />
            {!isLast && (
              <span className="h-0 w-6 border-t border-dashed border-orange-3" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepBar;
