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
