import type { ChangeEvent } from 'react';

import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';

import {
  PAIN_LEVEL_LABELS,
  PAIN_LEVEL_MAX,
} from '../constants/recordConstants';

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
    <section className="flex flex-col gap-2">
      <RecordSectionTitle title="복통 강도" />

      <div className="flex items-center justify-between">
        <span className="display-lg text-orange-6">{value}</span>
        <span className="caption-bold flex items-center justify-center gap-2.5 rounded-full bg-orange-1 px-4 py-1 text-orange-6">
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-orange-2 [&::-moz-range-thumb]:bg-orange-6 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-orange-2 [&::-webkit-slider-thumb]:bg-orange-6"
      />

      <div className="caption flex justify-between text-gray-6">
        {Array.from({ length: PAIN_LEVEL_MAX + 1 }, (_, level) => (
          <span key={level}>
            {level === 0 ? '없음' : level === PAIN_LEVEL_MAX ? '심함' : level}
          </span>
        ))}
      </div>
    </section>
  );
};

export default PainLevelField;
