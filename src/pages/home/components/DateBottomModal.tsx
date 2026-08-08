import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'motion/react';
import { FocusTrap } from 'focus-trap-react';
import type { MouseEvent } from 'react';
import Button from '@/shared/components/Button';
import useBodyScrollLock from '@/shared/hooks/useBodyScrollLock';
import {
  CalendarGrid,
  DATE_FORMAT,
  MonthNavigator,
  type CalendarMarkConfigMapTypes,
  type CalendarRecordMapTypes,
} from '@/shared/components/calendar';

const RECORD_SUMMARY_BASE_DAY = 15;

interface DateBottomModalSheetPropTypes {
  selectedDate: string;
  todayDate: string;
  recordMap: CalendarRecordMapTypes;
  markConfig: CalendarMarkConfigMapTypes;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  onVisibleMonthChange: (baseDate: string) => void;
}

const DateBottomModalSheet = ({
  selectedDate,
  todayDate,
  recordMap,
  markConfig,
  onClose,
  onSelectDate,
  onVisibleMonthChange,
}: DateBottomModalSheetPropTypes) => {
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs(selectedDate).startOf('month'),
  );

  useEffect(() => {
    onVisibleMonthChange(
      currentDate.date(RECORD_SUMMARY_BASE_DAY).format(DATE_FORMAT),
    );
  }, [currentDate, onVisibleMonthChange]);

  const handleModalContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month').startOf('month'));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, 'month').startOf('month'));
  };

  const handleDateSelect = (date: string) => {
    onSelectDate(date);
    onClose();
  };

  const handleTodayButtonClick = () => {
    onSelectDate(dayjs(todayDate).format(DATE_FORMAT));
    onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="날짜 선택"
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
      onClick={handleModalContentClick}
      className="-mb-4 w-full max-w-[430px] origin-bottom rounded-t-[24px] bg-beige-1 px-4 pt-[0.31rem] pb-[calc(var(--bottom-sheet-padding-bottom)+var(--safe-area-bottom))] shadow-[0_0.94rem_4.69rem_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto mb-[0.56rem] h-1 w-10 rounded-full bg-gray-4" />
      <MonthNavigator
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid
        currentDate={currentDate}
        recordMap={recordMap}
        selectedDate={selectedDate}
        todayDate={todayDate}
        isFixedSixWeekHeight
        markConfig={markConfig}
        onSelectDate={handleDateSelect}
      />
      <Button
        text="오늘로 이동"
        size="md"
        variant="ghost"
        className="mt-6"
        onClick={handleTodayButtonClick}
      />
    </motion.div>
  );
};

interface DateBottomModalPropTypes {
  isOpen: boolean;
  selectedDate: string;
  todayDate: string;
  recordMap: CalendarRecordMapTypes;
  markConfig: CalendarMarkConfigMapTypes;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  onVisibleMonthChange: (baseDate: string) => void;
}

const DateBottomModal = ({
  isOpen,
  selectedDate,
  todayDate,
  recordMap,
  markConfig,
  onClose,
  onSelectDate,
  onVisibleMonthChange,
}: DateBottomModalPropTypes) => {
  useBodyScrollLock(isOpen);

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
          key="date-bottom-modal-overlay"
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
            <DateBottomModalSheet
              selectedDate={selectedDate}
              todayDate={todayDate}
              recordMap={recordMap}
              markConfig={markConfig}
              onClose={onClose}
              onSelectDate={onSelectDate}
              onVisibleMonthChange={onVisibleMonthChange}
            />
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default DateBottomModal;
