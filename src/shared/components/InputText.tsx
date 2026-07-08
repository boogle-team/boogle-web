import { AlertCircle } from 'lucide-react';
import type { ChangeEvent } from 'react';

import ConfirmButton from '@/shared/components/ConfirmButton';

interface InputTextPropTypes {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxCount?: number;
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  actionLabel?: string;
  onAction?: () => void;
  disabled?: boolean;
}

const InputText = ({
  value,
  onChange,
  placeholder,
  maxCount,
  isError,
  errorMessage,
  helperText,
  actionLabel,
  onAction,
  disabled,
}: InputTextPropTypes) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const hasCounter = maxCount !== undefined;
  const hasAction = Boolean(actionLabel && onAction);
  const bottomMessage = isError ? errorMessage : helperText;

  return (
    <div className="w-full">
      <div
        className={`flex h-12 w-full items-center justify-between gap-2 rounded-md border bg-gray-2 px-4 py-2.5 ${
          isError
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
            isError ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        />

        {hasCounter && (
          <span className="caption shrink-0 text-gray-6">{`${value.length}/${maxCount}`}</span>
        )}

        {hasAction && (
          <ConfirmButton
            label={actionLabel as string}
            onClick={onAction as () => void}
            disabled={disabled}
          />
        )}
      </div>

      {bottomMessage && (
        <div
          className={`caption mt-2 flex items-center gap-1 ${
            isError ? 'text-semantic-danger' : 'text-gray-7'
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
