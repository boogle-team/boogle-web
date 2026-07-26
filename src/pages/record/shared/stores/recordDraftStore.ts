import dayjs from 'dayjs';
import { create } from 'zustand';

import type { DetailRecordFormStateTypes } from '@/pages/record/detail/types/detailRecordTypes';
import type {
  RecordFormStateTypes,
  RecordTimeValueTypes,
} from '@/pages/record/main/types/recordTypes';

export const RECORD_DATE_FORMAT = 'YYYY-MM-DD';

export const INITIAL_MAIN_RECORD_STATE: RecordFormStateTypes = {
  bowelStatus: 'yes',
  time: { hour: 8, minute: 0, meridiem: 'PM' },
  stoolType: null,
  feeling: 'comfortable',
  painLevel: 0,
};

export const INITIAL_DETAIL_RECORD_STATE: DetailRecordFormStateTypes = {
  bloating: 'none',
  tenesmus: 'none',
  urgency: 'none',
  duration: null,
  amount: null,
  stoolColor: null,
};

interface StartDraftParamTypes {
  /** 같은 초안인지 판별하는 키. 새 기록은 날짜별, 수정은 기록별로 다르게 준다. */
  draftKey: string;
  recordDate: string;
  main?: RecordFormStateTypes;
  detail?: DetailRecordFormStateTypes;
}

interface RecordDraftStoreTypes {
  draftKey: string | null;
  recordDate: string;
  main: RecordFormStateTypes;
  detail: DetailRecordFormStateTypes;
  startDraft: (param: StartDraftParamTypes) => void;
  updateMain: (partialState: Partial<RecordFormStateTypes>) => void;
  updateMainTime: (partialTime: Partial<RecordTimeValueTypes>) => void;
  updateDetail: (partialState: Partial<DetailRecordFormStateTypes>) => void;
  resetDraft: () => void;
}

export const useRecordDraftStore = create<RecordDraftStoreTypes>(
  (set, get) => ({
    draftKey: null,
    recordDate: dayjs().format(RECORD_DATE_FORMAT),
    main: INITIAL_MAIN_RECORD_STATE,
    detail: INITIAL_DETAIL_RECORD_STATE,

    // 같은 키면 아무것도 하지 않는다. 세부 기록에서 돌아왔을 때 입력값이 날아가지 않도록.
    startDraft: ({ draftKey, recordDate, main, detail }) => {
      if (get().draftKey === draftKey) return;

      set({
        draftKey,
        recordDate,
        main: main ?? INITIAL_MAIN_RECORD_STATE,
        detail: detail ?? INITIAL_DETAIL_RECORD_STATE,
      });
    },

    updateMain: (partialState) => {
      set((state) => ({ main: { ...state.main, ...partialState } }));
    },

    // 시/분/오전오후 휠은 각각 독립적으로 바뀐다.
    // 같은 렌더 흐름에서 여러 휠의 onChange가 연달아 들어와도 서로 덮어쓰지 않도록
    // 호출 시점의 스냅샷이 아니라 항상 최신 state 기준으로 병합한다.
    updateMainTime: (partialTime) => {
      set((state) => ({
        main: { ...state.main, time: { ...state.main.time, ...partialTime } },
      }));
    },

    updateDetail: (partialState) => {
      set((state) => ({ detail: { ...state.detail, ...partialState } }));
    },

    resetDraft: () => {
      set({
        draftKey: null,
        recordDate: dayjs().format(RECORD_DATE_FORMAT),
        main: INITIAL_MAIN_RECORD_STATE,
        detail: INITIAL_DETAIL_RECORD_STATE,
      });
    },
  }),
);
