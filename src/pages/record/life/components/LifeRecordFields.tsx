import DetailRecordLink from '@/pages/record/main/components/DetailRecordLink';

import {
  HYDRATION_OPTIONS,
  MEAL_REGULARITY_OPTIONS,
  SLEEP_OPTIONS,
  STRESS_OPTIONS,
} from '../constants/lifeRecordConstants';
import { useLifeRecordForm } from '../hooks/useLifeRecordForm';
import FoodField from './FoodField';
import MemoField from './MemoField';
import OptionChipField from './OptionChipField';

interface LifeRecordFieldsPropTypes {
  form: ReturnType<typeof useLifeRecordForm>;
  onDetailRecordLinkClick: () => void;
}

/** L-01(기본 입력)과 L-04(수정)가 동일하게 쓰는 입력 항목 묶음. */
const LifeRecordFields = ({
  form,
  onDetailRecordLinkClick,
}: LifeRecordFieldsPropTypes) => {
  const {
    formState,
    handleSleepChange,
    handleStressChange,
    handleMealRegularityChange,
    handleHydrationChange,
    handleFoodToggle,
    handleMemoChange,
  } = form;

  return (
    <>
      <OptionChipField
        title="수면"
        options={SLEEP_OPTIONS}
        value={formState.sleep}
        onChange={handleSleepChange}
      />

      <OptionChipField
        title="스트레스"
        options={STRESS_OPTIONS}
        value={formState.stress}
        onChange={handleStressChange}
      />

      <OptionChipField
        title="식사 규칙성"
        options={MEAL_REGULARITY_OPTIONS}
        value={formState.mealRegularity}
        onChange={handleMealRegularityChange}
      />

      <OptionChipField
        title="수분"
        options={HYDRATION_OPTIONS}
        value={formState.hydration}
        onChange={handleHydrationChange}
      />

      <FoodField value={formState.foods} onToggle={handleFoodToggle} />

      <MemoField value={formState.memo} onChange={handleMemoChange} />

      <DetailRecordLink
        description="수면시간 · 운동 · 카페인 · 약 등"
        onClick={onDetailRecordLinkClick}
      />
    </>
  );
};

export default LifeRecordFields;
