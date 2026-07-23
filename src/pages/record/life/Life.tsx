import dayjs from 'dayjs';

import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import Button from '@/shared/components/Button';

import OptionChipField from './components/OptionChipField';
import {
  HYDRATION_OPTIONS,
  MEAL_REGULARITY_OPTIONS,
  SLEEP_OPTIONS,
  STRESS_OPTIONS,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';

const Life = () => {
  const recordDate = useRecordDraftDate();

  const {
    formState,
    isSubmittable,
    handleSleepChange,
    handleStressChange,
    handleMealRegularityChange,
    handleHydrationChange,
  } = useLifeRecordForm();

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 생활 기록 저장 API 연동 후 L-03(태그 추천 모달) 노출
  };

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      <OptionChipField
        title="수면"
        options={SLEEP_OPTIONS}
        value={formState.sleep}
        onChange={handleSleepChange}
      />

      <OptionChipField
        title="스트레스"
        options={STRESS_OPTIONS}
        value={formState.stress}
        onChange={handleStressChange}
      />

      <OptionChipField
        title="식사 규칙성"
        options={MEAL_REGULARITY_OPTIONS}
        value={formState.mealRegularity}
        onChange={handleMealRegularityChange}
      />

      <OptionChipField
        title="수분"
        options={HYDRATION_OPTIONS}
        value={formState.hydration}
        onChange={handleHydrationChange}
      />

      {/* TODO: 오늘 먹은 것 · 특이 사항 메모 · 더 자세히 기록하기 */}
    </RecordPageLayout>
  );
};

export default Life;
