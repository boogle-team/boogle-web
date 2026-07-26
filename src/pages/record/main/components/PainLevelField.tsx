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

// 썸 전체 지름(rem). 안쪽 필 20px + 링 4px이 바깥으로 둘러 총 28px.
// 눈금 라벨 위치 계산이 이 값에 의존하므로 썸 크기를 바꾸면 함께 수정한다.
const THUMB_SIZE = 1.75;
const THUMB_RING = 0.25;
const TRACK_HEIGHT = 0.5;

// 안쪽 필은 트랙보다 아래로 더 내려온다. 그 차이만큼 라벨을 밀어야
// section의 gap(0.5rem)이 트랙이 아닌 필 기준 간격이 된다.
const LABEL_TOP_OFFSET = (THUMB_SIZE - THUMB_RING * 2 - TRACK_HEIGHT) / 2;

const PainLevelField = ({ value, onChange }: PainLevelFieldPropTypes) => {
  const percentage = (value / PAIN_LEVEL_MAX) * 100;

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <section className="flex flex-col gap-2">
      <RecordSectionTitle title="복통 강도" />

      <div className="flex items-center justify-between">
        {/* 숫자 중심을 첫 눈금('없음') 중심에 맞춘다. relative/translate라 flex 배치는 그대로 유지된다. */}
        <span
          className="display-lg relative -translate-x-1/2 text-orange-6"
          style={{ left: `${THUMB_SIZE / 2}rem` }}
        >
          {value}
        </span>
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-orange-2 [&::-moz-range-thumb]:bg-orange-6 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-orange-2 [&::-webkit-slider-thumb]:bg-orange-6"
      />

      <div
        className="caption relative h-[1.05rem] text-gray-6"
        style={{ marginTop: `${LABEL_TOP_OFFSET}rem` }}
      >
        {Array.from({ length: PAIN_LEVEL_MAX + 1 }, (_, level) => (
          <span
            key={level}
            className={`absolute -translate-x-1/2 ${
              level === value ? 'text-orange-6' : ''
            }`}
            style={{
              left: `calc(${THUMB_SIZE / 2}rem + (100% - ${THUMB_SIZE}rem) * ${level / PAIN_LEVEL_MAX})`,
            }}
          >
            {level === 0 ? '없음' : level === PAIN_LEVEL_MAX ? '심함' : level}
          </span>
        ))}
      </div>
    </section>
  );
};

export default PainLevelField;
