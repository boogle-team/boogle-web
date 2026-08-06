import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmModal from '@/shared/components/ConfirmModal';
import { useDeleteBoogleRecordMutation } from '@/pages/record/hooks/useDeleteBoogleRecordMutation';
import { useBoogleRecordQuery } from '@/pages/record/hooks/useBoogleRecordQuery';
import { useUpdateBoogleRecordMutation } from '@/pages/record/hooks/useUpdateBoogleRecordMutation';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';
import type { PostBoogleRecordRequestTypes } from '@/pages/record/types/boogleRecordApiTypes';
import { mapBoogleRecordRequest } from '@/pages/record/utils/boogleRecordRequestMapper';
import { mapBoogleRecordResponseToDraft } from '@/pages/record/utils/boogleRecordResponseMapper';

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
  const { recordId: recordIdParam } = useParams<{ recordId: string }>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequestMappingError, setIsRequestMappingError] = useState(false);

  const recordId = Number(recordIdParam);
  const isRecordIdValid = Number.isInteger(recordId) && recordId > 0;
  const {
    data: boogleRecord,
    isLoading: isBoogleRecordLoading,
    isError: isBoogleRecordError,
  } = useBoogleRecordQuery(isRecordIdValid ? recordId : undefined);
  const {
    mutate: deleteBoogleRecord,
    isPending: isDeletingRecord,
    isError: isDeleteRecordError,
  } = useDeleteBoogleRecordMutation();
  const {
    mutate: updateBoogleRecord,
    isPending: isUpdatingRecord,
    isError: isUpdateRecordError,
  } = useUpdateBoogleRecordMutation();

  const recordDate = useRecordDraftStore((state) => state.recordDate);
  const detailFormState = useRecordDraftStore((state) => state.detail);
  const startDraft = useRecordDraftStore((state) => state.startDraft);
  const resetDraft = useRecordDraftStore((state) => state.resetDraft);

  useLayoutEffect(() => {
    if (!boogleRecord) return;

    const draft = mapBoogleRecordResponseToDraft(boogleRecord);

    startDraft({
      draftKey: `edit-${boogleRecord.id}`,
      ...draft,
    });
  }, [boogleRecord, startDraft]);

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
    navigate('/');
  };

  const handleSave = () => {
    if (!isSubmittable || !isRecordIdValid || isUpdatingRecord) return;

    setIsRequestMappingError(false);

    let request: PostBoogleRecordRequestTypes;

    try {
      request = mapBoogleRecordRequest({
        recordDate,
        main: formState,
        detail: detailFormState,
      });
    } catch {
      setIsRequestMappingError(true);
      return;
    }

    updateBoogleRecord(
      { recordId, request },
      {
        onSuccess: () => {
          resetDraft();
          navigate('/');
        },
      },
    );
  };

  const handleDetailRecordLinkClick = () => {
    navigate('/boogle-record/detail');
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!isRecordIdValid || isDeletingRecord) return;

    deleteBoogleRecord(recordId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        resetDraft();
        navigate('/');
      },
    });
  };

  if (!isRecordIdValid || isBoogleRecordError) {
    return (
      <RecordPageLayout title="부글 기록하기">
        <p className="body-m-bold py-12 text-center text-gray-8">
          기록을 불러오지 못했어요.
        </p>
      </RecordPageLayout>
    );
  }

  if (isBoogleRecordLoading || !boogleRecord) {
    return (
      <RecordPageLayout title="부글 기록하기">
        <p className="body-m py-12 text-center text-gray-7">
          기록을 불러오는 중입니다.
        </p>
      </RecordPageLayout>
    );
  }

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      isDeleteButtonVisible
      onDeleteButtonClick={handleDeleteButtonClick}
      footer={
        <div className="flex flex-col gap-2">
          {(isUpdateRecordError || isRequestMappingError) && (
            <p
              role="alert"
              className="caption text-center text-semantic-danger"
            >
              기록을 수정하지 못했어요. 다시 시도해주세요.
            </p>
          )}
          <CancelSaveButtons
            saveLabel={isUpdatingRecord ? '저장 중...' : '저장하기'}
            onCancel={handleCancel}
            onSave={handleSave}
            cancelDisabled={isUpdatingRecord}
            saveDisabled={!isSubmittable || isUpdatingRecord}
          />
        </div>
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

          <DetailRecordLink
            description="복부팽만 · 잔변감 · 변 색상 등"
            onClick={handleDetailRecordLinkClick}
          />
        </>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="기록을 삭제할까요?"
        description={
          isDeleteRecordError
            ? '기록을 삭제하지 못했어요. 다시 시도해주세요.'
            : undefined
        }
        cancelText="취소"
        confirmText={isDeletingRecord ? '삭제 중...' : '삭제'}
        confirmVariant="destructive"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </RecordPageLayout>
  );
};

export default Edit;
