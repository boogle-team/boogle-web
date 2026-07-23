import { useState } from 'react';

import type {
  AmountTypes,
  DetailRecordFormStateTypes,
  DurationTypes,
  SeverityTypes,
  StoolColorTypes,
} from '../types/detailRecordTypes';

const INITIAL_FORM_STATE: DetailRecordFormStateTypes = {
  bloating: 'none',
  tenesmus: 'none',
  urgency: 'none',
  duration: null,
  amount: null,
  stoolColor: null,
};

export const useDetailRecordForm = () => {
  const [formState, setFormState] =
    useState<DetailRecordFormStateTypes>(INITIAL_FORM_STATE);

  const handleBloatingChange = (bloating: SeverityTypes) => {
    setFormState((prev) => ({ ...prev, bloating }));
  };

  const handleTenesmusChange = (tenesmus: SeverityTypes) => {
    setFormState((prev) => ({ ...prev, tenesmus }));
  };

  const handleUrgencyChange = (urgency: SeverityTypes) => {
    setFormState((prev) => ({ ...prev, urgency }));
  };

  const handleDurationChange = (duration: DurationTypes) => {
    setFormState((prev) => ({ ...prev, duration }));
  };

  const handleAmountChange = (amount: AmountTypes) => {
    setFormState((prev) => ({ ...prev, amount }));
  };

  const handleStoolColorChange = (stoolColor: StoolColorTypes) => {
    setFormState((prev) => ({ ...prev, stoolColor }));
  };

  const isSubmittable = Object.values(formState).every(
    (fieldValue) => fieldValue !== null,
  );

  return {
    formState,
    isSubmittable,
    handleBloatingChange,
    handleTenesmusChange,
    handleUrgencyChange,
    handleDurationChange,
    handleAmountChange,
    handleStoolColorChange,
  };
};
