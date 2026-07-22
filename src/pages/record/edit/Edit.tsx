import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/shared/components/ConfirmModal';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';

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
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    if (!isSubmittable) return;
    // TODO: 부글 기록 수정 API 연동
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
        subTitle={formatRecordDate(new Date())}
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

            <DetailRecordLink />
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
