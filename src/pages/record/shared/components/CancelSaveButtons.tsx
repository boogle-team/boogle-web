import Button from '@/shared/components/Button';

export interface CancelSaveButtonsPropTypes {
  cancelLabel?: string;
  saveLabel?: string;
  onCancel: () => void;
  onSave: () => void;
  className?: string;
}

const CancelSaveButtons = ({
  cancelLabel = '취소',
  saveLabel = '저장하기',
  onCancel,
  onSave,
  className = '',
}: CancelSaveButtonsPropTypes) => {
  return (
    <div className={`flex justify-center gap-2.5 ${className}`}>
      <div className="w-43.75 shrink-0">
        <Button
          text={cancelLabel}
          size="md"
          variant="neutral"
          onClick={onCancel}
          className="shadow-md"
        />
      </div>

      <div className="w-43.75 shrink-0">
        <Button
          text={saveLabel}
          size="md"
          variant="primary"
          onClick={onSave}
          className="shadow-md"
        />
      </div>
    </div>
  );
};

export default CancelSaveButtons;
