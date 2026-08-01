import { useMemo } from 'react';

import {
  EXCLUSIVE_MEDICINE,
  MIN_WATER_INTAKE,
} from '../constants/lifeDetailRecordConstants';
import { useLifeRecordDraftStore } from '../stores/lifeRecordDraftStore';
import type {
  CaffeineTypes,
  ExerciseTypes,
  LifeDetailRecordFormStateTypes,
  MedicineTypes,
  MenstruationTypes,
  OutingTypes,
  SleepDurationTypes,
} from '../types/lifeDetailRecordTypes';

export const INITIAL_LIFE_DETAIL_RECORD_STATE: LifeDetailRecordFormStateTypes = {
  sleepDuration: null,
  exercise: null,
  caffeine: null,
  waterIntake: MIN_WATER_INTAKE,
  medicines: [],
  outing: null,
  menstruation: null,
};

interface UseLifeDetailRecordFormParamTypes {
  /** 미동의 사용자에게는 생리·호르몬 변화가 노출되지 않아 필수 검사에서도 빠진다. */
  isSensitiveInfoConsented: boolean;
}

// TODO: 세부 항목을 lifeRecordDraftStore로 옮긴다.
// 지금은 페이지 로컬 상태라 완료로 L-01에 돌아가면 입력값이 사라진다.
// 저장은 L-01 완료 시 한 번에 이뤄지므로 두 페이지가 같은 초안을 봐야 한다.
export const useLifeDetailRecordForm = ({
  isSensitiveInfoConsented,
}: UseLifeDetailRecordFormParamTypes) => {
  const detailRecord = useLifeRecordDraftStore(
    (state) => state.formState.detailRecord,
  );
  const updateLifeRecord = useLifeRecordDraftStore(
    (state) => state.updateLifeRecord,
  );

  const formState = detailRecord ?? INITIAL_LIFE_DETAIL_RECORD_STATE;

  const updateDetailRecord = (
    partialState: Partial<LifeDetailRecordFormStateTypes>,
  ) => {
    updateLifeRecord({
      detailRecord: {
        ...formState,
        ...partialState,
      },
    });
  };

  const handleSleepDurationChange = (sleepDuration: SleepDurationTypes) => {
    updateDetailRecord({ sleepDuration });
  };

  const handleExerciseChange = (exercise: ExerciseTypes) => {
    updateDetailRecord({ exercise });
  };

  const handleCaffeineChange = (caffeine: CaffeineTypes) => {
    updateDetailRecord({ caffeine });
  };

  const handleWaterIntakeChange = (waterIntake: number) => {
    updateDetailRecord({ waterIntake });
  };

  // '해당 없음'은 다른 약과 함께 고를 수 없어서 서로를 밀어낸다.
  const handleMedicineToggle = (medicine: MedicineTypes) => {
    const { medicines } = formState;

    if (medicines.includes(medicine)) {
      updateDetailRecord({
        medicines: medicines.filter(
          (selectedMedicine) => selectedMedicine !== medicine,
        ),
      });
      return;
    }

    if (medicine === EXCLUSIVE_MEDICINE) {
      updateDetailRecord({ medicines: [medicine] });
      return;
    }

    updateDetailRecord({
      medicines: [
        ...medicines.filter(
          (selectedMedicine) => selectedMedicine !== EXCLUSIVE_MEDICINE,
        ),
        medicine,
      ],
    });
  };

  const handleOutingChange = (outing: OutingTypes) => {
    updateDetailRecord({ outing });
  };

  const handleMenstruationChange = (menstruation: MenstruationTypes) => {
    updateDetailRecord({ menstruation });
  };

  // L-02는 진입 시점부터 모든 항목이 필수라 하나라도 비면 완료할 수 없다.
  // 물 섭취량은 0잔도 유효한 답이라 검사 대상이 아니다.
  const isSubmittable = useMemo(() => {
    const {
      sleepDuration,
      exercise,
      caffeine,
      medicines,
      outing,
      menstruation,
    } = formState;

    return (
      sleepDuration !== null &&
      exercise !== null &&
      caffeine !== null &&
      medicines.length > 0 &&
      outing !== null &&
      (!isSensitiveInfoConsented || menstruation !== null)
    );
  }, [formState, isSensitiveInfoConsented]);

  return {
    formState,
    isSubmittable,
    handleSleepDurationChange,
    handleExerciseChange,
    handleCaffeineChange,
    handleWaterIntakeChange,
    handleMedicineToggle,
    handleOutingChange,
    handleMenstruationChange,
  };
};
