import { create } from 'zustand';

import type { LifeRecordFormStateTypes } from '../types/lifeRecordTypes';

export const INITIAL_LIFE_RECORD_STATE: LifeRecordFormStateTypes = {
  sleep: null,
  stress: null,
  mealRegularity: null,
  hydration: null,
  foods: [],
  memo: '',
  detailRecord: null,
};

interface StartLifeRecordParamTypes {
  /** 같은 초안인지 판별하는 키. 새 기록은 'new', 수정은 기록별로 다르게 준다. */
  draftKey: string;
  formState?: LifeRecordFormStateTypes;
}

interface LifeRecordDraftStoreTypes {
  draftKey: string | null;
  hydratedDraftKey: string | null;
  formState: LifeRecordFormStateTypes;
  startLifeRecord: (param: StartLifeRecordParamTypes) => void;
  hydrateLifeRecord: (param: Required<StartLifeRecordParamTypes>) => void;
  updateLifeRecord: (partialState: Partial<LifeRecordFormStateTypes>) => void;
  resetLifeRecord: () => void;
}

/**
 * 생활 기록 초안. L-01(기본 입력)과 L-02('더 자세히 기록하기')를 오갈 때
 * 입력값이 유지되어야 하므로 페이지 로컬 상태 대신 store에 둔다.
 */
export const useLifeRecordDraftStore = create<LifeRecordDraftStoreTypes>(
  (set, get) => ({
    draftKey: null,
    hydratedDraftKey: null,
    formState: INITIAL_LIFE_RECORD_STATE,

    // 같은 키면 아무것도 하지 않는다. 세부 기록에서 돌아왔을 때 입력값이 날아가지 않도록.
    startLifeRecord: ({ draftKey, formState }) => {
      if (get().draftKey === draftKey) return;

      set({
        draftKey,
        hydratedDraftKey: formState ? draftKey : null,
        formState: formState ?? INITIAL_LIFE_RECORD_STATE,
      });
    },

    hydrateLifeRecord: ({ draftKey, formState }) => {
      const state = get();

      if (state.draftKey !== draftKey || state.hydratedDraftKey === draftKey) {
        return;
      }

      set({ formState, hydratedDraftKey: draftKey });
    },

    updateLifeRecord: (partialState) => {
      set((state) => ({ formState: { ...state.formState, ...partialState } }));
    },

    resetLifeRecord: () => {
      set({
        draftKey: null,
        hydratedDraftKey: null,
        formState: INITIAL_LIFE_RECORD_STATE,
      });
    },
  }),
);
