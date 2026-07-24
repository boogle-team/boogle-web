import StepperPlusIcon from '@/shared/assets/illustrations/record/stepper/stepperPlus.svg?react';
import StepperSubtractIcon from '@/shared/assets/illustrations/record/stepper/stepperSubtract.svg?react';
import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';

import {
  MAX_WATER_INTAKE,
  MIN_WATER_INTAKE,
  WATER_INTAKE_MARKS,
} from '../constants/lifeDetailRecordConstants';
import LifeSectionTitle from './LifeSectionTitle';

interface WaterIntakeFieldPropTypes {
  value: number;
  onChange: (waterIntake: number) => void;
}

const WaterIntakeField = ({ value, onChange }: WaterIntakeFieldPropTypes) => {
  const filledRatio =
    ((value - MIN_WATER_INTAKE) / (MAX_WATER_INTAKE - MIN_WATER_INTAKE)) * 100;

  const handleDecreaseClick = () => {
    onChange(Math.max(value - 1, MIN_WATER_INTAKE));
  };

  const handleIncreaseClick = () => {
    onChange(Math.min(value + 1, MAX_WATER_INTAKE));
  };

  return (
    <section className="flex flex-col">
      <LifeSectionTitle title="물 섭취량" />

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-end gap-1">
          <span className="display-lg w-7 text-center text-orange-6">
            {value}
          </span>
          <span className="label flex h-7.25 w-3.25 flex-col justify-center text-center text-gray-7">
            잔
          </span>
        </div>

        <div className="flex">
          <button
            type="button"
            onClick={handleDecreaseClick}
            disabled={value <= MIN_WATER_INTAKE}
            aria-label="물 섭취량 한 잔 줄이기"
            className="hover:not-disabled:cursor-pointer disabled:cursor-not-allowed"
          >
            <StepperSubtractIcon className="h-7 w-11" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleIncreaseClick}
            disabled={value >= MAX_WATER_INTAKE}
            aria-label="물 섭취량 한 잔 늘리기"
            className="hover:not-disabled:cursor-pointer disabled:cursor-not-allowed"
          >
            <StepperPlusIcon className="h-7 w-11" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 값 조절은 스테퍼로만 하고, 막대는 현재 값을 보여주기만 한다. */}
      <div
        role="presentation"
        className="mt-5 h-2 w-full overflow-hidden rounded-full bg-gray-3"
      >
        <div
          className="h-full rounded-full bg-orange-2 transition-[width] duration-150 ease-out"
          style={{ width: `${filledRatio}%` }}
        />
      </div>

      <div aria-hidden="true" className="mt-2 flex justify-between">
        {WATER_INTAKE_MARKS.map((mark) => (
          <span
            key={mark.value}
            className={`caption-bold w-7 text-center ${
              value >= mark.value ? 'text-orange-6' : 'text-gray-6'
            }`}
          >
            {mark.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1">
        <WarningIcon
          className="h-4 w-4 shrink-0 text-gray-6"
          aria-hidden="true"
        />

        <span className="caption text-gray-7">
          1잔 = 종이컵 1잔(약 200ml) 기준
        </span>
      </div>
    </section>
  );
};

export default WaterIntakeField;
