import { useMemo } from 'react';

import { useLifeRecordDraftStore } from '../stores/lifeRecordDraftStore';
import type {
  FoodTypes,
  HydrationTypes,
  MealRegularityTypes,
  SleepTypes,
  StressTypes,
} from '../types/lifeRecordTypes';

export const useLifeRecordForm = () => {
  const formState = useLifeRecordDraftStore((state) => state.formState);
  const updateLifeRecord = useLifeRecordDraftStore(
    (state) => state.updateLifeRecord,
  );

  const handleSleepChange = (sleep: SleepTypes) => {
    updateLifeRecord({ sleep });
  };

  const handleStressChange = (stress: StressTypes) => {
    updateLifeRecord({ stress });
  };

  const handleMealRegularityChange = (mealRegularity: MealRegularityTypes) => {
    updateLifeRecord({ mealRegularity });
  };

  const handleHydrationChange = (hydration: HydrationTypes) => {
    updateLifeRecord({ hydration });
  };

  // '오늘 먹은 것'은 중복 선택이라 이미 담긴 값을 다시 누르면 해제한다.
  const handleFoodToggle = (food: FoodTypes) => {
    const { foods } = formState;
    const nextFoods = foods.includes(food)
      ? foods.filter((selectedFood) => selectedFood !== food)
      : [...foods, food];

    updateLifeRecord({ foods: nextFoods });
  };

  const handleMemoChange = (memo: string) => {
    updateLifeRecord({ memo });
  };

  // 특이 사항 메모를 제외한 나머지가 모두 채워져야 완료할 수 있다.
  const isSubmittable = useMemo(() => {
    const { sleep, stress, mealRegularity, hydration, foods } = formState;

    return (
      sleep !== null &&
      stress !== null &&
      mealRegularity !== null &&
      hydration !== null &&
      foods.length > 0
    );
  }, [formState]);

  return {
    formState,
    isSubmittable,
    handleSleepChange,
    handleStressChange,
    handleMealRegularityChange,
    handleHydrationChange,
    handleFoodToggle,
    handleMemoChange,
  };
};
