import dayjs from 'dayjs';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import ConfirmModal from '@/shared/components/ConfirmModal';
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import NotFound from '@/shared/components/NotFound';
import { getApiErrorMessage, getApiErrorStatus } from '@/shared/apis/apiError';

import LifeRecordFields from './components/LifeRecordFields';
import { useDeleteLifeRecord } from './hooks/useDeleteLifeRecord';
import { useLifeRecord } from './hooks/useLifeRecord';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { useFoods } from './hooks/useFoods';
import { useMedicines } from './hooks/useMedicines';
import { usePatchLifeRecord } from './hooks/usePatchLifeRecord';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';
import {
  CAFFEINE_VALUE_BY_CODE,
  EXERCISE_VALUE_BY_CODE,
  HORMONE_VALUE_BY_CODE,
  MEAL_REGULAR_VALUE_BY_CODE,
  OUTING_VALUE_BY_CODE,
  SLEEP_TIME_VALUE_BY_NUMBER,
  SLEEP_VALUE_BY_CODE,
  STRESS_VALUE_BY_CODE,
  WATER_VALUE_BY_CODE,
} from './types/lifeRecordApiTypes';
import type { LifeRecordDetailResponseTypes } from './types/lifeRecordApiTypes';
import type { LifeRecordFormStateTypes } from './types/lifeRecordTypes';
import { createLifeRecordPatchPayload } from './utils/createLifeRecordPayload';
import { getLifeRecordErrorMessage } from './utils/lifeRecordErrorMessage';
import {
  getFoodIdByValue,
  getFoodValue,
  getMedicineIdByValue,
  getMedicineValue,
} from './utils/lifeRecordItemMapper';

const toLifeRecordFormState = (
  lifeRecord: LifeRecordDetailResponseTypes,
): LifeRecordFormStateTypes => {
  const medicines = lifeRecord.medicines
    .map(getMedicineValue)
    .filter(
      (
        medicine,
      ): medicine is NonNullable<
        LifeRecordFormStateTypes['detailRecord']
      >['medicines'][number] => Boolean(medicine),
    );
  const hasDetailRecord =
    lifeRecord.sleepTime !== null ||
    lifeRecord.exercise !== null ||
    lifeRecord.caffeine !== null ||
    medicines.length > 0 ||
    lifeRecord.outing !== null ||
    lifeRecord.hormone !== null;

  return {
    sleep: SLEEP_VALUE_BY_CODE[lifeRecord.sleep],
    stress: STRESS_VALUE_BY_CODE[lifeRecord.stress],
    mealRegularity: MEAL_REGULAR_VALUE_BY_CODE[lifeRecord.mealRegular],
    hydration: WATER_VALUE_BY_CODE[lifeRecord.water],
    foods: lifeRecord.foods
      .map(getFoodValue)
      .filter((food): food is LifeRecordFormStateTypes['foods'][number] =>
        Boolean(food),
      ),
    memo: lifeRecord.memo ?? '',
    detailRecord: hasDetailRecord
      ? {
          sleepDuration:
            lifeRecord.sleepTime !== null
              ? (SLEEP_TIME_VALUE_BY_NUMBER[lifeRecord.sleepTime] ?? null)
              : null,
          exercise:
            lifeRecord.exercise !== null
              ? (EXERCISE_VALUE_BY_CODE[lifeRecord.exercise] ?? null)
              : null,
          caffeine:
            lifeRecord.caffeine !== null
              ? (CAFFEINE_VALUE_BY_CODE[lifeRecord.caffeine] ?? null)
              : null,
          waterIntake: lifeRecord.waterIntake,
          medicines,
          outing:
            lifeRecord.outing !== null
              ? (OUTING_VALUE_BY_CODE[lifeRecord.outing] ?? null)
              : null,
          menstruation:
            lifeRecord.hormone !== null
              ? (HORMONE_VALUE_BY_CODE[lifeRecord.hormone] ?? null)
              : null,
        }
      : null,
  };
};

