import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FocusTrap } from 'focus-trap-react';
import type { FunctionComponent, MouseEvent, SVGProps } from 'react';

import BoogleRecordIcon from '@/shared/assets/illustrations/record/bottomModalBoogleRecord.svg?react';
import DailyRecordIcon from '@/shared/assets/illustrations/record/bottomModalDailyRecord.svg?react';

import RecordSelectButton from './RecordSelectButton';

interface RecordOptionTypes {
  title: string;
  description: string;
  path: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface RecordBottomSheetPropTypes {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}

const RECORD_OPTIONS: RecordOptionTypes[] = [
  {
    title: '부글 기록',
    description: '배변 상태 기록하기',
    path: '/record',
    Icon: BoogleRecordIcon,
  },
  {
    title: '생활 기록',
    description: '수면·식단 기록하기',
    path: '/record/life',
    Icon: DailyRecordIcon,
  },
];

const RecordBottomSheet = ({
  isOpen,
  onClose,
  onSelect,
}: RecordBottomSheetPropTypes) => {
  const handleSheetClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => document.removeEventListener('keydown', handleEscapeKeyDown);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="record-bottom-sheet-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/25"
          onClick={onClose}
        >
          <FocusTrap
            focusTrapOptions={{
              escapeDeactivates: false,
              clickOutsideDeactivates: false,
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="기록 선택"
              initial={{ y: 40, scale: 0.94, opacity: 0 }}
              animate={{
                y: [40, -10, 4, 0],
                scale: [0.94, 1.03, 0.995, 1],
                opacity: [0, 1, 1, 1],
              }}
              exit={{ y: 22, scale: 0.98, opacity: 0 }}
              transition={{
                duration: 0.46,
                times: [0, 0.58, 0.82, 1],
                ease: ['easeOut', 'easeInOut', 'easeOut'],
              }}
              onClick={handleSheetClick}
              className="-mb-4 w-full max-w-[430px] origin-bottom rounded-t-[24px] bg-beige-1 px-[0.94rem] pt-[0.31rem] pb-[calc(3.75rem+1rem)] shadow-[0_0.94rem_4.69rem_rgba(0,0,0,0.18)]"
            >
              <div className="mx-auto mb-[1.75rem] h-1 w-10 rounded-full bg-gray-4" />
              <h2 className="body-m-bold mb-5 text-center text-gray-10">
                무엇을 기록할까요?
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {RECORD_OPTIONS.map(({ title, description, path, Icon }) => (
                  <RecordSelectButton
                    key={path}
                    title={title}
                    description={description}
                    Icon={Icon}
                    onClick={() => onSelect(path)}
                  />
                ))}
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default RecordBottomSheet;
