import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';

import type {
  AmountTypes,
  DurationTypes,
  SeverityTypes,
  StoolColorTypes,
} from '../types/detailRecordTypes';

export const useDetailRecordForm = () => {
  const formState = useRecordDraftStore((state) => state.detail);
  const updateDetail = useRecordDraftStore((state) => state.updateDetail);

  const handleBloatingChange = (bloating: SeverityTypes) => {
    updateDetail({ bloating });
  };

  const handleTenesmusChange = (tenesmus: SeverityTypes) => {
    updateDetail({ tenesmus });
  };

  const handleUrgencyChange = (urgency: SeverityTypes) => {
    updateDetail({ urgency });
  };

  const handleDurationChange = (duration: DurationTypes) => {
    updateDetail({ duration });
  };

  const handleAmountChange = (amount: AmountTypes) => {
    updateDetail({ amount });
  };

  const handleStoolColorChange = (stoolColor: StoolColorTypes) => {
    updateDetail({ stoolColor });
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
