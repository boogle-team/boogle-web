import { MIN_WATER_INTAKE } from '../constants/lifeDetailRecordConstants';
import type { LifeDetailRecordFormStateTypes } from '../types/lifeDetailRecordTypes';
import type {
  PatchLifeRecordRequestTypes,
  PostLifeRecordRequestTypes,
} from '../types/lifeRecordApiTypes';
import {
  CAFFEINE_CODE_BY_VALUE,
  EXERCISE_CODE_BY_VALUE,
  HORMONE_CODE_BY_VALUE,
  MEAL_REGULAR_CODE_BY_VALUE,
  OUTING_CODE_BY_VALUE,
  SLEEP_CODE_BY_VALUE,
  SLEEP_TIME_BY_VALUE,
  STRESS_CODE_BY_VALUE,
  WATER_CODE_BY_VALUE,
} from '../types/lifeRecordApiTypes';
import type { LifeRecordFormStateTypes } from '../types/lifeRecordTypes';
import type {
  FoodIdByValueTypes,
  MedicineIdByValueTypes,
} from './lifeRecordItemMapper';

interface CreateLifeRecordPayloadParamTypes {
  formState: LifeRecordFormStateTypes;
  foodIdByValue: FoodIdByValueTypes;
  isSensitiveInfoConsented?: boolean;
  medicineIdByValue: MedicineIdByValueTypes;
  recordDate: string;
  tagNames?: string[];
}

interface CreateLifeRecordPatchPayloadParamTypes extends Omit<
  CreateLifeRecordPayloadParamTypes,
  'isSensitiveInfoConsented' | 'recordDate' | 'tagNames'
> {
  tagNames: string[];
}

type CompleteLifeDetailRecordTypes = LifeDetailRecordFormStateTypes & {
  caffeine: NonNullable<LifeDetailRecordFormStateTypes['caffeine']>;
  exercise: NonNullable<LifeDetailRecordFormStateTypes['exercise']>;
  outing: NonNullable<LifeDetailRecordFormStateTypes['outing']>;
  sleepDuration: NonNullable<LifeDetailRecordFormStateTypes['sleepDuration']>;
};

const isCompleteDetailRecord = (
  detailRecord: LifeDetailRecordFormStateTypes | null,
  isSensitiveInfoConsented: boolean,
): detailRecord is CompleteLifeDetailRecordTypes => {
  if (!detailRecord) return false;

  const { caffeine, exercise, medicines, menstruation, outing, sleepDuration } =
    detailRecord;

  return (
    sleepDuration !== null &&
    exercise !== null &&
    caffeine !== null &&
    medicines.length > 0 &&
    outing !== null &&
    (!isSensitiveInfoConsented || menstruation !== null)
  );
};

const getSelectedItemIds = <T extends string>(
  selectedValues: T[],
  itemIdByValue: Partial<Record<T, number>>,
) => {
  const selectedItemIds = selectedValues.map(
    (selectedValue) => itemIdByValue[selectedValue],
  );

  return selectedItemIds.every(
    (selectedItemId): selectedItemId is number =>
      typeof selectedItemId === 'number',
  )
    ? selectedItemIds
    : null;
};

export const createLifeRecordPayload = ({
  formState,
  foodIdByValue,
  isSensitiveInfoConsented = true,
  medicineIdByValue,
  recordDate,
  tagNames = [],
}: CreateLifeRecordPayloadParamTypes): PostLifeRecordRequestTypes | null => {
  const {
    detailRecord,
    foods,
    hydration,
    mealRegularity,
    memo,
    sleep,
    stress,
  } = formState;

  if (
    !sleep ||
    !stress ||
    !hydration ||
    !mealRegularity ||
    foods.length === 0
  ) {
    return null;
  }

  const foodIds = getSelectedItemIds(foods, foodIdByValue);

  if (!foodIds) return null;

  const trimmedMemo = memo.trim();
  let detailPayload: Partial<PostLifeRecordRequestTypes> = {};

  if (isCompleteDetailRecord(detailRecord, isSensitiveInfoConsented)) {
    const medicineIds = getSelectedItemIds(
      detailRecord.medicines,
      medicineIdByValue,
    );

    if (!medicineIds) return null;

    detailPayload = {
      caffeine: CAFFEINE_CODE_BY_VALUE[detailRecord.caffeine],
      exercise: EXERCISE_CODE_BY_VALUE[detailRecord.exercise],
      hormone:
        detailRecord.menstruation !== null
          ? HORMONE_CODE_BY_VALUE[detailRecord.menstruation]
          : null,
      medicineIds,
      outing: OUTING_CODE_BY_VALUE[detailRecord.outing],
      sleepTime: SLEEP_TIME_BY_VALUE[detailRecord.sleepDuration],
      waterIntake: detailRecord.waterIntake,
    };
  }

  return {
    regDate: recordDate,
    sleep: SLEEP_CODE_BY_VALUE[sleep],
    stress: STRESS_CODE_BY_VALUE[stress],
    water: WATER_CODE_BY_VALUE[hydration],
    waterIntake: MIN_WATER_INTAKE,
    mealRegular: MEAL_REGULAR_CODE_BY_VALUE[mealRegularity],
    memo: trimmedMemo || undefined,
    tagNames,
    foodIds,
    ...detailPayload,
  };
};

export const createLifeRecordPatchPayload = ({
  formState,
  foodIdByValue,
  medicineIdByValue,
  tagNames,
}: CreateLifeRecordPatchPayloadParamTypes): PatchLifeRecordRequestTypes | null => {
  const {
    detailRecord,
    foods,
    hydration,
    mealRegularity,
    memo,
    sleep,
    stress,
  } = formState;

  if (
    !sleep ||
    !stress ||
    !hydration ||
    !mealRegularity ||
    foods.length === 0
  ) {
    return null;
  }

  const foodIds = getSelectedItemIds(foods, foodIdByValue);

  if (!foodIds) return null;

  const medicineIds = detailRecord
    ? getSelectedItemIds(detailRecord.medicines, medicineIdByValue)
    : [];

  if (medicineIds === null) return null;

  const detailPayload: PatchLifeRecordRequestTypes = detailRecord
    ? {
        waterIntake: detailRecord.waterIntake,
        ...(detailRecord.sleepDuration !== null && {
          sleepTime: SLEEP_TIME_BY_VALUE[detailRecord.sleepDuration],
        }),
        ...(detailRecord.exercise !== null && {
          exercise: EXERCISE_CODE_BY_VALUE[detailRecord.exercise],
        }),
        ...(detailRecord.caffeine !== null && {
          caffeine: CAFFEINE_CODE_BY_VALUE[detailRecord.caffeine],
        }),
        ...(detailRecord.medicines.length > 0 && {
          medicineIds,
        }),
        ...(detailRecord.outing !== null && {
          outing: OUTING_CODE_BY_VALUE[detailRecord.outing],
        }),
        ...(detailRecord.menstruation !== null && {
          hormone: HORMONE_CODE_BY_VALUE[detailRecord.menstruation],
        }),
      }
    : {};

  return {
    sleep: SLEEP_CODE_BY_VALUE[sleep],
    stress: STRESS_CODE_BY_VALUE[stress],
    water: WATER_CODE_BY_VALUE[hydration],
    mealRegular: MEAL_REGULAR_CODE_BY_VALUE[mealRegularity],
    memo: memo.trim(),
    tagNames,
    foodIds,
    ...detailPayload,
  };
};
