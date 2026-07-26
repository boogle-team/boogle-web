import type { FunctionComponent, SVGProps } from 'react';

export type SleepTypes = 'insufficient' | 'normal' | 'sufficient';

export type StressTypes = 'low' | 'normal' | 'high';

export type MealRegularityTypes = 'regular' | 'normal' | 'irregular';

export type HydrationTypes = 'insufficient' | 'normal' | 'sufficient';

export type FoodTypes =
  'alcohol' | 'lateNightFood' | 'spicy' | 'greasy' | 'dairy' | 'vegetable';

export interface LifeRecordOptionTypes<T extends string> {
  value: T;
  label: string;
}

export interface FoodOptionTypes {
  value: FoodTypes;
  label: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface LifeRecordFormStateTypes {
  sleep: SleepTypes | null;
  stress: StressTypes | null;
  mealRegularity: MealRegularityTypes | null;
  hydration: HydrationTypes | null;
  foods: FoodTypes[];
  memo: string;
}
