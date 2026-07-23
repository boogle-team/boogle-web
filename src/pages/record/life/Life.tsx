import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import DetailRecordLink from '@/pages/record/main/components/DetailRecordLink';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import Button from '@/shared/components/Button';

import FoodField from './components/FoodField';
import MemoField from './components/MemoField';
import OptionChipField from './components/OptionChipField';
import TagSettingModal from './components/TagSettingModal';
import {
  HYDRATION_OPTIONS,
  MEAL_REGULARITY_OPTIONS,
  SLEEP_OPTIONS,
  STRESS_OPTIONS,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';

// TODO: 저장 응답으로 받은 AI 추천 태그로 교체
const MOCK_RECOMMENDED_TAGS = ['음주', '야식', '자극적'];

const Life = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    // TODO: 생활 기록 저장 API 연동

    // 메모가 있으면 AI 태그 추천 모달(L-03)을 띄우고, 없으면 바로 완료한다.
    if (formState.memo.trim()) {
      setIsTagModalOpen(true);
      return;
    }

    // TODO: 저장 완료 후 홈으로 복귀
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((previousTags) =>
      previousTags.includes(tag)
        ? previousTags.filter((selectedTag) => selectedTag !== tag)
        : [...previousTags, tag],
    );
  };

  const handleTagAdd = (tag: string) => {
    // TODO: 2~6자 검증 및 최대 6개 제한 반영
    const trimmedTag = tag.trim();
    if (!trimmedTag || selectedTags.includes(trimmedTag)) return;

    setSelectedTags((previousTags) => [...previousTags, trimmedTag]);
  };

  const handleTagModalCancel = () => {
    setIsTagModalOpen(false);
    // TODO: 태그 미확정 상태로 홈 복귀 (기록 자체는 이미 저장됨)
  };

  const handleTagModalConfirm = () => {
    setIsTagModalOpen(false);
    // TODO: 선택한 태그를 저장된 기록에 반영 후 홈 복귀
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

      <TagSettingModal
        isOpen={isTagModalOpen}
        memo={formState.memo}
        recommendedTags={MOCK_RECOMMENDED_TAGS}
        selectedTags={selectedTags}
        onToggleTag={handleTagToggle}
        onAddTag={handleTagAdd}
        onCancel={handleTagModalCancel}
        onConfirm={handleTagModalConfirm}
      />
    </RecordPageLayout>
  );
};

export default Life;
