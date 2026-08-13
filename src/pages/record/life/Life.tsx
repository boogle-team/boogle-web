import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

import LifeRecordFields from './components/LifeRecordFields';
import TagSettingModal from './components/TagSettingModal';
import {
  isValidTagLength,
  MAX_TAG_COUNT,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { usePostExtractLifeRecordTags } from './hooks/usePostExtractLifeRecordTags';
import { usePostLifeRecord } from './hooks/usePostLifeRecord';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';
import { createLifeRecordPayload } from './utils/createLifeRecordPayload';
import { getLifeRecordErrorMessage } from './utils/lifeRecordErrorMessage';

const Life = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  const startLifeRecord = useLifeRecordDraftStore(
    (state) => state.startLifeRecord,
  );
  const resetLifeRecord = useLifeRecordDraftStore(
    (state) => state.resetLifeRecord,
  );

  useLayoutEffect(() => {
    startLifeRecord({ draftKey: `new-${recordDate}` });
  }, [startLifeRecord, recordDate]);

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [recommendedTags, setRecommendedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useLifeRecordForm();
  const { formState, isSubmittable } = form;
  const { mutate: extractLifeRecordTags, isPending: isExtractingTags } =
    usePostExtractLifeRecordTags();
  const { mutate: postLifeRecord, isPending: isPostingLifeRecord } =
    usePostLifeRecord();

  const saveLifeRecord = (tagNames: string[] = []) => {
    const payload = createLifeRecordPayload({
      formState,
      recordDate,
      tagNames,
    });

    if (!payload) return;

    setErrorMessage('');

    postLifeRecord(payload, {
      onSuccess: () => {
        resetLifeRecord();
        navigate('/home', { replace: true });
      },
      onError: (error) => {
        setErrorMessage(getLifeRecordErrorMessage(error));
      },
    });
  };

  const handleSubmit = () => {
    if (!isSubmittable || isPostingLifeRecord || isExtractingTags) return;

    const trimmedMemo = formState.memo.trim();

    if (trimmedMemo) {
      extractLifeRecordTags(
        { text: trimmedMemo },
        {
          onSuccess: ({ tagNames }) => {
            setRecommendedTags(tagNames);
            setSelectedTags(tagNames.slice(0, MAX_TAG_COUNT));
            setIsTagModalOpen(true);
          },
          onError: () => {
            setRecommendedTags([]);
            setSelectedTags([]);
            setIsTagModalOpen(true);
          },
        },
      );
      return;
    }

    setRecommendedTags([]);
    setSelectedTags([]);
    saveLifeRecord();
  };

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
    saveLifeRecord();
  };

  const handleTagModalConfirm = () => {
    setIsTagModalOpen(false);
    saveLifeRecord(selectedTags);
  };

  // 세부 기록도 같은 날짜의 초안이므로 날짜를 그대로 넘긴다.
  const handleDetailRecordLinkClick = () => {
    navigate(`/life-record/detail?date=${recordDate}`);
  };

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      footer={
        <Button
          text="완료"
          onClick={handleSubmit}
          disabled={!isSubmittable || isPostingLifeRecord || isExtractingTags}
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

      <TagSettingModal
        isOpen={isTagModalOpen}
        memo={formState.memo}
        recommendedTags={recommendedTags}
        selectedTags={selectedTags}
        onToggleTag={handleTagToggle}
        onAddTag={handleTagAdd}
        onCancel={handleTagModalCancel}
        onConfirm={handleTagModalConfirm}
      />

      {isExtractingTags && (
        <LoadingSpinner hasBackdrop message="AI가 태그를 찾고 있어요" />
      )}
    </RecordPageLayout>
  );
};

export default Life;
