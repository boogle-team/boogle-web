import { AlertCircle } from 'lucide-react';
import type { ChangeEvent } from 'react';

import ConfirmButton from '@/shared/components/ConfirmButton';

interface InputTextPropTypes {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minCount?: number;
  maxCount?: number;
  showCounter?: boolean;
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  actionLabel?: string;
  onAction?: () => void;
  isActionDisabled?: boolean;
  disabled?: boolean;
}

const InputText = ({
  value,
  onChange,
  placeholder,
  minCount,
  maxCount,
  showCounter,
  isError,
  errorMessage,
  helperText,
  actionLabel,
  onAction,
  isActionDisabled,
  disabled,
}: InputTextPropTypes) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const hasCounter =
    Boolean(showCounter ?? maxCount !== undefined) && maxCount !== undefined;
  const hasAction = Boolean(actionLabel && onAction);
  const isMinCountShort =
    minCount !== undefined && value.length > 0 && value.length < minCount;
  const isMaxCountExceeded = maxCount !== undefined && value.length > maxCount;
  const hasError = Boolean(isError || isMinCountShort || isMaxCountExceeded);
  const countRangeHelperMessage =
    minCount !== undefined && maxCount !== undefined
      ? `${minCount}~${maxCount}자 이내로 입력해주세요`
      : helperText;
  const minCountErrorMessage = `${minCount}자 이상 입력해주세요`;
  const maxCountErrorMessage = `${maxCount}자 이내로 입력해주세요`;
  const bottomMessage = hasError
    ? isMinCountShort
      ? minCountErrorMessage
      : isMaxCountExceeded
        ? maxCountErrorMessage
        : errorMessage
    : countRangeHelperMessage;
  const isCountInvalidForAction = Boolean(
    (minCount !== undefined && value.length < minCount) || isMaxCountExceeded,
  );
  const shouldDisableAction = Boolean(
    disabled || isActionDisabled || isCountInvalidForAction,
  );

  return (
    <div className="w-full">
      <div
        className={`flex h-12 w-full items-center justify-between gap-2 rounded-xl border bg-gray-2 px-4 py-2.5 ${
          hasError
            ? 'border-semantic-danger'
            : 'border-gray-4 focus-within:border-orange-5'
        }`}
      >
        <input
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`label min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-6 ${
            hasError ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        />

        {hasCounter && (
          <span
            className={`caption shrink-0 ${
              hasError ? 'text-semantic-danger' : 'text-gray-6'
            }`}
          >{`${value.length}/${maxCount}`}</span>
        )}

        {hasAction && (
          <ConfirmButton
            label={actionLabel as string}
            onClick={onAction as () => void}
            disabled={shouldDisableAction}
          />
        )}
      </div>

      {bottomMessage && (
        <div
          className={`caption mt-2 flex items-center gap-1 ${
            hasError ? 'text-semantic-danger' : 'text-gray-7'
          }`}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{bottomMessage}</span>
        </div>
      )}
    </div>
  );
};

export default InputText;
