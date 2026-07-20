import { useMemo, useState } from 'react';

import type {
  BowelStatusTypes,
  FeelingTypes,
  RecordFormStateTypes,
  RecordTimeValueTypes,
  StoolTypeId,
} from '../types/recordTypes';

const INITIAL_RECORD_FORM_STATE: RecordFormStateTypes = {
  bowelStatus: 'yes',
  time: { hour: 8, minute: 0, meridiem: 'PM' },
  stoolType: null,
  feeling: 'comfortable',
  painLevel: 0,
};

export const useRecordForm = (
  initialState: RecordFormStateTypes = INITIAL_RECORD_FORM_STATE,
) => {
  const [formState, setFormState] =
    useState<RecordFormStateTypes>(initialState);

  const handleBowelStatusChange = (bowelStatus: BowelStatusTypes) => {
    setFormState((prev) => ({ ...prev, bowelStatus }));
  };

  // 시/분/오전오후 휠은 각각 독립적으로 바뀌므로 부분 업데이트를 받는다.
  // 병합을 prev 기준으로 해야 여러 휠의 변경이 연속으로 들어와도 서로 덮어쓰지 않는다.
  const handleTimeChange = (partialTime: Partial<RecordTimeValueTypes>) => {
    setFormState((prev) => ({
      ...prev,
      time: { ...prev.time, ...partialTime },
    }));
  };

  const handleStoolTypeChange = (stoolType: StoolTypeId) => {
    setFormState((prev) => ({ ...prev, stoolType }));
  };

  const handleFeelingChange = (feeling: FeelingTypes) => {
    setFormState((prev) => ({ ...prev, feeling }));
  };

  const handlePainLevelChange = (painLevel: number) => {
    setFormState((prev) => ({ ...prev, painLevel }));
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