const LifeEdit = () => {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const recordDate = useRecordDraftDate();
  const rawLifeId = Number(searchParams.get('lifeId') ?? recordId);
  const lifeId =
    Number.isFinite(rawLifeId) && rawLifeId > 0 ? rawLifeId : undefined;

  const {
    data: lifeRecord,
    error: lifeRecordError,
    isFetching: isLifeRecordFetching,
    isLoadingError: isLifeRecordLoadingError,
    isPending: isLifeRecordPending,
    refetch: refetchLifeRecord,
  } = useLifeRecord(lifeId);
  const editRecordDate = lifeRecord?.regDate ?? recordDate;
  const editDraftKey = `edit-${lifeId ?? recordDate}`;
  const { mutate: patchLifeRecord, isPending: isPatchingLifeRecord } =
    usePatchLifeRecord();
  const { mutate: deleteLifeRecord, isPending: isDeletingLifeRecord } =
    useDeleteLifeRecord();
  const startLifeRecord = useLifeRecordDraftStore(
    (state) => state.startLifeRecord,
  );
  const draftKey = useLifeRecordDraftStore((state) => state.draftKey);
  const hydratedDraftKey = useLifeRecordDraftStore(
    (state) => state.hydratedDraftKey,
  );
  const hydrateLifeRecord = useLifeRecordDraftStore(
    (state) => state.hydrateLifeRecord,
  );
  const resetLifeRecord = useLifeRecordDraftStore(
    (state) => state.resetLifeRecord,
  );

  useLayoutEffect(() => {
    startLifeRecord({ draftKey: editDraftKey });
  }, [editDraftKey, startLifeRecord]);

  useEffect(() => {
    if (!lifeRecord) return;

    hydrateLifeRecord({
      draftKey: editDraftKey,
      formState: toLifeRecordFormState(lifeRecord),
    });
  }, [editDraftKey, hydrateLifeRecord, lifeRecord]);

  const { data: foodsData, isFetching: isFoodsFetching } = useFoods();
  const { data: medicinesData, isFetching: isMedicinesFetching } =
    useMedicines();
  const isReferenceDataFetching = isFoodsFetching || isMedicinesFetching;
  const foodIdByValue = useMemo(
    () =>
      getFoodIdByValue([
        ...(foodsData?.items ?? []),
        ...(lifeRecord?.foods ?? []),
      ]),
    [foodsData?.items, lifeRecord?.foods],
  );
  const medicineIdByValue = useMemo(
    () =>
      getMedicineIdByValue([
        ...(medicinesData?.items ?? []),
        ...(lifeRecord?.medicines ?? []),
      ]),
    [lifeRecord?.medicines, medicinesData?.items],
  );

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
    if (
      !isSubmittable ||
      !lifeId ||
      isPatchingLifeRecord ||
      isReferenceDataFetching
    ) {
      return;
    }

    const patchRequestBody = createLifeRecordPatchPayload({
      formState,
      foodIdByValue,
      medicineIdByValue,
    });

    if (!patchRequestBody) {
      setErrorMessage(
        '선택 항목 정보를 확인하지 못했어요. 잠시 후 다시 시도해 주세요.',
      );
      return;
    }

    setErrorMessage('');

    patchLifeRecord(
      { lifeId, requestBody: patchRequestBody },
      {
        onSuccess: () => {
          resetLifeRecord();
          navigate(-1);
        },
        onError: (error) => {
          setErrorMessage(getLifeRecordErrorMessage(error));
        },
      },
    );
  };

  const handleDetailRecordLinkClick = () => {
    navigate(`/life-record/detail?date=${editRecordDate}`);
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
      onError: (error) => {
        setErrorMessage(getLifeRecordErrorMessage(error));
      },
    });
  };

  const isLifeRecordNotFound =
    !lifeId || getApiErrorStatus(lifeRecordError) === 404;
  const isLifeRecordReady =
    draftKey === editDraftKey && hydratedDraftKey === editDraftKey;

  if (isLifeRecordNotFound) return <NotFound />;

  if (
    isLifeRecordPending ||
    (isLifeRecordFetching && !lifeRecord) ||
    (lifeRecord && !isLifeRecordReady)
  ) {
    return (
      <div className="min-h-dvh bg-beige-5">
        <LoadingSpinner message="생활 기록을 불러오는 중이에요" />
      </div>
    );
  }

  if (isLifeRecordLoadingError) {
    return (
      <RecordPageLayout title="생활 기록하기">
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p role="alert" className="body-m text-gray-7">
            {getApiErrorMessage(
              lifeRecordError,
              '생활 기록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
            )}
          </p>
          <Button
            className="max-w-40"
            text="다시 시도"
            size="sm"
            onClick={() => void refetchLifeRecord()}
          />
        </div>
      </RecordPageLayout>
    );
  }

  if (!lifeRecord) return <NotFound />;

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(editRecordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      isDeleteButtonVisible
      onDeleteButtonClick={handleDeleteButtonClick}
      footer={
        <CancelSaveButtons
          onCancel={handleCancel}
          onSave={handleSave}
          cancelDisabled={isPatchingLifeRecord}
          saveDisabled={
            !isSubmittable || isPatchingLifeRecord || isReferenceDataFetching
          }
        />
      }
    >
      <LifeRecordFields
        form={form}
        onDetailRecordLinkClick={handleDetailRecordLinkClick}
      />

      {errorMessage && (
        <p
          className="caption rounded-xl bg-orange-1 px-4 py-3 text-orange-6"
          role="alert"
        >
          {errorMessage}
        </p>
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

export default LifeEdit;
