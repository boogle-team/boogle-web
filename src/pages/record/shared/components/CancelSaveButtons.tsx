import Button from '@/shared/components/Button';

export interface CancelSaveButtonsPropTypes {
  cancelLabel?: string;
  saveLabel?: string;
  onCancel: () => void;
  onSave: () => void;
  cancelDisabled?: boolean;
  saveDisabled?: boolean;
  className?: string;
}

const CancelSaveButtons = ({
  cancelLabel = '취소',
  saveLabel = '저장하기',
  onCancel,
  onSave,
  cancelDisabled = false,
  saveDisabled = false,
  className = '',
}: CancelSaveButtonsPropTypes) => {
  return (
    <div className={`flex w-full justify-center gap-2.5 ${className}`}>
      <div className="min-w-0 flex-1">
        <Button
          text={cancelLabel}
          size="md"
          variant="neutral"
          onClick={onCancel}
          disabled={cancelDisabled}
          className="shadow-md"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Button
          text={saveLabel}
          size="md"
          variant="primary"
          onClick={onSave}
          disabled={saveDisabled}
          className="shadow-md"
        />
      </div>
    </div>
  );
};

export default CancelSaveButtons;
