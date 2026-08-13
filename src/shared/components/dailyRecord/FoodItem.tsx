import type { FunctionComponent, SVGProps } from 'react';

import FoodAlcohol from '@/shared/assets/illustrations/dailyRecord/foodAlcohol.svg?react';
import FoodDairy from '@/shared/assets/illustrations/dailyRecord/foodDairy.svg?react';
import FoodGreasy from '@/shared/assets/illustrations/dailyRecord/foodGreasy.svg?react';
import FoodLateNight from '@/shared/assets/illustrations/dailyRecord/foodLateNight.svg?react';
import FoodSpicy from '@/shared/assets/illustrations/dailyRecord/foodSpicy.svg?react';
import FoodVegetable from '@/shared/assets/illustrations/dailyRecord/foodVegetable.svg?react';

type FoodIconComponentTypes = FunctionComponent<SVGProps<SVGSVGElement>>;

interface FoodItemPropTypes {
  id: number;
  name: string;
}

const FOOD_ICON_BY_ID: Record<number, FoodIconComponentTypes> = {
  1: FoodAlcohol,
  2: FoodLateNight,
  3: FoodSpicy,
  4: FoodGreasy,
  5: FoodDairy,
  6: FoodVegetable,
};

const FoodItem = ({ id, name }: FoodItemPropTypes) => {
  const FoodIcon = FOOD_ICON_BY_ID[id] ?? FoodVegetable;

  return (
    <li className="flex min-w-1 flex-col items-center gap-1 text-center">
      <FoodIcon className="h-13 w-13" />
      <span className="label-semi text-gray-8">{name}</span>
    </li>
  );
};

export default FoodItem;
