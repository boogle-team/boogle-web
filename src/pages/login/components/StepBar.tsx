import { PROFILE_TOTAL_STEPS } from '../constants/loginConstants';

interface StepBarPropTypes {
  currentStep: number;
}

interface StepNodePropTypes {
  centerX: number;
  index: number;
  isActive: boolean;
}

interface StepLinePropTypes {
  startX: number;
  endX: number;
}

const ACTIVE_FLOWER_PATH =
  'M16.1709 3C18.9222 3.00011 21.2686 4.85023 22.1904 7.45215C24.9591 8.22101 26.9999 10.8528 27 13.9824C27 16.0779 26.0847 17.9507 24.6494 19.1904C24.6967 19.5016 24.7217 19.8205 24.7217 20.1455C24.7217 23.4922 22.1201 26.2059 18.9111 26.2061C17.6642 26.206 16.5099 25.7941 15.5635 25.0967C14.5805 26.2625 13.1406 26.9999 11.5352 27C8.57297 26.9998 6.17188 24.4947 6.17188 21.4053C6.17188 21.0416 6.20501 20.6861 6.26855 20.3418C4.32843 19.3479 3.00008 17.3297 3 15C3 12.6912 4.30401 10.6868 6.21582 9.68359C6.18649 9.48305 6.17188 9.27745 6.17188 9.06836C6.17196 6.83411 7.90848 5.02247 10.0508 5.02246C10.5231 5.02249 10.9759 5.11122 11.3945 5.27246C12.5727 3.87684 14.2764 3.00008 16.1709 3Z';

const INACTIVE_FLOWER_PATH =
  'M11.8779 6C13.9411 6 15.7009 7.387 16.3926 9.33789C18.4696 9.91425 20 11.8896 20 14.2373C19.9999 15.809 19.313 17.2129 18.2363 18.1426C18.2718 18.3761 18.292 18.6154 18.292 18.8594C18.2919 21.3694 16.3404 23.4043 13.9336 23.4043C12.9982 23.4043 12.1328 23.0954 11.4229 22.5723C10.6856 23.4468 9.60567 24 8.40137 24C6.17974 23.9998 4.37891 22.1208 4.37891 19.8037C4.37893 19.5309 4.40443 19.2642 4.45215 19.0059C2.9969 18.2605 2.00007 16.7474 2 15C2 13.2672 2.97966 11.7636 4.41504 11.0117C4.39311 10.8616 4.37892 10.7083 4.37891 10.5518C4.37891 8.87605 5.68137 7.51764 7.28809 7.51758C7.64207 7.51758 7.98017 7.5863 8.29395 7.70703C9.1776 6.65886 10.456 6.00012 11.8779 6Z';

const STEP_NODE_INDEXES = [1, 2, 3] as const;
const STEP_BAR_WIDTH = 129;
const STEP_BAR_HEIGHT = 30;
const STEP_NODE_SIZE = 30;
const ACTIVE_NODE_RADIUS = 14;
const INACTIVE_NODE_RADIUS = 11;
const STEP_TRANSITION_CLASS_NAME =
  'duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

const getStepNodeCenters = (currentStep: number) => {
  if (currentStep === 2) {
    return [11, 64, 117] as const;
  }

  if (currentStep === 3) {
    return [11, 61, 115] as const;
  }

  return [15, 68, 118] as const;
};

const getNodeRadius = (step: number, currentStep: number) => {
  return step === currentStep ? ACTIVE_NODE_RADIUS : INACTIVE_NODE_RADIUS;
};

const StepLine = ({ startX, endX }: StepLinePropTypes) => {
  const lineWidth = Math.max(endX - startX, 0);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${lineWidth} 4`}
      className={`absolute top-[0.8125rem] h-1 overflow-visible text-orange-2 transition-all ${STEP_TRANSITION_CLASS_NAME}`}
      style={{ left: startX, width: lineWidth }}
    >
      <line
        x1="0"
        y1="2"
        x2={lineWidth}
        y2="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
};

const StepNode = ({ centerX, index, isActive }: StepNodePropTypes) => {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-0 flex h-[1.875rem] w-[1.875rem] items-center justify-center transition-[left] ${STEP_TRANSITION_CLASS_NAME}`}
      style={{ left: centerX - STEP_NODE_SIZE / 2 }}
    >
      <svg
        viewBox="0 0 30 30"
        className={`absolute inset-0 text-orange-5 transition-[opacity,transform] ${STEP_TRANSITION_CLASS_NAME} ${
          isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <path
          d={ACTIVE_FLOWER_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinejoin="round"
          className="text-orange-2"
        />
        <path d={ACTIVE_FLOWER_PATH} fill="currentColor" />
      </svg>

      <svg
        viewBox="0 0 30 30"
        className={`absolute inset-0 text-beige-1 transition-[opacity,transform] ${STEP_TRANSITION_CLASS_NAME} ${
          isActive ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <g transform="translate(4 0)">
          <path
            d={INACTIVE_FLOWER_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            className="text-orange-2"
          />
          <path d={INACTIVE_FLOWER_PATH} fill="currentColor" />
        </g>
      </svg>

      <span
        className={`caption-bold pointer-events-none absolute inset-0 flex items-center justify-center transition-[color,transform] ${STEP_TRANSITION_CLASS_NAME} ${
          isActive ? 'scale-100 text-beige-1' : 'scale-90 text-orange-3'
        }`}
      >
        {index}
      </span>
    </span>
  );
};

const StepBar = ({ currentStep }: StepBarPropTypes) => {
  const normalizedCurrentStep = Math.min(
    Math.max(currentStep, 1),
    PROFILE_TOTAL_STEPS,
  );
  const stepNodeCenters = getStepNodeCenters(normalizedCurrentStep);

  return (
    <div className="flex justify-center pt-2">
      <div
        role="img"
        aria-label={`Profile input progress step ${normalizedCurrentStep} of ${PROFILE_TOTAL_STEPS}`}
        className="relative"
        style={{ width: STEP_BAR_WIDTH, height: STEP_BAR_HEIGHT }}
      >
        {STEP_NODE_INDEXES.slice(0, -1).map((step, order) => {
          const nextStep = step + 1;
          const startX =
            stepNodeCenters[order] + getNodeRadius(step, normalizedCurrentStep);
          const endX =
            stepNodeCenters[order + 1] -
            getNodeRadius(nextStep, normalizedCurrentStep);

          return (
            <StepLine key={`step-line-${step}`} startX={startX} endX={endX} />
          );
        })}

        {STEP_NODE_INDEXES.map((step, order) => (
          <StepNode
            key={step}
            centerX={stepNodeCenters[order]}
            index={step}
            isActive={step === normalizedCurrentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default StepBar;
