import { useMemo } from 'react';

import {
  INITIAL_MAIN_RECORD_STATE,
  useRecordDraftStore,
} from '@/pages/record/shared/stores/recordDraftStore';

import type {
  BowelStatusTypes,
  FeelingTypes,
  RecordTimeValueTypes,
  StoolTypeId,
} from '../types/recordTypes';

export const useRecordForm = () => {
  const formState = useRecordDraftStore((state) => state.main);
  const updateMain = useRecordDraftStore((state) => state.updateMain);
  const updateMainTime = useRecordDraftStore((state) => state.updateMainTime);

  const handleBowelStatusChange = (bowelStatus: BowelStatusTypes) => {
    // '없음'이면 하위 항목이 화면에서 사라지므로 값도 함께 되돌린다.
    // 그대로 두면 화면에 보이지 않는 값이 제출 payload에 섞여 들어간다.
    if (bowelStatus === 'no') {
      updateMain({
        bowelStatus,
        time: INITIAL_MAIN_RECORD_STATE.time,
        stoolType: INITIAL_MAIN_RECORD_STATE.stoolType,
        feeling: INITIAL_MAIN_RECORD_STATE.feeling,
        painLevel: INITIAL_MAIN_RECORD_STATE.painLevel,
      });
      return;
    }

    updateMain({ bowelStatus });
  };

  // 시/분/오전오후 휠은 각각 독립적으로 바뀌므로 부분 업데이트를 받는다.
  // 병합은 store에 맡긴다. 렌더 시점 formState를 기준으로 병합하면
  // 리렌더 전에 다른 휠 변경이 들어올 때 앞선 변경이 덮어써진다.
  const handleTimeChange = (partialTime: Partial<RecordTimeValueTypes>) => {
    updateMainTime(partialTime);
  };

  const handleStoolTypeChange = (stoolType: StoolTypeId) => {
    updateMain({ stoolType });
  };

  const handleFeelingChange = (feeling: FeelingTypes) => {
    updateMain({ feeling });
  };

  const handlePainLevelChange = (painLevel: number) => {
    updateMain({ painLevel });
  };

  const isSubmittable = useMemo(() => {
    if (formState.bowelStatus === 'no') {
      return true;
    }

    return formState.stoolType !== null;
  }, [formState.bowelStatus, formState.stoolType]);

  return {
    formState,
    isSubmittable,
    handleBowelStatusChange,
    handleTimeChange,
    handleStoolTypeChange,
    handleFeelingChange,
    handlePainLevelChange,
  };
};
