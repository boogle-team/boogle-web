import type { ChangeEvent } from 'react';

import AiLogoIcon from '@/shared/assets/illustrations/record/aiLogo.svg?react';

import { MEMO_MAX_LENGTH } from '../constants/lifeRecordConstants';
import LifeSectionTitle from './LifeSectionTitle';

interface MemoFieldPropTypes {
  value: string;
  onChange: (memo: string) => void;
}

const MemoField = ({ value, onChange }: MemoFieldPropTypes) => {
  const handleMemoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <section className="flex flex-col gap-2">
      <LifeSectionTitle title="특이 사항 메모" guideText="선택" />

      <textarea
        value={value}
        onChange={handleMemoChange}
        maxLength={MEMO_MAX_LENGTH}
        placeholder="오늘의 특이 사항을 자유롭게 작성해 주세요"
        aria-label="특이 사항 메모"
        className="label min-h-19 w-full resize-none rounded-xl border border-gray-4 bg-gray-2 px-4 py-2.5 text-gray-10 placeholder:text-gray-6"
      />

      <div className="flex items-center justify-between">
        <span className="caption flex items-center gap-1 text-orange-6">
          <AiLogoIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          입력하면 AI가 태그를 자동 추천해요!
        </span>

        <span className="caption text-gray-6">
          {value.length}/{MEMO_MAX_LENGTH}
        </span>
      </div>
    </section>
  );
};

export default MemoField;
