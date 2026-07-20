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

  const handleTimeChange = (time: RecordTimeValueTypes) => {
    setFormState((prev) => ({ ...prev, time }));
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
