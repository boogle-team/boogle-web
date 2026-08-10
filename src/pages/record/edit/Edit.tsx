import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import NotFound from '@/shared/components/NotFound';
import { getApiErrorMessage, getApiErrorStatus } from '@/shared/apis/apiError';
import { useDeleteBoogleRecordMutation } from '@/pages/record/hooks/useDeleteBoogleRecordMutation';
import { useBoogleRecordQuery } from '@/pages/record/hooks/useBoogleRecordQuery';
import { useUpdateBoogleRecordMutation } from '@/pages/record/hooks/useUpdateBoogleRecordMutation';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';
import type { PatchBoogleRecordRequestTypes } from '@/pages/record/types/boogleRecordApiTypes';
import { mapBoogleRecordPatchRequest } from '@/pages/record/utils/boogleRecordRequestMapper';
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
  const [isDeleteTransitionPending, setIsDeleteTransitionPending] =
    useState(false);
  const [isRequestMappingError, setIsRequestMappingError] = useState(false);

  const recordId = Number(recordIdParam);
  const isRecordIdValid = Number.isInteger(recordId) && recordId > 0;
  const {
    data: boogleRecord,
    error: boogleRecordError,
    isFetching: isBoogleRecordFetching,
    isLoading: isBoogleRecordLoading,
    isError: isBoogleRecordError,
    refetch: refetchBoogleRecord,
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
    navigate('/home', { replace: true });
  };

  const handleSave = () => {
    if (!isSubmittable || !isRecordIdValid || isUpdatingRecord) return;

    setIsRequestMappingError(false);

    let request: PatchBoogleRecordRequestTypes;

    try {
      request = mapBoogleRecordPatchRequest({
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
          navigate('/home', { replace: true });
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

    setIsDeleteTransitionPending(true);

    deleteBoogleRecord(recordId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        resetDraft();
        navigate('/home', { replace: true });
      },
      onError: () => {
        setIsDeleteTransitionPending(false);
      },
    });
  };

  const handleBoogleRecordRetryClick = () => {
    void refetchBoogleRecord();
  };

  const isBoogleRecordNotFound =
    !isRecordIdValid || getApiErrorStatus(boogleRecordError) === 404;

  if (isDeleteTransitionPending) {
    return (
      <div className="min-h-dvh bg-beige-5">
        <LoadingSpinner hasBackdrop message="기록을 삭제하는 중입니다." />
      </div>
    );
  }

  if (isBoogleRecordNotFound) {
    return <NotFound />;
  }

  if (isBoogleRecordLoading || (isBoogleRecordFetching && !boogleRecord)) {
    return (
      <div className="min-h-dvh bg-beige-5">
        <LoadingSpinner message="기록을 불러오는 중입니다." />
      </div>
    );
  }

  if (isBoogleRecordError) {
    return (
      <RecordPageLayout title="부글 기록하기">
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p role="alert" className="body-m text-gray-7">
            {getApiErrorMessage(
              boogleRecordError,
              '기록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
            )}
          </p>
          <Button
            className="max-w-40"
            text="다시 시도"
            size="sm"
            onClick={handleBoogleRecordRetryClick}
          />
        </div>
      </RecordPageLayout>
    );
  }

  if (!boogleRecord) return null;

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

      {isUpdatingRecord && (
        <LoadingSpinner
          hasBackdrop
          zIndexClassName="z-[60]"
          message="기록을 저장하는 중입니다."
        />
      )}
    </RecordPageLayout>
  );
};

export default Edit;
