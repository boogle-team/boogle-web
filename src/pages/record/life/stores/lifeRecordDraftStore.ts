import { create } from 'zustand';

import type { LifeRecordFormStateTypes } from '../types/lifeRecordTypes';

export const INITIAL_LIFE_RECORD_STATE: LifeRecordFormStateTypes = {
  sleep: null,
  stress: null,
  mealRegularity: null,
  hydration: null,
  foods: [],
  memo: '',
};

interface LifeRecordDraftStoreTypes {
  formState: LifeRecordFormStateTypes;
  updateLifeRecord: (partialState: Partial<LifeRecordFormStateTypes>) => void;
  resetLifeRecord: () => void;
}

/**
 * 생활 기록 초안. L-01(기본 입력)과 L-02('더 자세히 기록하기')를 오갈 때
 * 입력값이 유지되어야 하므로 페이지 로컬 상태 대신 store에 둔다.
 */
export const useLifeRecordDraftStore = create<LifeRecordDraftStoreTypes>(
  (set) => ({
    formState: INITIAL_LIFE_RECORD_STATE,

    updateLifeRecord: (partialState) => {
      set((state) => ({ formState: { ...state.formState, ...partialState } }));
    },

    resetLifeRecord: () => {
      set({ formState: INITIAL_LIFE_RECORD_STATE });
    },
  }),
);
