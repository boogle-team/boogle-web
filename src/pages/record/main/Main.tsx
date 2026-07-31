import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { useRecordDraftStore } from '@/pages/record/shared/stores/recordDraftStore';
import { useCreateBoogleRecordMutation } from '@/pages/record/hooks/useCreateBoogleRecordMutation';
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

// TODO: 해당 날짜의 생활 기록 존재 여부 조회 API 연동
const HAS_LIFE_RECORD = false;

const Main = () => {
  const navigate = useNavigate();
  const [isLifeRecordModalOpen, setIsLifeRecordModalOpen] = useState(false);

  const recordDate = useRecordDraftDate();
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

  const handleSubmit = () => {
    if (!isSubmittable || isCreatingRecord) return;

    const request = mapBoogleRecordRequest({
      recordDate,
      main: formState,
      detail: detailFormState,
    });

    createRecord(request, {
      onSuccess: () => {
        if (!HAS_LIFE_RECORD) {
          setIsLifeRecordModalOpen(true);
          return;
        }

        resetDraft();
        navigate('/');
      },
    });
  };

  const handleBackButtonClick = () => {
    resetDraft();
    navigate(-1);
  };

  const handleDetailRecordLinkClick = () => {
    navigate('/record/detail');
  };

  // 초안 리셋은 화면을 벗어날 때만 한다. 페이지에 남은 채로 리셋하면
  // store의 recordDate가 오늘로 돌아가 세부 기록 화면이 다른 날짜를 보게 된다.
  const handleLifeRecordCancel = () => {
    setIsLifeRecordModalOpen(false);
    resetDraft();
    navigate('/');
  };

  // 생활 기록도 같은 날짜의 기록이므로 날짜를 그대로 넘긴다.
  const handleLifeRecordConfirm = () => {
    setIsLifeRecordModalOpen(false);
    resetDraft();
    navigate(`/record/life?date=${recordDate}`);
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      footer={
        <div className="flex flex-col gap-2">
          {isCreateRecordError && (
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
            disabled={!isSubmittable || isCreatingRecord}
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
