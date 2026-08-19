import { useMemo } from 'react';

import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';

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

  // '없음'이면 하위 항목이 화면에서 사라지지만 값은 그대로 둔다.
  // 요청 매퍼가 hasBowel이 false일 때 배변 상세를 읽지 않으므로 payload에 섞이지 않고,
  // 실수로 토글했다가 되돌렸을 때 기존 기록의 시각·형태·느낌이 살아남는다.
  const handleBowelStatusChange = (bowelStatus: BowelStatusTypes) => {
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
