import type { ChangeEvent, KeyboardEvent } from 'react';

interface TagInputFieldPropTypes {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  isError: boolean;
}

const TagInputField = ({
  value,
  onChange,
  onConfirm,
  isError,
}: TagInputFieldPropTypes) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onConfirm();
  };

  return (
    <div
      className={`flex h-12 items-center rounded-xl border bg-gray-2 px-4 ${
        isError ? 'border-semantic-danger' : 'border-gray-4'
      }`}
    >
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력해주세요"
        aria-label="태그 입력"
        aria-invalid={isError}
        className="label min-w-0 flex-1 bg-transparent text-gray-10 outline-none placeholder:text-gray-6"
      />

      <button
        type="button"
        onClick={onConfirm}
        className={`label shrink-0 pl-4 hover:not-disabled:cursor-pointer ${
          isError ? 'text-gray-5' : 'text-orange-6'
        }`}
      >
        확인
      </button>
    </div>
  );
};

export default TagInputField;
