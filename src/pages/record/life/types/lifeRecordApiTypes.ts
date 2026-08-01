import type {
  CaffeineTypes,
  ExerciseTypes,
  MedicineTypes,
  MenstruationTypes,
  OutingTypes,
  SleepDurationTypes,
} from './lifeDetailRecordTypes';
import type {
  FoodTypes,
  HydrationTypes,
  MealRegularityTypes,
  SleepTypes,
  StressTypes,
} from './lifeRecordTypes';

export type LifeRecordSleepCodeTypes = 'B' | 'N' | 'G';
export type LifeRecordStressCodeTypes = 'L' | 'N' | 'H';
export type LifeRecordWaterCodeTypes = 'L' | 'N' | 'H';
export type LifeRecordMealRegularCodeTypes = 'R' | 'N' | 'I';
export type LifeRecordExerciseCodeTypes = 'L' | 'N' | 'H';
export type LifeRecordCaffeineCodeTypes = 'N' | 'O' | 'M';
export type LifeRecordOutingCodeTypes = 'N' | 'L' | 'T';
export type LifeRecordHormoneCodeTypes = 'N' | 'M' | 'E';

export interface PostLifeRecordRequestTypes {
  regDate: string;
  sleep: LifeRecordSleepCodeTypes;
  stress: LifeRecordStressCodeTypes;
  water: LifeRecordWaterCodeTypes;
  waterIntake: number;
  mealRegular: LifeRecordMealRegularCodeTypes;
  sleepTime?: number;
  exercise?: LifeRecordExerciseCodeTypes;
  caffeine?: LifeRecordCaffeineCodeTypes;
  outing?: LifeRecordOutingCodeTypes;
  hormone?: LifeRecordHormoneCodeTypes | null;
  memo?: string;
  tagNames?: string[];
  foodIds: number[];
  medicineIds?: number[];
}

export type PatchLifeRecordRequestTypes = Partial<
  Omit<PostLifeRecordRequestTypes, 'regDate' | 'foodIds'> & {
    foodIds: number[];
  }
>;

