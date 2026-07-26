import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import Button from '@/shared/components/Button';

import LifeRecordFields from './components/LifeRecordFields';
import TagSettingModal from './components/TagSettingModal';
import {
  isValidTagLength,
  MAX_TAG_COUNT,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';

// TODO: 저장 응답으로 받은 AI 추천 태그로 교체
const MOCK_RECOMMENDED_TAGS = ['음주', '야식', '자극적'];

const Life = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  const startLifeRecord = useLifeRecordDraftStore(
    (state) => state.startLifeRecord,
  );

  // 날짜가 같으면 같은 초안으로 보고 유지한다. 세부 기록에서 돌아와도 값이 남아야 하므로.
  useLayoutEffect(() => {
    startLifeRecord({ draftKey: `new-${recordDate}` });
  }, [startLifeRecord, recordDate]);

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useLifeRecordForm();
  const { formState, isSubmittable } = form;

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

  // 해제는 항상 허용하고, 추가만 상한(MAX_TAG_COUNT)에서 막는다.
  const handleTagToggle = (tag: string) => {
    setSelectedTags((previousTags) => {
      if (previousTags.includes(tag)) {
        return previousTags.filter((selectedTag) => selectedTag !== tag);
      }

      if (previousTags.length >= MAX_TAG_COUNT) return previousTags;

      return [...previousTags, tag];
    });
  };

  const handleTagAdd = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!isValidTagLength(trimmedTag)) return;

    setSelectedTags((previousTags) => {
      if (
        previousTags.includes(trimmedTag) ||
        previousTags.length >= MAX_TAG_COUNT
      ) {
        return previousTags;
      }

      return [...previousTags, trimmedTag];
    });
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
      <LifeRecordFields
        form={form}
        onDetailRecordLinkClick={handleDetailRecordLinkClick}
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
