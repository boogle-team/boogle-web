import { MIN_WATER_INTAKE } from '../constants/lifeDetailRecordConstants';
import type { LifeDetailRecordFormStateTypes } from '../types/lifeDetailRecordTypes';
import type { PostLifeRecordRequestTypes } from '../types/lifeRecordApiTypes';
import {
  CAFFEINE_CODE_BY_VALUE,
  EXERCISE_CODE_BY_VALUE,
  FOOD_ID_BY_VALUE,
  HORMONE_CODE_BY_VALUE,
  MEAL_REGULAR_CODE_BY_VALUE,
  MEDICINE_ID_BY_VALUE,
  OUTING_CODE_BY_VALUE,
  SLEEP_CODE_BY_VALUE,
  SLEEP_TIME_BY_VALUE,
  STRESS_CODE_BY_VALUE,
  WATER_CODE_BY_VALUE,
} from '../types/lifeRecordApiTypes';
import type { LifeRecordFormStateTypes } from '../types/lifeRecordTypes';

interface CreateLifeRecordPayloadParamTypes {
  formState: LifeRecordFormStateTypes;
  isSensitiveInfoConsented?: boolean;
  recordDate: string;
  tagNames?: string[];
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

export const createLifeRecordPayload = ({
  formState,
  isSensitiveInfoConsented = true,
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

  const trimmedMemo = memo.trim();
  const detailPayload = isCompleteDetailRecord(
    detailRecord,
    isSensitiveInfoConsented,
  )
    ? {
        caffeine: CAFFEINE_CODE_BY_VALUE[detailRecord.caffeine],
        exercise: EXERCISE_CODE_BY_VALUE[detailRecord.exercise],
        hormone:
          detailRecord.menstruation !== null
            ? HORMONE_CODE_BY_VALUE[detailRecord.menstruation]
            : null,
        medicineIds: detailRecord.medicines.map(
          (medicine) => MEDICINE_ID_BY_VALUE[medicine],
        ),
        outing: OUTING_CODE_BY_VALUE[detailRecord.outing],
        sleepTime: SLEEP_TIME_BY_VALUE[detailRecord.sleepDuration],
        waterIntake: detailRecord.waterIntake,
      }
    : {};

  return {
    regDate: recordDate,
    sleep: SLEEP_CODE_BY_VALUE[sleep],
    stress: STRESS_CODE_BY_VALUE[stress],
    water: WATER_CODE_BY_VALUE[hydration],
    waterIntake: MIN_WATER_INTAKE,
    mealRegular: MEAL_REGULAR_CODE_BY_VALUE[mealRegularity],
    memo: trimmedMemo || undefined,
    tagNames,
    foodIds: foods.map((food) => FOOD_ID_BY_VALUE[food]),
    ...detailPayload,
  };
};
