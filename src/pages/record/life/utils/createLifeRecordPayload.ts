import type {
  PostLifeRecordRequestTypes,
} from '../types/lifeRecordApiTypes';
import {
  FOOD_ID_BY_VALUE,
  MEAL_REGULAR_CODE_BY_VALUE,
  SLEEP_CODE_BY_VALUE,
  STRESS_CODE_BY_VALUE,
  WATER_CODE_BY_VALUE,
  WATER_INTAKE_BY_VALUE,
} from '../types/lifeRecordApiTypes';
import type { LifeRecordFormStateTypes } from '../types/lifeRecordTypes';

interface CreateLifeRecordPayloadParamTypes {
  formState: LifeRecordFormStateTypes;
  recordDate: string;
  tagNames?: string[];
}

export const createLifeRecordPayload = ({
  formState,
  recordDate,
  tagNames = [],
}: CreateLifeRecordPayloadParamTypes): PostLifeRecordRequestTypes | null => {
  const { foods, hydration, mealRegularity, memo, sleep, stress } = formState;

  if (!sleep || !stress || !hydration || !mealRegularity || foods.length === 0) {
    return null;
  }

  const trimmedMemo = memo.trim();

  return {
    regDate: recordDate,
    sleep: SLEEP_CODE_BY_VALUE[sleep],
    stress: STRESS_CODE_BY_VALUE[stress],
    water: WATER_CODE_BY_VALUE[hydration],
    waterIntake: WATER_INTAKE_BY_VALUE[hydration],
    mealRegular: MEAL_REGULAR_CODE_BY_VALUE[mealRegularity],
    memo: trimmedMemo || undefined,
    tagNames,
    foodIds: foods.map((food) => FOOD_ID_BY_VALUE[food]),
  };
};
