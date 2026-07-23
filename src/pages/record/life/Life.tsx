import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import DetailRecordLink from '@/pages/record/main/components/DetailRecordLink';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import Button from '@/shared/components/Button';

import FoodField from './components/FoodField';
import MemoField from './components/MemoField';
import OptionChipField from './components/OptionChipField';
import {
  HYDRATION_OPTIONS,
  MEAL_REGULARITY_OPTIONS,
  SLEEP_OPTIONS,
  STRESS_OPTIONS,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';

const Life = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  const {
    formState,
    isSubmittable,
    handleSleepChange,
    handleStressChange,
    handleMealRegularityChange,
    handleHydrationChange,
    handleFoodToggle,
    handleMemoChange,
  } = useLifeRecordForm();

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 생활 기록 저장 API 연동 후 L-03(태그 추천 모달) 노출
  };

  const handleDetailRecordLinkClick = () => {
    // TODO: L-02(생활 세부 항목 기록) 라우트 연결
    navigate('/record/life/detail');
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

      <FoodField value={formState.foods} onToggle={handleFoodToggle} />

      <MemoField value={formState.memo} onChange={handleMemoChange} />

      <DetailRecordLink
        description="수면시간 · 운동 · 카페인 · 약 등"
        onClick={handleDetailRecordLinkClick}
      />
    </RecordPageLayout>
  );
};

export default Life;
