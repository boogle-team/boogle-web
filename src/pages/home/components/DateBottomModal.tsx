import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { MouseEvent } from 'react';

interface DateBottomModalPropTypes {
  isOpen: boolean;
  onClose: () => void;
}

const DateBottomModal = ({ isOpen, onClose }: DateBottomModalPropTypes) => {
  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="날짜 선택"
        onClick={handleModalContentClick}
        className="w-full max-w-[430px] rounded-t-[1.25rem] bg-beige-1 px-[1.25rem] pt-[0.75rem] pb-[2rem] shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto mb-[1rem] h-[0.25rem] w-[2.5rem] rounded-full bg-gray-5" />
        <div className="flex items-center justify-between">
          <h2 className="body-m-bold text-gray-10">날짜 선택</h2>
          <button
            type="button"
            aria-label="날짜 선택 모달 닫기"
            onClick={onClose}
            className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-orange-1 text-orange-6"
          >
            <X aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" />
          </button>
        </div>
        <div className="h-[8rem]" />
      </div>
    </div>,
    document.body,
  );
};

export default DateBottomModal;
