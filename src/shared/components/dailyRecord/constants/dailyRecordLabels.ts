import type {
  BoogleAmountCodeTypes,
  BoogleDetailSeverityCodeTypes,
  BowelFeelingCodeTypes,
  LifeConditionCodeTypes,
  StoolColorCodeTypes,
  StoolSimpleCodeTypes,
} from '../types/dailyRecordTypes';

import { PAIN_LEVEL_LABELS } from '@/shared/constants/painLevelConstants';

export const STOOL_SIMPLE_LABELS: Record<string, string> = {
  H: '딱딱함',
  M: '보통',
  T: '묽음',
};

export const BOWEL_FEELING_LABELS: Record<string, string> = {
  C: '편안함',
  N: '보통',
  H: '힘들었음',
};

export const SLEEP_LABELS: Record<string, string> = {
  B: '부족',
  N: '보통',
  G: '충분',
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
  N: '보통',
  I: '불규칙',
};

export const SLEEP_TIME_LABELS: Record<number, string> = {
  1: '5시간 미만',
  2: '5~7시간',
  3: '7시간 이상',
};

export const EXERCISE_LABELS: Record<string, string> = {
  N: '안함',
  L: '가볍게',
  H: '충분히',
};

export const CAFFEINE_LABELS: Record<string, string> = {
  N: '없음',
  O: '1잔',
  M: '2잔 이상',
  H: '2잔 이상',
};

export const OUTING_LABELS: Record<string, string> = {
  N: '평소와 같음',
  L: '외출 많음',
  T: '여행 중',
  O: '있음',
};

export const MEDICINE_LABELS: Record<string, string> = {
  L: '감기약, 유산균, 철분제, 항생제',
  N: '없음',
  O: '있음',
};

export const HORMONE_LABELS: Record<string, string> = {
  N: '없음',
  M: '생리 중',
  E: '호르몬 변화 있음',
  O: '있음',
};

const BOOGLE_DETAIL_SEVERITY_LABELS: Record<string, string> = {
  N: '없음',
  M: '약간',
  L: '심함',
};

const BOOGLE_AMOUNT_LABELS: Record<string, string> = {
  S: '적음',
  N: '보통',
  M: '많음',
};

const STOOL_COLOR_LABELS: Record<string, string> = {
  B: '갈색',
  D: '진갈색',
  N: '검은색',
  R: '붉은색',
  G: '회백색',
};

export const getStoolSimpleLabel = (code: StoolSimpleCodeTypes) =>
  STOOL_SIMPLE_LABELS[code] ?? '기록됨';

export const getBowelFeelingLabel = (code: BowelFeelingCodeTypes) =>
  BOWEL_FEELING_LABELS[code] ?? '기록됨';

// 복통을 기록하지 않은 경우(null)는 칩을 띄우지 않도록 null을 돌려준다.
export const getStomachLabel = (level: number | null) => {
  if (level === null) return null;

  const painLevelLabel = PAIN_LEVEL_LABELS[level];

  return painLevelLabel ? `복통 ${painLevelLabel}` : '복통 기록됨';
};

export const getBoogleSeverityDetailLabel = (
  title: string,
  code?: BoogleDetailSeverityCodeTypes | null,
) => {
  if (code === null || code === undefined) return null;

  return `${title} ${BOOGLE_DETAIL_SEVERITY_LABELS[code] ?? '기록됨'}`;
};

export const getBoogleTakenTimeLabel = (takenTime?: number | null) =>
  takenTime === null || takenTime === undefined
    ? null
    : `소요 시간 ${takenTime}분`;

export const getBoogleAmountLabel = (amount?: BoogleAmountCodeTypes | null) => {
  if (amount === null || amount === undefined) return null;

  return `배변량 ${BOOGLE_AMOUNT_LABELS[amount] ?? '기록됨'}`;
};

export const getStoolColorLabel = (color?: StoolColorCodeTypes | null) => {
  if (color === null || color === undefined) return null;

  return `변 색상 ${STOOL_COLOR_LABELS[color] ?? '기록됨'}`;
};

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
