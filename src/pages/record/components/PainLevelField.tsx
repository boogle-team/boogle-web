import type { ChangeEvent } from 'react';

import {
  PAIN_LEVEL_LABELS,
  PAIN_LEVEL_MAX,
} from '../constants/record.constants';
import RecordSectionTitle from './RecordSectionTitle';

interface PainLevelFieldPropTypes {
  value: number;
  onChange: (value: number) => void;
}

const PainLevelField = ({ value, onChange }: PainLevelFieldPropTypes) => {
  const percentage = (value / PAIN_LEVEL_MAX) * 100;

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title="복통 강도" />

      <div className="flex items-center justify-between">
        <span className="display-lg text-orange-6">{value}</span>
        <span
          className={`caption-bold rounded-lg px-3 py-1.5 ${
            value > 0 ? 'bg-orange-1 text-orange-6' : 'bg-gray-3 text-gray-6'
          }`}
        >
          {PAIN_LEVEL_LABELS[value]}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={PAIN_LEVEL_MAX}
        step={1}
        value={value}
        onChange={handleSliderChange}
        style={{
          background: `linear-gradient(to right, var(--color-orange-6) ${percentage}%, var(--color-gray-4) ${percentage}%)`,
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-orange-6 [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-6 [&::-webkit-slider-thumb]:shadow-sm"
      />

      <div className="caption flex justify-between text-gray-6">
        <span>없음</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>심함</span>
      </div>
    </section>
  );
};

export default PainLevelField;
