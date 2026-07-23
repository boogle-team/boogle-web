import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/shared/components/ConfirmModal';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';

import BowelStatusField from '../main/components/BowelStatusField';
import DetailRecordLink from '../main/components/DetailRecordLink';
import FeelingField from '../main/components/FeelingField';
import PainLevelField from '../main/components/PainLevelField';
import RecordTimeField from '../main/components/RecordTimeField';
import StoolTypeField from '../main/components/StoolTypeField';
import { useRecordForm } from '../main/hooks/useRecordForm';
import { formatRecordDate } from '../main/utils/formatRecordDate';

const Edit = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const recordDate = useRecordDraftDate();
  const startDraft = useRecordDraftStore((state) => state.startDraft);
  const resetDraft = useRecordDraftStore((state) => state.resetDraft);

  // 새 기록 작성 초안과 섞이지 않도록 수정 전용 키로 시작한다.
  // TODO: 라우트에 기록 id가 생기면 `edit-${recordId}` 키와 조회한 값으로 초안을 채운다.
  useLayoutEffect(() => {
    startDraft({ draftKey: 'edit', recordDate });
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

  const handleBackButtonClick = () => {
    resetDraft();
    navigate(-1);
  };

  const handleCancel = () => {
    resetDraft();
    navigate(-1);
  };

  const handleSave = () => {
    if (!isSubmittable) return;
    // TODO: 부글 기록 수정 API 연동 (메인 + 세부 항목을 함께 제출)
    resetDraft();
  };

  const handleDetailRecordLinkClick = () => {
    navigate('/record/detail');
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // TODO: 부글 기록 삭제 API 연동
    setIsDeleteModalOpen(false);
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      isDeleteButtonVisible
      onDeleteButtonClick={handleDeleteButtonClick}
      footer={<CancelSaveButtons onCancel={handleCancel} onSave={handleSave} />}
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

          <DetailRecordLink
            description="복부팽만 · 잔변감 · 변 색상 등"
            onClick={handleDetailRecordLinkClick}
          />
        </>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="기록을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제"
        confirmVariant="destructive"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </RecordPageLayout>
  );
};

export default Edit;
