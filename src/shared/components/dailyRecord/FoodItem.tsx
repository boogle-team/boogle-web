import type { FunctionComponent, SVGProps } from 'react';

import FoodAlcohol from '@/shared/assets/illustrations/dailyRecord/foodAlcohol.svg?react';
import FoodDairy from '@/shared/assets/illustrations/dailyRecord/foodDairy.svg?react';
import FoodGreasy from '@/shared/assets/illustrations/dailyRecord/foodGreasy.svg?react';
import FoodLateNight from '@/shared/assets/illustrations/dailyRecord/foodLateNight.svg?react';
import FoodSpicy from '@/shared/assets/illustrations/dailyRecord/foodSpicy.svg?react';
import FoodVegetable from '@/shared/assets/illustrations/dailyRecord/foodVegetable.svg?react';

type FoodIconComponentTypes = FunctionComponent<SVGProps<SVGSVGElement>>;

interface FoodItemPropTypes {
  name: string;
}

const FOOD_ICON_MAP: Record<string, FoodIconComponentTypes> = {
  음주: FoodAlcohol,
  야식: FoodLateNight,
  자극적: FoodSpicy,
  기름진: FoodGreasy,
  유제품: FoodDairy,
  '채소·잡곡': FoodVegetable,
};

const FoodItem = ({ name }: FoodItemPropTypes) => {
  const FoodIcon = FOOD_ICON_MAP[name] ?? FoodVegetable;

  return (
    <li className="flex min-w-1 flex-col items-center gap-1 text-center">
      <FoodIcon className="h-13 w-13" />
      <span className="label-semi text-gray-8">{name}</span>
    </li>
  );
};

export default FoodItem;
