import { useMemo } from 'react';

import { useLifeRecordDraftStore } from '../stores/lifeRecordDraftStore';
import type {
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
  };
};
