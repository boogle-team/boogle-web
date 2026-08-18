import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';
import { useCreateBoogleRecordMutation } from '@/pages/record/hooks/useCreateBoogleRecordMutation';
import type { PostBoogleRecordRequestTypes } from '@/pages/record/types/boogleRecordApiTypes';
import { mapBoogleRecordRequest } from '@/pages/record/utils/boogleRecordRequestMapper';
import useDailyRecordQuery from '@/shared/hooks/useDailyRecordQuery';

import BowelStatusField from './components/BowelStatusField';
import DetailRecordLink from './components/DetailRecordLink';
import FeelingField from './components/FeelingField';
import PainLevelField from './components/PainLevelField';
import RecordTimeField from './components/RecordTimeField';
import StoolTypeField from './components/StoolTypeField';
import { LIFE_RECORD_MODAL } from './constants/recordConstants';
import { useRecordForm } from './hooks/useRecordForm';
import { formatRecordDate } from './utils/formatRecordDate';

const Main = () => {
  const navigate = useNavigate();
  const [isLifeRecordModalOpen, setIsLifeRecordModalOpen] = useState(false);
  const [isRequestMappingError, setIsRequestMappingError] = useState(false);

  const recordDate = useRecordDraftDate();
  const {
    data: dailyRecord,
    isError: isDailyRecordError,
    fetchStatus: dailyRecordFetchStatus,
    refetch: refetchDailyRecord,
  } = useDailyRecordQuery(recordDate);
  const startDraft = useRecordDraftStore((state) => state.startDraft);
  const resetDraft = useRecordDraftStore((state) => state.resetDraft);
  const detailFormState = useRecordDraftStore((state) => state.detail);
  const {
    mutate: createRecord,
    isPending: isCreatingRecord,
    isError: isCreateRecordError,
  } = useCreateBoogleRecordMutation();

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

  // 캐시에 남은 예전 응답으로 판단하지 않도록 재조회 중에는 항상 확인 중으로 본다.
  // (생활 기록을 먼저 저장한 날의 부글 기록에서 특히 중요하다.)
  const isDailyRecordChecking = dailyRecordFetchStatus !== 'idle';
  const hasExistingBoogleRecord = Boolean(dailyRecord?.boogleRecords.length);
  const hasBowelStatusConflict =
    hasExistingBoogleRecord && formState.bowelStatus === 'no';
  // 조회로 확인한 결과 생활 기록이 없을 때만 유도한다. 확인하지 못했으면 유도하지 않는다.
  const shouldSuggestLifeRecord = Boolean(
    dailyRecord && !dailyRecord.lifeRecord,
  );
  const isSubmitBlocked =
    !isSubmittable ||
    isCreatingRecord ||
    isDailyRecordChecking ||
    isDailyRecordError ||
    hasBowelStatusConflict;

  const handleSubmit = () => {
    if (isSubmitBlocked) return;

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

    createRecord(
      { request, existingBoogleRecords: dailyRecord?.boogleRecords ?? [] },
      {
        onSuccess: () => {
          resetDraft();

          if (shouldSuggestLifeRecord) {
            setIsLifeRecordModalOpen(true);
            return;
          }

          navigate('/home', { replace: true });
        },
      },
    );
  };

  const handleBackButtonClick = () => {
    resetDraft();
    navigate(-1);
  };

  const handleDetailRecordLinkClick = () => {
    navigate(`/boogle-record/detail?date=${recordDate}`);
  };

  const handleLifeRecordCancel = () => {
    setIsLifeRecordModalOpen(false);
    navigate('/home', { replace: true });
  };

  // 생활 기록도 같은 날짜의 기록이므로 날짜를 그대로 넘긴다.
  const handleLifeRecordConfirm = () => {
    setIsLifeRecordModalOpen(false);
    navigate(`/life-record/new?date=${recordDate}`);
  };

  const handleDailyRecordRetryClick = () => {
    void refetchDailyRecord();
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      footer={
        <div className="flex flex-col gap-2">
          {isDailyRecordError && (
            <div className="flex flex-col items-center gap-2">
              <p
                role="alert"
                className="caption text-center text-semantic-danger"
              >
                기록 상태를 확인하지 못했어요. 다시 시도해 주세요.
              </p>
              <Button
                className="max-w-40"
                text="다시 시도"
                size="sm"
                variant="ghost"
                onClick={handleDailyRecordRetryClick}
              />
            </div>
          )}
          {(isCreateRecordError || isRequestMappingError) && (
            <p
              role="alert"
              className="caption text-center text-semantic-danger"
            >
              기록을 저장하지 못했어요. 다시 시도해주세요.
            </p>
          )}
          <Button
            text={isCreatingRecord ? '저장 중...' : '완료'}
            onClick={handleSubmit}
            disabled={isSubmitBlocked}
          />
        </div>
      }
    >
      <BowelStatusField
        value={formState.bowelStatus}
        hasNoOptionError={hasBowelStatusConflict}
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
        isOpen={isLifeRecordModalOpen}
        title={LIFE_RECORD_MODAL.title}
        description={LIFE_RECORD_MODAL.description}
        cancelText={LIFE_RECORD_MODAL.cancelText}
        confirmText={LIFE_RECORD_MODAL.confirmText}
        onCancel={handleLifeRecordCancel}
        onConfirm={handleLifeRecordConfirm}
      />

      {isCreatingRecord && (
        <LoadingSpinner
          hasBackdrop
          zIndexClassName="z-[60]"
          message="기록을 저장하는 중입니다."
        />
      )}
    </RecordPageLayout>
  );
};

export default Main;
