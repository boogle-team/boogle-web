import { FocusTrap } from 'focus-trap-react';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '@/shared/components/Button';
import Chip from '@/shared/components/Chip';
import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import useBodyScrollLock from '@/shared/hooks/useBodyScrollLock';

import AddTagChip from './AddTagChip';
import AiHintText from './AiHintText';
import TagInputField from './TagInputField';

const TAG_MIN_LENGTH = 2;
const TAG_MAX_LENGTH = 6;

interface TagSettingModalPropTypes {
  isOpen: boolean;
  /** L-01에서 입력한 특이 사항 메모 원문. */
  memo: string;
  /** AI가 메모에서 추출해 제안한 태그 목록. */
  recommendedTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onAddTag: (tag: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const TagSettingModal = ({
  isOpen,
  memo,
  recommendedTags,
  selectedTags,
  onToggleTag,
  onAddTag,
  onCancel,
  onConfirm,
}: TagSettingModalPropTypes) => {
  const titleId = useId();

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useBodyScrollLock(isOpen);

  // 닫을 때 입력 상태를 초기화해, 다시 열었을 때 추천 화면부터 보이게 한다.
  const resetAddState = () => {
    setIsAddingTag(false);
    setTagInput('');
  };

  const handleClose = () => {
    resetAddState();
    onCancel();
  };

  const handleModalConfirm = () => {
    resetAddState();
    onConfirm();
  };

  // 2자 이상 6자 미만만 유효. 6자부터는 초과로 보고 에러 상태로 표시한다.
  const trimmedTag = tagInput.trim();
  const isTagTooLong = trimmedTag.length >= TAG_MAX_LENGTH;
  const isTagValid =
    trimmedTag.length >= TAG_MIN_LENGTH && trimmedTag.length < TAG_MAX_LENGTH;

  const handleTagConfirm = () => {
    if (!isTagValid) return;

    onAddTag(trimmedTag);
    resetAddState();
  };

  const guidanceText = isAddingTag
    ? '2~6자 이내로 입력해주세요'
    : '추가하고 싶은 태그를 선택해주세요 (최대 6개)';

  // AI가 메모에서 태그를 찾지 못하면 추천 목록이 비어 오고, 안내 문구도 달라진다.
  const hasRecommendedTags = recommendedTags.length > 0;

  // 설정할 태그가 하나도 없으면 완료할 수 없다.
  const canConfirm = selectedTags.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      resetAddState();
      onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      onClick={handleClose}
    >
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="flex w-full max-w-107.5 flex-col items-center rounded-t-3xl bg-beige-1 pb-15 shadow-[0_15px_75px_0_rgba(0,0,0,0.18)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="my-3 h-1 w-10 shrink-0 rounded-[6.25rem] bg-[#E4E6E9]"
            style={{ mixBlendMode: 'plus-darker' }}
            aria-hidden
          />

          <div className="flex flex-col items-center self-stretch pb-2.5">
            <h2 id={titleId} className="body-m-bold text-gray-10">
              이런 태그를 설정할까요?
            </h2>
          </div>

          <div className="flex w-full flex-col px-4">
            <div className="flex h-12 items-center rounded-xl bg-beige-5 px-4 py-2.5">
              <span className="label min-w-0 flex-1 truncate text-gray-10">
                {memo}
              </span>
            </div>

            <div className="mt-2">
              <AiHintText
                text={
                  hasRecommendedTags
                    ? '메모를 보고 AI가 찾아냈어요!'
                    : '태그를 찾지 못했어요'
                }
                tone={hasRecommendedTags ? 'primary' : 'muted'}
              />
            </div>

            {/* 태그가 화면 밖으로 넘치면 가로 스크롤한다. */}
            <div className="mt-6 flex gap-2 overflow-x-auto">
              {recommendedTags.map((tag) => (
                <Chip
                  key={tag}
                  size="compact"
                  text={`#${tag}`}
                  isSelected={selectedTags.includes(tag)}
                  onClick={() => onToggleTag(tag)}
                  className="shrink-0"
                />
              ))}

              {!isAddingTag && (
                <AddTagChip onClick={() => setIsAddingTag(true)} />
              )}
            </div>

            {isAddingTag && (
              <div className="mt-2">
                <TagInputField
                  value={tagInput}
                  onChange={setTagInput}
                  onConfirm={handleTagConfirm}
                  isError={isTagTooLong}
                />
              </div>
            )}

            <div className="mt-2 flex items-start gap-1">
              <WarningIcon
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                  isTagTooLong ? 'text-semantic-danger' : 'text-gray-7'
                }`}
                aria-hidden="true"
              />
              <p
                className={`label ${
                  isTagTooLong ? 'text-semantic-danger' : 'text-gray-10'
                }`}
              >
                {guidanceText}
              </p>
            </div>

            <div className="mt-6 flex w-full gap-2">
              <Button
                text="취소"
                onClick={handleClose}
                variant="neutral"
                size="sm"
                className="flex-1"
              />
              <Button
                text="설정하기"
                onClick={handleModalConfirm}
                variant="primary"
                disabledVariant="bright"
                disabled={!canConfirm}
                size="sm"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>,
    document.body,
  );
};

export default TagSettingModal;
