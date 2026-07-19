import Chip from '@/shared/components/Chip';
import { BOWEL_RHYTHM_OPTIONS } from '../../constants/loginConstants';
import type { BowelRhythmValueTypes } from '../../types/loginTypes';

// 프로필 입력 step2: 평소 배변 리듬(기준선) 선택
interface BowelRhythmStepPropTypes {
  value: BowelRhythmValueTypes | null;
  onChange: (value: BowelRhythmValueTypes) => void;
}

const BowelRhythmStep = ({ value, onChange }: BowelRhythmStepPropTypes) => {
  return (
    <div className="flex flex-col">
      <h2 className="display text-center text-gray-10">
        평소 <span className="text-orange-6">배변 리듬</span>이 어떻게 되세요?
      </h2>
      <p className="label mt-[0.38rem] text-center text-gray-7">
        입력하면 <span className="text-orange-6">더 정확한 기준선</span>을 만들
        수 있어요
      </p>

      <div className="mt-8 flex flex-col gap-2">
        {BOWEL_RHYTHM_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            text={option.label}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default BowelRhythmStep;
