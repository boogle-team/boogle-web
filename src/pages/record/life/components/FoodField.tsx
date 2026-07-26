import { FOOD_OPTIONS } from '../constants/lifeRecordConstants';
import type { FoodTypes } from '../types/lifeRecordTypes';
import FoodChip from './FoodChip';
import LifeSectionTitle from './LifeSectionTitle';

const FIELD_TITLE = '오늘 먹은 것';

interface FoodFieldPropTypes {
  value: FoodTypes[];
  onToggle: (food: FoodTypes) => void;
}

const FoodField = ({ value, onToggle }: FoodFieldPropTypes) => {
  return (
    <section className="flex flex-col gap-[0.62rem]">
      <LifeSectionTitle title={FIELD_TITLE} guideText="중복 선택 가능" />

      {/* 390px 기준 셀 폭이 스펙(7.29169rem)과 일치하고, 그 외 화면에선 3열을 유지한 채 늘고 줄어든다. */}
      <div
        role="group"
        aria-label={FIELD_TITLE}
        className="grid grid-cols-3 gap-1"
      >
        {FOOD_OPTIONS.map(({ value: food, label, description, Icon }) => (
          <FoodChip
            key={food}
            label={label}
            description={description}
            Icon={Icon}
            isSelected={value.includes(food)}
            onClick={() => onToggle(food)}
          />
        ))}
      </div>
    </section>
  );
};

export default FoodField;
