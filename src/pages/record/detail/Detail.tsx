import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';

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
  LIFE_RECORD_MODAL,
} from './constants/detailRecordConstants';
import { useDetailRecordForm } from './hooks/useDetailRecordForm';
import { buildAbnormalColorDescription } from './utils/buildAbnormalColorDescription';

const Detail = () => {
  const [isAbnormalColorModalOpen, setIsAbnormalColorModalOpen] =
    useState(false);
  const [isLifeRecordModalOpen, setIsLifeRecordModalOpen] = useState(false);

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

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 부글 세부 항목 기록 API 연동

    // 주의 색상을 골랐다면 안내를 먼저 보여주고, 확인 후 생활 기록 유도로 이어간다.
    if (isAbnormalColorSelected) {
      setIsAbnormalColorModalOpen(true);
      return;
    }

    setIsLifeRecordModalOpen(true);
  };

  const handleAbnormalColorConfirm = () => {
    setIsAbnormalColorModalOpen(false);
    setIsLifeRecordModalOpen(true);
  };

  const handleLifeRecordCancel = () => {
    setIsLifeRecordModalOpen(false);
    // TODO: 기록 완료 후 이동할 화면 연결
  };

  const handleLifeRecordConfirm = () => {
    setIsLifeRecordModalOpen(false);
    // TODO: 생활 기록 페이지 라우트 연결
  };

  return (
    <RecordPageLayout
      title="부글 세부 항목 기록"
      subTitle={formatRecordDate(new Date())}
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

      <ConfirmModal
        isOpen={isLifeRecordModalOpen}
        title={LIFE_RECORD_MODAL.title}
        description={LIFE_RECORD_MODAL.description}
        cancelText={LIFE_RECORD_MODAL.cancelText}
        confirmText={LIFE_RECORD_MODAL.confirmText}
        onCancel={handleLifeRecordCancel}
        onConfirm={handleLifeRecordConfirm}
      />
    </RecordPageLayout>
  );
};

export default Detail;
