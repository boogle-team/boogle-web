import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import Button from '@/shared/components/Button';

import LifeRecordFields from './components/LifeRecordFields';
import TagSettingModal from './components/TagSettingModal';
import {
  isValidTagLength,
  MAX_TAG_COUNT,
} from './constants/lifeRecordConstants';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { usePostLifeRecord } from './hooks/usePostLifeRecord';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';
import { createLifeRecordPayload } from './utils/createLifeRecordPayload';

const MOCK_RECOMMENDED_TAGS = ['야식', '매운 음식', '카페인'];

const DEFAULT_LIFE_RECORD_ERROR_MESSAGE =
  '생활 기록 저장에 실패했어요. 잠시 후 다시 시도해 주세요.';

const getLifeRecordErrorMessage = (error: unknown) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? DEFAULT_LIFE_RECORD_ERROR_MESSAGE;
  }

  return DEFAULT_LIFE_RECORD_ERROR_MESSAGE;
};

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useLifeRecordForm();
  const { formState, isSubmittable } = form;
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
        navigate('/');
      },
      onError: (error) => {
        setErrorMessage(getLifeRecordErrorMessage(error));
      },
    });
  };

  const handleSubmit = () => {
    if (!isSubmittable || isPostingLifeRecord) return;

    if (formState.memo.trim()) {
      setIsTagModalOpen(true);
      return;
    }

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
    navigate(`/record/life/detail?date=${recordDate}`);
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
          disabled={!isSubmittable || isPostingLifeRecord}
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