export interface GetLifeRecordsRequestTypes {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export interface GetTodayLifeRecordTagsRequestTypes {
  date?: string;
}

export interface GetFoodsRequestTypes {
  keyword?: string;
}

export interface GetMedicinesRequestTypes {
  keyword?: string;
}

export interface PostExtractLifeRecordTagsRequestTypes {
  text: string;
}

export interface LifeRecordApiSuccessResponseTypes<T> {
  success: true;
  data: T;
  message: string;
}

export interface LifeRecordMedicineResponseTypes {
  id: number;
  name: string;
}

export interface LifeRecordFoodResponseTypes {
  id: number;
  name: string;
}

export interface LifeRecordExtractedTagTypes {
  name: string;
  confidence: number;
}

export interface PostExtractLifeRecordTagsResponseTypes {
  originalText: string;
  tags: LifeRecordExtractedTagTypes[];
  tagNames: string[];
  autoTags: string;
}

export interface GetTodayLifeRecordTagsResponseTypes {
  tagNames: string[];
}

export interface GetFoodsResponseTypes {
  items: LifeRecordFoodResponseTypes[];
}

export interface GetMedicinesResponseTypes {
  items: LifeRecordMedicineResponseTypes[];
}

export interface PostLifeRecordResponseTypes {
  id: number;
  userId: number;
  regDate: string;
  sleep: LifeRecordSleepCodeTypes;
  stress: LifeRecordStressCodeTypes;
  water: LifeRecordWaterCodeTypes;
  waterIntake: number;
  mealRegular: LifeRecordMealRegularCodeTypes;
  sleepTime: number | null;
  exercise: LifeRecordExerciseCodeTypes | null;
  caffeine: LifeRecordCaffeineCodeTypes | null;
  outing: LifeRecordOutingCodeTypes | null;
  hormone: LifeRecordHormoneCodeTypes | null;
  memo: string | null;
  autoTags: string | null;
  tagNames: string[];
  medicines: LifeRecordMedicineResponseTypes[];
  foods: LifeRecordFoodResponseTypes[];
  status: string;
  createdAt: string;
  updatedAt: string | null;
}

export type LifeRecordDetailResponseTypes = PostLifeRecordResponseTypes;

export interface PatchLifeRecordResponseTypes {
  id: number;
  regDate: string;
  sleep: LifeRecordSleepCodeTypes;
  stress: LifeRecordStressCodeTypes;
  water: LifeRecordWaterCodeTypes;
  waterIntake: number;
  mealRegular: LifeRecordMealRegularCodeTypes;
  sleepTime: number | null;
  exercise: LifeRecordExerciseCodeTypes | null;
  caffeine: LifeRecordCaffeineCodeTypes | null;
  outing: LifeRecordOutingCodeTypes | null;
  hormone: LifeRecordHormoneCodeTypes | null;
  memo: string | null;
  tagNames: string[];
  medicines: LifeRecordMedicineResponseTypes[];
  foods: LifeRecordFoodResponseTypes[];
  status: string;
  updatedAt: string;
}

export interface LifeRecordListItemTypes {
  id: number;
  regDate: string;
  sleep: LifeRecordSleepCodeTypes;
  stress: LifeRecordStressCodeTypes;
  water: LifeRecordWaterCodeTypes;
  mealRegular: LifeRecordMealRegularCodeTypes;
  memo: string | null;
  tagNames: string[];
  foods: LifeRecordFoodResponseTypes[];
  status: string;
}

export interface GetLifeRecordsResponseTypes {
  items: LifeRecordListItemTypes[];
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
}

export const SLEEP_CODE_BY_VALUE: Record<SleepTypes, LifeRecordSleepCodeTypes> =
  {
    insufficient: 'B',
    normal: 'N',
    sufficient: 'G',
  };

export const STRESS_CODE_BY_VALUE: Record<
  StressTypes,
  LifeRecordStressCodeTypes
> = {
  low: 'L',
  normal: 'N',
  high: 'H',
};

export const WATER_CODE_BY_VALUE: Record<
  HydrationTypes,
  LifeRecordWaterCodeTypes
> = {
  insufficient: 'L',
  normal: 'N',
  sufficient: 'H',
};

export const WATER_INTAKE_BY_VALUE: Record<HydrationTypes, number> = {
  insufficient: 1,
  normal: 4,
  sufficient: 8,
};

export const MEAL_REGULAR_CODE_BY_VALUE: Record<
  MealRegularityTypes,
  LifeRecordMealRegularCodeTypes
> = {
  regular: 'R',
  normal: 'N',
  irregular: 'I',
};

export const FOOD_ID_BY_VALUE: Record<FoodTypes, number> = {
  alcohol: 1,
  lateNightFood: 2,
  spicy: 3,
  greasy: 4,
  dairy: 5,
  vegetable: 6,
};

export const SLEEP_TIME_BY_VALUE: Record<SleepDurationTypes, number> = {
  lessThan5Hours: 1,
  from5To7Hours: 2,
  moreThan7Hours: 3,
};

export const EXERCISE_CODE_BY_VALUE: Record<
  ExerciseTypes,
  LifeRecordExerciseCodeTypes
> = {
  none: 'N',
  light: 'L',
  enough: 'H',
};

export const CAFFEINE_CODE_BY_VALUE: Record<
  CaffeineTypes,
  LifeRecordCaffeineCodeTypes
> = {
  none: 'N',
  oneCup: 'O',
  twoCupsOrMore: 'M',
};

export const MEDICINE_ID_BY_VALUE: Record<MedicineTypes, number> = {
  cold: 1,
  antibiotic: 2,
  probiotic: 3,
  iron: 4,
  laxative: 5,
  none: 6,
};

export const OUTING_CODE_BY_VALUE: Record<
  OutingTypes,
  LifeRecordOutingCodeTypes
> = {
  usual: 'N',
  frequent: 'L',
  traveling: 'T',
};

export const HORMONE_CODE_BY_VALUE: Record<
  MenstruationTypes,
  LifeRecordHormoneCodeTypes
> = {
  none: 'N',
  menstruating: 'M',
  hormonalChange: 'E',
};

export const SLEEP_VALUE_BY_CODE: Record<LifeRecordSleepCodeTypes, SleepTypes> =
  {
    B: 'insufficient',
    N: 'normal',
    G: 'sufficient',
  };

export const STRESS_VALUE_BY_CODE: Record<
  LifeRecordStressCodeTypes,
  StressTypes
> = {
  L: 'low',
  N: 'normal',
  H: 'high',
};

export const WATER_VALUE_BY_CODE: Record<
  LifeRecordWaterCodeTypes,
  HydrationTypes
> = {
  L: 'insufficient',
  N: 'normal',
  H: 'sufficient',
};

export const MEAL_REGULAR_VALUE_BY_CODE: Record<
  LifeRecordMealRegularCodeTypes,
  MealRegularityTypes
> = {
  R: 'regular',
  N: 'normal',
  I: 'irregular',
};

export const FOOD_VALUE_BY_ID = Object.fromEntries(
  Object.entries(FOOD_ID_BY_VALUE).map(([food, id]) => [id, food]),
) as Record<number, FoodTypes>;

export const SLEEP_TIME_VALUE_BY_NUMBER = Object.fromEntries(
  Object.entries(SLEEP_TIME_BY_VALUE).map(([sleepTime, value]) => [
    value,
    sleepTime,
  ]),
) as Record<number, SleepDurationTypes>;

export const EXERCISE_VALUE_BY_CODE: Record<
  LifeRecordExerciseCodeTypes,
  ExerciseTypes
> = {
  N: 'none',
  L: 'light',
  H: 'enough',
};

export const CAFFEINE_VALUE_BY_CODE: Record<
  LifeRecordCaffeineCodeTypes,
  CaffeineTypes
> = {
  N: 'none',
  O: 'oneCup',
  M: 'twoCupsOrMore',
};

export const MEDICINE_VALUE_BY_ID = Object.fromEntries(
  Object.entries(MEDICINE_ID_BY_VALUE).map(([medicine, id]) => [id, medicine]),
) as Record<number, MedicineTypes>;

export const OUTING_VALUE_BY_CODE: Record<
  LifeRecordOutingCodeTypes,
  OutingTypes
> = {
  N: 'usual',
  L: 'frequent',
  T: 'traveling',
};

export const HORMONE_VALUE_BY_CODE: Record<
  LifeRecordHormoneCodeTypes,
  MenstruationTypes
> = {
  N: 'none',
  M: 'menstruating',
  E: 'hormonalChange',
};
