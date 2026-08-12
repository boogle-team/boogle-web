import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  generateHomePickerDateBatch,
  generateHomePickerDates,
} from '@/pages/home/utils/homeDateUtils';

interface UseCalendarPickerParamTypes {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onRecordSummaryRangeRequest: (baseDate: string) => void;
}

interface PendingPrependScrollTypes {
  previousScrollWidth: number;
  previousScrollLeft: number;
}

const PICKER_SIDE_DATE_COUNT = 30;
const PICKER_DATE_BATCH_COUNT = 30;
const SENTINEL_ROOT_MARGIN = '0px 240px 0px 240px';
const SENTINEL_THRESHOLD = 0;
const PROGRAMMATIC_SCROLL_END_DELAY = 150;

const useCalendarPicker = ({
  selectedDate,
  onSelectDate,
  onRecordSummaryRangeRequest,
}: UseCalendarPickerParamTypes) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const leftSentinelRef = useRef<HTMLSpanElement>(null);
  const rightSentinelRef = useRef<HTMLSpanElement>(null);
  const chipRefs = useRef<Record<string, HTMLElement | null>>({});
  const animationFrameRef = useRef<number | null>(null);
  const alignFrameRef = useRef<number | null>(null);
  const initialAlignFrameRef = useRef<number | null>(null);
  const programmaticScrollEndTimerRef = useRef<number | null>(null);
  const initialSelectedDateRef = useRef(selectedDate);
  const latestSelectedDateRef = useRef(selectedDate);
  const isScrollReadyRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const isLeftRangeLockedRef = useRef(false);
  const isRightRangeLockedRef = useRef(false);
  const pendingPrependScrollRef = useRef<PendingPrependScrollTypes | null>(
    null,
  );
  const isAppendPendingRef = useRef(false);
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [pickerDates, setPickerDates] = useState(() =>
    generateHomePickerDates(selectedDate, PICKER_SIDE_DATE_COUNT),
  );
  const pickerDatesRef = useRef(pickerDates);

  const handlePrependDates = useCallback(() => {
    if (!isScrollReadyRef.current || isLeftRangeLockedRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const currentDates = pickerDatesRef.current;
    const firstDate = currentDates[0];
    if (!scrollContainer || !firstDate) return;

    isLeftRangeLockedRef.current = true;
    onRecordSummaryRangeRequest(firstDate);

    const prependedDates = generateHomePickerDateBatch(
      firstDate,
      'past',
      PICKER_DATE_BATCH_COUNT,
    ).filter((date) => !currentDates.includes(date));

    if (prependedDates.length === 0) {
      isLeftRangeLockedRef.current = false;
      return;
    }

    pendingPrependScrollRef.current = {
      previousScrollWidth: scrollContainer.scrollWidth,
      previousScrollLeft: scrollContainer.scrollLeft,
    };

    const nextPickerDates = [...prependedDates, ...currentDates];
    pickerDatesRef.current = nextPickerDates;
    setPickerDates(nextPickerDates);
  }, [onRecordSummaryRangeRequest]);

  const handleAppendDates = useCallback(() => {
    if (!isScrollReadyRef.current || isRightRangeLockedRef.current) return;

    const currentDates = pickerDatesRef.current;
    const lastDate = currentDates.at(-1);
    if (!lastDate) return;

    isRightRangeLockedRef.current = true;
    onRecordSummaryRangeRequest(lastDate);

    const appendedDates = generateHomePickerDateBatch(
      lastDate,
      'future',
      PICKER_DATE_BATCH_COUNT,
    ).filter((date) => !currentDates.includes(date));

    if (appendedDates.length === 0) {
      isRightRangeLockedRef.current = false;
      return;
    }

    isAppendPendingRef.current = true;
    const nextPickerDates = [...currentDates, ...appendedDates];
    pickerDatesRef.current = nextPickerDates;
    setPickerDates(nextPickerDates);
  }, [onRecordSummaryRangeRequest]);

  const scrollToDate = useCallback(
    (date: string, behavior: ScrollBehavior = 'auto') => {
      const targetChip = chipRefs.current[date];

      targetChip?.scrollIntoView({
        behavior,
        block: 'nearest',
        inline: 'center',
      });
    },
    [],
  );

  const scheduleAlignToDate = useCallback(
    (date: string, behavior: ScrollBehavior = 'auto') => {
      if (alignFrameRef.current) {
        window.cancelAnimationFrame(alignFrameRef.current);
      }

      alignFrameRef.current = window.requestAnimationFrame(() => {
        scrollToDate(date, behavior);
        alignFrameRef.current = null;
      });
    },
    [scrollToDate],
  );

  const getCenteredDate = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return latestSelectedDateRef.current;

    const containerCenter =
      scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;

    return pickerDatesRef.current.reduce(
      (closestDate, date) => {
        const chip = chipRefs.current[date];
        if (!chip) return closestDate;

        const chipCenter = chip.offsetLeft + chip.offsetWidth / 2;
        const distance = Math.abs(containerCenter - chipCenter);

        if (distance < closestDate.distance) {
          return { date, distance };
        }

        return closestDate;
      },
      {
        date: latestSelectedDateRef.current,
        distance: Number.POSITIVE_INFINITY,
      },
    ).date;
  }, []);

  const updateCenteredDate = useCallback(() => {
    const centeredDate = getCenteredDate();

    if (centeredDate !== latestSelectedDateRef.current) {
      latestSelectedDateRef.current = centeredDate;
      onSelectDate(centeredDate);
      scheduleAlignToDate(centeredDate);
    }
  }, [getCenteredDate, onSelectDate, scheduleAlignToDate]);

  const clearProgrammaticScrollEndTimer = useCallback(() => {
    if (programmaticScrollEndTimerRef.current) {
      window.clearTimeout(programmaticScrollEndTimerRef.current);
      programmaticScrollEndTimerRef.current = null;
    }
  }, []);

  const scheduleProgrammaticScrollEnd = useCallback(() => {
    clearProgrammaticScrollEndTimer();

    programmaticScrollEndTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      programmaticScrollEndTimerRef.current = null;
      updateCenteredDate();
    }, PROGRAMMATIC_SCROLL_END_DELAY);
  }, [clearProgrammaticScrollEndTimer, updateCenteredDate]);

  const handleScroll = useCallback(() => {
    if (!isScrollReadyRef.current) return;

    if (isProgrammaticScrollRef.current) {
      scheduleProgrammaticScrollEnd();
      return;
    }

    if (animationFrameRef.current) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      updateCenteredDate();
      animationFrameRef.current = null;
    });
  }, [scheduleProgrammaticScrollEnd, updateCenteredDate]);

  const handleChipClick = (date: string) => {
    isProgrammaticScrollRef.current = true;
    latestSelectedDateRef.current = date;
    onSelectDate(date);
    scheduleAlignToDate(date, 'smooth');
    scheduleProgrammaticScrollEnd();
  };

  const handleScrollInteractionStart = () => {
    if (!isProgrammaticScrollRef.current) return;

    isProgrammaticScrollRef.current = false;
    clearProgrammaticScrollEndTimer();
  };

  const setChipRef = (date: string) => (element: HTMLElement | null) => {
    chipRefs.current[date] = element;
  };

  useLayoutEffect(() => {
    pickerDatesRef.current = pickerDates;

    const scrollContainer = scrollContainerRef.current;
    const pendingPrependScroll = pendingPrependScrollRef.current;

    if (scrollContainer && pendingPrependScroll) {
      const scrollWidthDifference =
        scrollContainer.scrollWidth - pendingPrependScroll.previousScrollWidth;

      scrollContainer.scrollLeft =
        pendingPrependScroll.previousScrollLeft + scrollWidthDifference;
      pendingPrependScrollRef.current = null;
      isLeftRangeLockedRef.current = false;
    }

    if (isAppendPendingRef.current) {
      isAppendPendingRef.current = false;
      isRightRangeLockedRef.current = false;
    }
  }, [pickerDates]);

  useEffect(() => {
    latestSelectedDateRef.current = selectedDate;
  }, [selectedDate]);

  useEffect(() => {
    onRecordSummaryRangeRequest(initialSelectedDateRef.current);

    initialAlignFrameRef.current = window.requestAnimationFrame(() => {
      scrollToDate(initialSelectedDateRef.current);
      isScrollReadyRef.current = true;
      setIsScrollReady(true);
      initialAlignFrameRef.current = null;
    });
  }, [onRecordSummaryRangeRequest, scrollToDate]);

  useEffect(() => {
    if (!isScrollReady) return;

    const scrollContainer = scrollContainerRef.current;
    const leftSentinel = leftSentinelRef.current;
    const rightSentinel = rightSentinelRef.current;
    if (!scrollContainer || !leftSentinel || !rightSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !isScrollReadyRef.current) return;

          if (entry.target === leftSentinelRef.current) {
            handlePrependDates();
          }

          if (entry.target === rightSentinelRef.current) {
            handleAppendDates();
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: SENTINEL_ROOT_MARGIN,
        threshold: SENTINEL_THRESHOLD,
      },
    );

    observer.observe(leftSentinel);
    observer.observe(rightSentinel);

    return () => {
      observer.disconnect();
    };
  }, [handleAppendDates, handlePrependDates, isScrollReady]);

  useEffect(
    () => () => {
      isScrollReadyRef.current = false;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (alignFrameRef.current) {
        window.cancelAnimationFrame(alignFrameRef.current);
      }

      if (initialAlignFrameRef.current) {
        window.cancelAnimationFrame(initialAlignFrameRef.current);
      }

      clearProgrammaticScrollEndTimer();
    },
    [clearProgrammaticScrollEndTimer],
  );

  return {
    pickerDates,
    scrollContainerRef,
    leftSentinelRef,
    rightSentinelRef,
    setChipRef,
    handleScroll,
    handleChipClick,
    handleScrollInteractionStart,
  };
};

export default useCalendarPicker;
