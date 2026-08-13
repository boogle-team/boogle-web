import FoodItem from './FoodItem';
import type { FoodTypes } from './types/dailyRecordTypes';

interface FoodListPropTypes {
  foods: FoodTypes[];
}

const FoodList = ({ foods }: FoodListPropTypes) => {
  if (foods.length === 0) return null;

  return (
    <section className="space-y-1">
      <h3 className="caption-bold text-gray-7">오늘 먹은 것</h3>
      <ul className="flex flex-wrap gap-x-3">
        {foods.map(({ id, name }) => (
          <FoodItem key={id} name={name} />
        ))}
      </ul>
    </section>
  );
};

export default FoodList;
