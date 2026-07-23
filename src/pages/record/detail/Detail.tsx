import Button from '@/shared/components/Button';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';

import { formatRecordDate } from '../main/utils/formatRecordDate';
import AmountField from './components/AmountField';
import BloatingField from './components/BloatingField';
import DurationField from './components/DurationField';
import StoolColorField from './components/StoolColorField';
import TenesmusField from './components/TenesmusField';
import UrgencyField from './components/UrgencyField';
import { useDetailRecordForm } from './hooks/useDetailRecordForm';

const Detail = () => {
  const {
    formState,
    handleBloatingChange,
    handleTenesmusChange,
    handleUrgencyChange,
    handleDurationChange,
    handleAmountChange,
    handleStoolColorChange,
  } = useDetailRecordForm();

  const handleSubmit = () => {
    // TODO: 부글 세부 항목 기록 API 연동
  };

  return (
    <RecordPageLayout
      title="부글 세부 항목 기록"
      subTitle={formatRecordDate(new Date())}
      contentClassName="gap-10"
      footer={<Button text="완료" onClick={handleSubmit} disabled />}
    >
      <BloatingField
        value={formState.bloating}
        onChange={handleBloatingChange}
      />

      <TenesmusField
        value={formState.tenesmus}
        onChange={handleTenesmusChange}
      />

      <UrgencyField value={formState.urgency} onChange={handleUrgencyChange} />

      <DurationField
        value={formState.duration}
        onChange={handleDurationChange}
      />

      <AmountField value={formState.amount} onChange={handleAmountChange} />

      <StoolColorField
        value={formState.stoolColor}
        onChange={handleStoolColorChange}
      />
    </RecordPageLayout>
  );
};

export default Detail;
