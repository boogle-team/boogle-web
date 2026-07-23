import dayjs from 'dayjs';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';

import { formatRecordDate } from '../main/utils/formatRecordDate';
import AmountField from './components/AmountField';
import BloatingField from './components/BloatingField';
import DurationField from './components/DurationField';
import StoolColorField from './components/StoolColorField';
import TenesmusField from './components/TenesmusField';
import UrgencyField from './components/UrgencyField';
import {
  ABNORMAL_COLOR_MODAL,
  ABNORMAL_STOOL_COLORS,
} from './constants/detailRecordConstants';
import { useDetailRecordForm } from './hooks/useDetailRecordForm';
import { buildAbnormalColorDescription } from './utils/buildAbnormalColorDescription';

const Detail = () => {
  const navigate = useNavigate();
  const [isAbnormalColorModalOpen, setIsAbnormalColorModalOpen] =
    useState(false);

  const recordDate = useRecordDraftStore((state) => state.recordDate);

  const {
    formState,
    isSubmittable,
    handleBloatingChange,
    handleTenesmusChange,
    handleUrgencyChange,
    handleDurationChange,
    handleAmountChange,
    handleStoolColorChange,
  } = useDetailRecordForm();

  const { stoolColor } = formState;
  const isAbnormalColorSelected =
    stoolColor !== null && ABNORMAL_STOOL_COLORS.includes(stoolColor);

  // 실제 저장은 메인 기록의 완료에서 한 번에 이뤄진다. 여기서는 초안에 담고 돌아간다.
  const handleSubmit = () => {
    if (!isSubmittable) return;

    if (isAbnormalColorSelected) {
      setIsAbnormalColorModalOpen(true);
      return;
    }

    navigate(-1);
  };

  const handleAbnormalColorConfirm = () => {
    setIsAbnormalColorModalOpen(false);
    navigate(-1);
  };

  return (
    <RecordPageLayout
      title="부글 세부 항목 기록"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-10"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
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

      <ConfirmModal
        isOpen={isAbnormalColorModalOpen}
        icon={
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-semantic-danger">
            <TriangleAlert
              className="h-5 w-5 text-beige-1"
              aria-hidden="true"
            />
          </span>
        }
        title={ABNORMAL_COLOR_MODAL.title}
        description={
          stoolColor ? buildAbnormalColorDescription(stoolColor) : undefined
        }
        confirmText={ABNORMAL_COLOR_MODAL.confirmText}
        confirmVariant="destructive"
        onConfirm={handleAbnormalColorConfirm}
      />
    </RecordPageLayout>
  );
};

export default Detail;
