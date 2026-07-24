import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import Button from '@/shared/components/Button';

import MedicineField from './components/MedicineField';
import MenstruationField from './components/MenstruationField';
import SegmentedChipField from './components/SegmentedChipField';
import WaterIntakeField from './components/WaterIntakeField';
import {
  CAFFEINE_OPTIONS,
  EXERCISE_OPTIONS,
  OUTING_OPTIONS,
  SLEEP_DURATION_OPTIONS,
} from './constants/lifeDetailRecordConstants';
import { useLifeDetailRecordForm } from './hooks/useLifeDetailRecordForm';

// TODO: 민감정보 수집 동의 조회 API로 교체
const IS_SENSITIVE_INFO_CONSENTED = false;

/** L-02 생활 세부 항목 기록. 완료하면 세부값을 반영한 채 L-01로 돌아간다. */
const LifeDetail = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  const {
    formState,
    isSubmittable,
    handleSleepDurationChange,
    handleExerciseChange,
    handleCaffeineChange,
    handleWaterIntakeChange,
    handleMedicineToggle,
    handleOutingChange,
    handleMenstruationChange,
  } = useLifeDetailRecordForm({
    isSensitiveInfoConsented: IS_SENSITIVE_INFO_CONSENTED,
  });

  const handleSubmit = () => {
    if (!isSubmittable) return;

    navigate(-1);
  };

  const handleConsentLinkClick = () => {
    navigate('/settings/sensitive-consent');
  };

  return (
    <RecordPageLayout
      title="생활 세부 항목 기록"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      <SegmentedChipField
        title="수면 시간"
        options={SLEEP_DURATION_OPTIONS}
        value={formState.sleepDuration}
        onChange={handleSleepDurationChange}
      />

      <SegmentedChipField
        title="운동"
        options={EXERCISE_OPTIONS}
        value={formState.exercise}
        onChange={handleExerciseChange}
      />

      <SegmentedChipField
        title="카페인"
        options={CAFFEINE_OPTIONS}
        value={formState.caffeine}
        onChange={handleCaffeineChange}
      />

      <WaterIntakeField
        value={formState.waterIntake}
        onChange={handleWaterIntakeChange}
      />

      <MedicineField
        value={formState.medicines}
        onToggle={handleMedicineToggle}
      />

      <SegmentedChipField
        title="외출·여행"
        options={OUTING_OPTIONS}
        value={formState.outing}
        onChange={handleOutingChange}
      />

      <MenstruationField
        isSensitiveInfoConsented={IS_SENSITIVE_INFO_CONSENTED}
        value={formState.menstruation}
        onChange={handleMenstruationChange}
        onConsentLinkClick={handleConsentLinkClick}
      />
    </RecordPageLayout>
  );
};

export default LifeDetail;
