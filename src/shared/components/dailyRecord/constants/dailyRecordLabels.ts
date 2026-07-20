import type {
  BowelFeelingCodeTypes,
  LifeConditionCodeTypes,
  StomachCodeTypes,
  StoolSimpleCodeTypes,
} from '../types/dailyRecordTypes';

export const STOOL_SIMPLE_LABELS: Record<string, string> = {
  M: '보통',
  T: '묽음',
};

export const BOWEL_FEELING_LABELS: Record<string, string> = {
  C: '편안함',
  H: '힘들었음',
};

export const STOMACH_LABELS: Record<string, string> = {
  N: '복통 약간 있음',
};

export const SLEEP_LABELS: Record<string, string> = {
  B: '부족',
  N: '보통',
  H: '충분',
};

export const STRESS_LABELS: Record<string, string> = {
  L: '낮음',
  N: '보통',
  H: '높음',
};

export const WATER_LABELS: Record<string, string> = {
  L: '부족',
  N: '보통',
  H: '충분',
};

export const MEAL_REGULAR_LABELS: Record<string, string> = {
  R: '규칙적',
  N: '불규칙',
};

export const SLEEP_TIME_LABELS: Record<number, string> = {
  1: '7시간 이상',
  2: '5시간 이하',
  3: '5시간 미만',
};

export const EXERCISE_LABELS: Record<string, string> = {
  L: '안함',
  N: '가볍게',
  H: '충분히',
};

export const CAFFEINE_LABELS: Record<string, string> = {
  O: '없음',
  N: '보통',
  H: '많음',
};

export const OUTING_LABELS: Record<string, string> = {
  N: '평소와 같음',
  O: '있음',
};

export const MEDICINE_LABELS: Record<string, string> = {
  L: '감기약, 유산균, 철분제, 항생제',
  N: '없음',
  O: '있음',
};

export const HORMONE_LABELS: Record<string, string> = {
  N: '없음',
  O: '있음',
};

export const getStoolSimpleLabel = (code: StoolSimpleCodeTypes) =>
  STOOL_SIMPLE_LABELS[code] ?? '기록됨';

export const getBowelFeelingLabel = (code: BowelFeelingCodeTypes) =>
  BOWEL_FEELING_LABELS[code] ?? '기록됨';

export const getStomachLabel = (code: StomachCodeTypes) =>
  STOMACH_LABELS[code] ?? '복통 기록됨';

export const getSleepLabel = (code: LifeConditionCodeTypes) =>
  SLEEP_LABELS[code] ?? '기록됨';

export const getStressLabel = (code: LifeConditionCodeTypes) =>
  STRESS_LABELS[code] ?? '기록됨';

export const getWaterLabel = (code: LifeConditionCodeTypes) =>
  WATER_LABELS[code] ?? '기록됨';

export const getMealRegularLabel = (code: LifeConditionCodeTypes) =>
  MEAL_REGULAR_LABELS[code] ?? '기록됨';

export const getSleepTimeLabel = (sleepTime?: number) => {
  if (!sleepTime) return '없음';

  return SLEEP_TIME_LABELS[sleepTime] ?? `${sleepTime}시간`;
};

export const getExerciseLabel = (code?: LifeConditionCodeTypes) =>
  code ? (EXERCISE_LABELS[code] ?? '기록됨') : '없음';

export const getCaffeineLabel = (code?: LifeConditionCodeTypes) =>
  code ? (CAFFEINE_LABELS[code] ?? '기록됨') : '없음';

export const getWaterIntakeLabel = (waterIntake?: number) => {
  if (!waterIntake) return '없음';

  return `${waterIntake}잔`;
};

export const getOutingLabel = (code?: LifeConditionCodeTypes) =>
  code ? (OUTING_LABELS[code] ?? '기록됨') : '없음';

export const getMedicineLabel = (code?: LifeConditionCodeTypes) =>
  code ? (MEDICINE_LABELS[code] ?? '기록됨') : '없음';

export const getHormoneLabel = (code?: LifeConditionCodeTypes) =>
  code ? (HORMONE_LABELS[code] ?? '기록됨') : '없음';