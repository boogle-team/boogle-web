import type {
  LifeRecordFoodResponseTypes,
  LifeRecordMedicineResponseTypes,
} from '../types/lifeRecordApiTypes';
import {
  FOOD_VALUE_BY_ID,
  MEDICINE_VALUE_BY_ID,
} from '../types/lifeRecordApiTypes';
import type { MedicineTypes } from '../types/lifeDetailRecordTypes';
import type { FoodTypes } from '../types/lifeRecordTypes';

export type FoodIdByValueTypes = Partial<Record<FoodTypes, number>>;
export type MedicineIdByValueTypes = Partial<Record<MedicineTypes, number>>;

const normalizeItemName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[\s·/]/g, '');

const FOOD_VALUE_BY_NAME: Record<string, FoodTypes> = {
  술: 'alcohol',
  음주: 'alcohol',
  주류: 'alcohol',
  야식: 'lateNightFood',
  매운음식: 'spicy',
  매운: 'spicy',
  기름진음식: 'greasy',
  기름진: 'greasy',
  유제품: 'dairy',
  채소과일: 'vegetable',
  채소및과일: 'vegetable',
};

const MEDICINE_VALUE_BY_NAME: Record<string, MedicineTypes> = {
  감기약: 'cold',
  유산균: 'probiotic',
  철분제: 'iron',
  항생제: 'antibiotic',
  변비약: 'laxative',
  해당없음: 'none',
  없음: 'none',
};

export const getFoodValue = ({ id, name }: LifeRecordFoodResponseTypes) =>
  FOOD_VALUE_BY_NAME[normalizeItemName(name)] ?? FOOD_VALUE_BY_ID[id];

export const getMedicineValue = ({
  id,
  name,
}: LifeRecordMedicineResponseTypes) =>
  MEDICINE_VALUE_BY_NAME[normalizeItemName(name)] ?? MEDICINE_VALUE_BY_ID[id];

export const getFoodIdByValue = (
  foods: LifeRecordFoodResponseTypes[],
): FoodIdByValueTypes =>
  foods.reduce<FoodIdByValueTypes>((foodIdByValue, food) => {
    const foodValue = getFoodValue(food);

    if (foodValue) foodIdByValue[foodValue] = food.id;

    return foodIdByValue;
  }, {});

export const getMedicineIdByValue = (
  medicines: LifeRecordMedicineResponseTypes[],
): MedicineIdByValueTypes =>
  medicines.reduce<MedicineIdByValueTypes>((medicineIdByValue, medicine) => {
    const medicineValue = getMedicineValue(medicine);

    if (medicineValue) medicineIdByValue[medicineValue] = medicine.id;

    return medicineIdByValue;
  }, {});
