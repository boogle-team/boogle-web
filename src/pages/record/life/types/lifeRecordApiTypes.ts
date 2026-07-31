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
