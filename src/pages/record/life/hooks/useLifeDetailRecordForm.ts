import { useMemo, useState } from 'react';

import { MIN_WATER_INTAKE } from '../constants/lifeDetailRecordConstants';
import type {
  CaffeineTypes,
  ExerciseTypes,
  LifeDetailRecordFormStateTypes,
  OutingTypes,
  SleepDurationTypes,
} from '../types/lifeDetailRecordTypes';

const INITIAL_FORM_STATE: LifeDetailRecordFormStateTypes = {
  sleepDuration: null,
  exercise: null,
  caffeine: null,
  waterIntake: MIN_WATER_INTAKE,
  outing: null,
};

// TODO: 남은 항목(물 섭취량·약/영양제·생리 호르몬 변화) 추가 후 초안 스토어로 옮긴다.
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

  const handleOutingChange = (outing: OutingTypes) => {
    setFormState((previousState) => ({ ...previousState, outing }));
  };

  // L-02는 진입 시점부터 모든 항목이 필수라 하나라도 비면 완료할 수 없다.
  const isSubmittable = useMemo(
    () => Object.values(formState).every((value) => value !== null),
    [formState],
  );

  return {
    formState,
    isSubmittable,
    handleSleepDurationChange,
    handleExerciseChange,
    handleCaffeineChange,
    handleWaterIntakeChange,
    handleOutingChange,
  };
};
