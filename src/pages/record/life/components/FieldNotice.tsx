import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';

interface FieldNoticePropTypes {
  text: string;
  /** 위 요소와의 간격은 쓰는 쪽에서 정한다. */
  className?: string;
}

/** 입력 항목 아래에 붙는 회색 안내 문구. */
const FieldNotice = ({ text, className = '' }: FieldNoticePropTypes) => {
  return (
    <div className={`flex items-start gap-1 ${className}`}>
      <WarningIcon
        className="h-4 w-4 shrink-0 text-gray-6"
        aria-hidden="true"
      />

      <span className="caption text-gray-7">{text}</span>
    </div>
  );
};

export default FieldNotice;
