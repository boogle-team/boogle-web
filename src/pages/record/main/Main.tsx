import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import useCalendarMonthQuery from '@/pages/calendar/hooks/useCalendarMonthQuery';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';
import { useCreateBoogleRecordMutation } from '@/pages/record/hooks/useCreateBoogleRecordMutation';
import type { PostBoogleRecordRequestTypes } from '@/pages/record/types/boogleRecordApiTypes';
import { mapBoogleRecordRequest } from '@/pages/record/utils/boogleRecordRequestMapper';

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
  const parsedRecordDate = dayjs(recordDate);
  const { data: calendarMonth, refetch: refetchCalendarMonth } =
    useCalendarMonthQuery({
      year: parsedRecordDate.year(),
      month: parsedRecordDate.month() + 1,
    });
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

  const hasExistingBowelRecord = Boolean(
    calendarMonth?.days.some(
      (day) => day.date === recordDate && day.boogleStatus === 'BOWEL',
    ),
  );
  const hasBowelStatusConflict =
    hasExistingBowelRecord && formState.bowelStatus === 'no';

  const handleSubmit = () => {
    if (!isSubmittable || isCreatingRecord || hasBowelStatusConflict) return;

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

    createRecord(request, {
      onSuccess: async () => {
        const { data: latestCalendarMonth } = await refetchCalendarMonth();
        const hasLifeRecord = (latestCalendarMonth ?? calendarMonth)?.days.some(
          (day) => day.date === recordDate && day.hasLifeRecord,
        );

        resetDraft();

        if (!hasLifeRecord) {
          setIsLifeRecordModalOpen(true);
          return;
        }

        navigate('/');
      },
    });
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
    navigate('/');
  };

  // 생활 기록도 같은 날짜의 기록이므로 날짜를 그대로 넘긴다.
  const handleLifeRecordConfirm = () => {
    setIsLifeRecordModalOpen(false);
    navigate(`/life-record/new?date=${recordDate}`);
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      footer={
        <div className="flex flex-col gap-2">
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
            disabled={
              !isSubmittable || isCreatingRecord || hasBowelStatusConflict
            }
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
    </RecordPageLayout>
  );
};

export default Main;
