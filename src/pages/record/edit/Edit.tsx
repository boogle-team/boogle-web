import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/shared/components/ConfirmModal';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
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
    <div className="flex min-h-screen flex-col bg-beige-1 pt-12.25">
      <TopNavigation
        variant="detail"
        title="부글 기록하기"
        subTitle={formatRecordDate(dayjs(recordDate).toDate())}
        onBackButtonClick={handleBackButtonClick}
        isDeleteButtonVisible
        onDeleteButtonClick={handleDeleteButtonClick}
      />

      <div className="flex flex-1 flex-col gap-12 px-layout pt-6 pb-[11.1275rem]">
        <BowelStatusField
          value={formState.bowelStatus}
          onChange={handleBowelStatusChange}
        />

        {formState.bowelStatus === 'yes' && (
          <>
            <RecordTimeField
              value={formState.time}
              onChange={handleTimeChange}
            />

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
      </div>

      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-107.5 -translate-x-1/2 px-layout pt-4 pb-[3.69rem]">
        <CancelSaveButtons onCancel={handleCancel} onSave={handleSave} />
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="기록을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제"
        confirmVariant="destructive"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Edit;
