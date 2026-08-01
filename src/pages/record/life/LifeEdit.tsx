import dayjs from 'dayjs';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import ConfirmModal from '@/shared/components/ConfirmModal';

import LifeRecordFields from './components/LifeRecordFields';
import { useDeleteLifeRecord } from './hooks/useDeleteLifeRecord';
import { useLifeRecord } from './hooks/useLifeRecord';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { usePatchLifeRecord } from './hooks/usePatchLifeRecord';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';
import {
  CAFFEINE_VALUE_BY_CODE,
  EXERCISE_VALUE_BY_CODE,
  FOOD_VALUE_BY_ID,
  HORMONE_VALUE_BY_CODE,
  MEAL_REGULAR_VALUE_BY_CODE,
  MEDICINE_VALUE_BY_ID,
  OUTING_VALUE_BY_CODE,
  SLEEP_TIME_VALUE_BY_NUMBER,
  SLEEP_VALUE_BY_CODE,
  STRESS_VALUE_BY_CODE,
  WATER_VALUE_BY_CODE,
} from './types/lifeRecordApiTypes';
import type { LifeRecordDetailResponseTypes } from './types/lifeRecordApiTypes';
import type { LifeRecordFormStateTypes } from './types/lifeRecordTypes';
import { createLifeRecordPayload } from './utils/createLifeRecordPayload';

const toLifeRecordFormState = (
  lifeRecord: LifeRecordDetailResponseTypes,
): LifeRecordFormStateTypes => {
  return {
    sleep: SLEEP_VALUE_BY_CODE[lifeRecord.sleep],
    stress: STRESS_VALUE_BY_CODE[lifeRecord.stress],
    mealRegularity: MEAL_REGULAR_VALUE_BY_CODE[lifeRecord.mealRegular],
    hydration: WATER_VALUE_BY_CODE[lifeRecord.water],
    foods: lifeRecord.foods
      .map(({ id }) => FOOD_VALUE_BY_ID[id])
      .filter((food): food is LifeRecordFormStateTypes['foods'][number] =>
        Boolean(food),
      ),
    memo: lifeRecord.memo ?? '',
    detailRecord: {
      sleepDuration:
        lifeRecord.sleepTime !== null
          ? SLEEP_TIME_VALUE_BY_NUMBER[lifeRecord.sleepTime]
          : null,
      exercise:
        lifeRecord.exercise !== null
          ? EXERCISE_VALUE_BY_CODE[lifeRecord.exercise]
          : null,
      caffeine:
        lifeRecord.caffeine !== null
          ? CAFFEINE_VALUE_BY_CODE[lifeRecord.caffeine]
          : null,
      waterIntake: lifeRecord.waterIntake,
      medicines: lifeRecord.medicines
        .map(({ id }) => MEDICINE_VALUE_BY_ID[id])
        .filter(
          (medicine): medicine is NonNullable<
            LifeRecordFormStateTypes['detailRecord']
          >['medicines'][number] => Boolean(medicine),
        ),
      outing:
        lifeRecord.outing !== null
          ? OUTING_VALUE_BY_CODE[lifeRecord.outing]
          : null,
      menstruation:
        lifeRecord.hormone !== null
          ? HORMONE_VALUE_BY_CODE[lifeRecord.hormone]
          : null,
    },
  };
};

const LifeEdit = () => {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const recordDate = useRecordDraftDate();
  const rawLifeId = Number(searchParams.get('lifeId') ?? recordId);
  const lifeId =
    Number.isFinite(rawLifeId) && rawLifeId > 0 ? rawLifeId : undefined;

  const { data: lifeRecord } = useLifeRecord(lifeId);
  const { mutate: patchLifeRecord, isPending: isPatchingLifeRecord } =
    usePatchLifeRecord();
  const { mutate: deleteLifeRecord, isPending: isDeletingLifeRecord } =
    useDeleteLifeRecord();
  const startLifeRecord = useLifeRecordDraftStore(
    (state) => state.startLifeRecord,
  );
  const updateLifeRecord = useLifeRecordDraftStore(
    (state) => state.updateLifeRecord,
  );
  const resetLifeRecord = useLifeRecordDraftStore(
    (state) => state.resetLifeRecord,
  );

  useLayoutEffect(() => {
    startLifeRecord({ draftKey: `edit-${lifeId ?? recordDate}` });
  }, [lifeId, recordDate, startLifeRecord]);

  useEffect(() => {
    if (!lifeRecord) return;

    updateLifeRecord(toLifeRecordFormState(lifeRecord));
  }, [lifeRecord, updateLifeRecord]);

  const form = useLifeRecordForm();
  const { formState, isSubmittable } = form;

  const handleBackButtonClick = () => {
    resetLifeRecord();
    navigate(-1);
  };

  const handleCancel = () => {
    resetLifeRecord();
    navigate(-1);
  };

  const handleSave = () => {
    if (!isSubmittable || !lifeId || isPatchingLifeRecord) return;

    const payload = createLifeRecordPayload({
      formState,
      recordDate,
    });

    if (!payload) return;

    const { regDate: _regDate, tagNames: _tagNames, ...requestBody } = payload;

    patchLifeRecord(
      { lifeId, requestBody },
      {
        onSuccess: () => {
          resetLifeRecord();
          navigate(-1);
        },
      },
    );
  };

  const handleDetailRecordLinkClick = () => {
    navigate(`/record/life/detail?date=${recordDate}`);
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!lifeId || isDeletingLifeRecord) return;

    deleteLifeRecord(lifeId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        resetLifeRecord();
        navigate(-1);
      },
    });
  };

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      isDeleteButtonVisible
      onDeleteButtonClick={handleDeleteButtonClick}
      footer={<CancelSaveButtons onCancel={handleCancel} onSave={handleSave} />}
    >
      <LifeRecordFields
        form={form}
        onDetailRecordLinkClick={handleDetailRecordLinkClick}
      />

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

export default LifeEdit;
