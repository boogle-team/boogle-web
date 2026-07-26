import AlcoholIcon from '@/shared/assets/illustrations/record/food/alcohol.svg?react';
import DairyIcon from '@/shared/assets/illustrations/record/food/dairy.svg?react';
import GreasyIcon from '@/shared/assets/illustrations/record/food/greasy.svg?react';
import LateNightFoodIcon from '@/shared/assets/illustrations/record/food/lateNightFood.svg?react';
import SpicyIcon from '@/shared/assets/illustrations/record/food/spicy.svg?react';
import VegetableIcon from '@/shared/assets/illustrations/record/food/vegetable.svg?react';

import type {
  FoodOptionTypes,
  HydrationTypes,
  LifeRecordOptionTypes,
  MealRegularityTypes,
  SleepTypes,
  StressTypes,
} from '../types/lifeRecordTypes';

export const SLEEP_OPTIONS: LifeRecordOptionTypes<SleepTypes>[] = [
  { value: 'insufficient', label: '부족' },
  { value: 'normal', label: '보통' },
  { value: 'sufficient', label: '충분' },
];

export const STRESS_OPTIONS: LifeRecordOptionTypes<StressTypes>[] = [
  { value: 'low', label: '낮음' },
  { value: 'normal', label: '보통' },
  { value: 'high', label: '높음' },
];

export const MEAL_REGULARITY_OPTIONS: LifeRecordOptionTypes<MealRegularityTypes>[] =
  [
    { value: 'regular', label: '규칙적' },
    { value: 'normal', label: '보통' },
    { value: 'irregular', label: '불규칙' },
  ];

export const HYDRATION_OPTIONS: LifeRecordOptionTypes<HydrationTypes>[] = [
  { value: 'insufficient', label: '부족' },
  { value: 'normal', label: '보통' },
  { value: 'sufficient', label: '충분' },
];

export const FOOD_OPTIONS: FoodOptionTypes[] = [
  {
    value: 'alcohol',
    label: '음주',
    description: '맥주·소주 등',
    Icon: AlcoholIcon,
  },
  {
    value: 'lateNightFood',
    label: '야식',
    description: '늦은 시간 식사',
    Icon: LateNightFoodIcon,
  },
  {
    value: 'spicy',
    label: '자극적',
    description: '맵고 짠 음식',
    Icon: SpicyIcon,
  },
  {
    value: 'greasy',
    label: '기름진',
    description: '튀김·기름진 고기',
    Icon: GreasyIcon,
  },
  {
    value: 'dairy',
    label: '유제품',
    description: '우유·치즈 등',
    Icon: DairyIcon,
  },
  {
    value: 'vegetable',
    label: '채소·잡곡',
    description: '채소·현미·고구마',
    Icon: VegetableIcon,
  },
];

export const MEMO_MAX_LENGTH = 100;

/** 하나의 기록에 설정할 수 있는 태그 개수 상한. */
export const MAX_TAG_COUNT = 6;

/** 직접 추가하는 태그 길이 제한. 2자 이상 6자 미만만 허용한다. */
export const TAG_MIN_LENGTH = 2;
export const TAG_MAX_LENGTH = 6;

export const isValidTagLength = (tag: string) =>
  tag.length >= TAG_MIN_LENGTH && tag.length < TAG_MAX_LENGTH;
