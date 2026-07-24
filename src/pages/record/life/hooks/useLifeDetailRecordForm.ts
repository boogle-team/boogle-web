import { useMemo, useState } from 'react';

import {
  EXCLUSIVE_MEDICINE,
  MIN_WATER_INTAKE,
} from '../constants/lifeDetailRecordConstants';
import type {
  CaffeineTypes,
  ExerciseTypes,
  LifeDetailRecordFormStateTypes,
  MedicineTypes,
  OutingTypes,
  SleepDurationTypes,
} from '../types/lifeDetailRecordTypes';

const INITIAL_FORM_STATE: LifeDetailRecordFormStateTypes = {
  sleepDuration: null,
  exercise: null,
  caffeine: null,
  waterIntake: MIN_WATER_INTAKE,
  medicines: [],
  outing: null,
};

// TODO: 남은 항목(생리·호르몬 변화) 추가 후 초안 스토어로 옮긴다.
export const useLifeDetailRecordForm = () => {
  const [formState, setFormState] =
    useState<LifeDetailRecordFormStateTypes>(INITIAL_FORM_STATE);

  const handleSleepDurationChange = (sleepDuration: SleepDurationTypes) => {
    setFormState((previousState) => ({ ...previousState, sleepDuration }));
  };

  const handleExerciseChange = (exercise: ExerciseTypes) => {
    setFormState((previousState) => ({ ...previousState, exercise }));
  };

  const handleCaffeineChange = (caffeine: CaffeineTypes) => {
    setFormState((previousState) => ({ ...previousState, caffeine }));
  };

  const handleWaterIntakeChange = (waterIntake: number) => {
    setFormState((previousState) => ({ ...previousState, waterIntake }));
  };

  // '해당 없음'은 다른 약과 함께 고를 수 없어서 서로를 밀어낸다.
  const handleMedicineToggle = (medicine: MedicineTypes) => {
    setFormState((previousState) => {
      const { medicines } = previousState;

      if (medicines.includes(medicine)) {
        return {
          ...previousState,
          medicines: medicines.filter(
            (selectedMedicine) => selectedMedicine !== medicine,
          ),
        };
      }

      if (medicine === EXCLUSIVE_MEDICINE) {
        return { ...previousState, medicines: [medicine] };
      }

      return {
        ...previousState,
        medicines: [
          ...medicines.filter(
            (selectedMedicine) => selectedMedicine !== EXCLUSIVE_MEDICINE,
          ),
          medicine,
        ],
      };
    });
  };

  const handleOutingChange = (outing: OutingTypes) => {
    setFormState((previousState) => ({ ...previousState, outing }));
  };

  // L-02는 진입 시점부터 모든 항목이 필수라 하나라도 비면 완료할 수 없다.
  // 물 섭취량은 0잔도 유효한 답이라 검사 대상이 아니다.
  const isSubmittable = useMemo(() => {
    const { sleepDuration, exercise, caffeine, medicines, outing } = formState;

    return (
      sleepDuration !== null &&
      exercise !== null &&
      caffeine !== null &&
      medicines.length > 0 &&
      outing !== null
    );
  }, [formState]);

  return {
    formState,
    isSubmittable,
    handleSleepDurationChange,
    handleExerciseChange,
    handleCaffeineChange,
    handleWaterIntakeChange,
    handleMedicineToggle,
    handleOutingChange,
  };
};
