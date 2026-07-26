import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';

import BowelStatusField from './components/BowelStatusField';
import DetailRecordLink from './components/DetailRecordLink';
import FeelingField from './components/FeelingField';
import PainLevelField from './components/PainLevelField';
import RecordTimeField from './components/RecordTimeField';
import StoolTypeField from './components/StoolTypeField';
import { LIFE_RECORD_MODAL } from './constants/recordConstants';
import { useRecordForm } from './hooks/useRecordForm';
import { formatRecordDate } from './utils/formatRecordDate';

// TODO: 해당 날짜의 생활 기록 존재 여부 조회 API 연동
const HAS_LIFE_RECORD = false;

const Main = () => {
  const navigate = useNavigate();
  const [isLifeRecordModalOpen, setIsLifeRecordModalOpen] = useState(false);

  const recordDate = useRecordDraftDate();
  const startDraft = useRecordDraftStore((state) => state.startDraft);
  const resetDraft = useRecordDraftStore((state) => state.resetDraft);

  // 날짜가 같으면 같은 초안으로 보고 유지한다. 세부 기록에서 돌아와도 값이 남아야 하므로.
  useLayoutEffect(() => {
    startDraft({ draftKey: `new-${recordDate}`, recordDate });
  }, [startDraft, recordDate]);

  const {
    formState,
    isSubmittable,
    handleBowelStatusChange,
    handleTimeChange,
    handleStoolTypeChange,
    handleFeelingChange,
    handlePainLevelChange,
  } = useRecordForm();

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 부글 기록 생성 API 연동 (메인 + 세부 항목을 함께 제출)

    if (!HAS_LIFE_RECORD) {
      setIsLifeRecordModalOpen(true);
      return;
    }

    resetDraft();
    // TODO: 기록 완료 후 이동할 화면 연결
  };

  const handleBackButtonClick = () => {
    resetDraft();
    navigate(-1);
  };

  const handleDetailRecordLinkClick = () => {
    navigate('/record/detail');
  };

  const handleLifeRecordCancel = () => {
    setIsLifeRecordModalOpen(false);
    resetDraft();
    // TODO: 기록 완료 후 이동할 화면 연결
  };

  const handleLifeRecordConfirm = () => {
    setIsLifeRecordModalOpen(false);
    resetDraft();
    // TODO: 생활 기록 페이지 라우트 연결
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      <BowelStatusField
        value={formState.bowelStatus}
        onChange={handleBowelStatusChange}
      />

      {formState.bowelStatus === 'yes' && (
        <>
          <RecordTimeField value={formState.time} onChange={handleTimeChange} />

          <StoolTypeField
            value={formState.stoolType}
            onChange={handleStoolTypeChange}
          />

          <FeelingField
            value={formState.feeling}
            onChange={handleFeelingChange}
          />

          <PainLevelField
            value={formState.painLevel}
            onChange={handlePainLevelChange}
          />

          <DetailRecordLink onClick={handleDetailRecordLinkClick} />
        </>
      )}

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

export default Main;
