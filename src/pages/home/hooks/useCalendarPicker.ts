import { useEffect, useMemo, useRef, useState } from 'react';
import { generateHomePickerDates } from '../utils/homeDateUtils';

interface UseCalendarPickerParamTypes {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const PICKER_SIDE_DATE_COUNT = 60;

const useCalendarPicker = ({
  selectedDate,
  onSelectDate,
}: UseCalendarPickerParamTypes) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLElement | null>>({});
  const animationFrameRef = useRef<number | null>(null);
  const alignFrameRef = useRef<number | null>(null);
  const initialSelectedDateRef = useRef(selectedDate);
  const latestSelectedDateRef = useRef(selectedDate);
  const [isScrollReady, setIsScrollReady] = useState(false);

  const pickerDates = useMemo(
    () =>
      generateHomePickerDates(
        initialSelectedDateRef.current,
        PICKER_SIDE_DATE_COUNT,
      ),
    [],
  );

  const scrollToDate = (date: string, behavior: ScrollBehavior = 'auto') => {
    const targetChip = chipRefs.current[date];

    targetChip?.scrollIntoView({
      behavior,
      block: 'nearest',
      inline: 'center',
    });
  };

  const scheduleAlignToDate = (
    date: string,
    behavior: ScrollBehavior = 'auto',
  ) => {
    if (alignFrameRef.current) {
      window.cancelAnimationFrame(alignFrameRef.current);
    }

    alignFrameRef.current = window.requestAnimationFrame(() => {
      scrollToDate(date, behavior);
      alignFrameRef.current = null;
    });
  };

  const getCenteredDate = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return latestSelectedDateRef.current;

    const containerCenter =
      scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;

    return pickerDates.reduce(
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
  };

  const updateCenteredDate = () => {
    const centeredDate = getCenteredDate();

    if (centeredDate !== latestSelectedDateRef.current) {
      latestSelectedDateRef.current = centeredDate;
      onSelectDate(centeredDate);
      scheduleAlignToDate(centeredDate);
    }
  };

  const handleScroll = () => {
    if (!isScrollReady || animationFrameRef.current) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      updateCenteredDate();
      animationFrameRef.current = null;
    });
  };

  const handleChipClick = (date: string) => {
    latestSelectedDateRef.current = date;
    onSelectDate(date);
    scheduleAlignToDate(date, 'smooth');
  };

  const setChipRef = (date: string) => (element: HTMLElement | null) => {
    chipRefs.current[date] = element;
  };

  useEffect(() => {
    latestSelectedDateRef.current = selectedDate;
  }, [selectedDate]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      scrollToDate(initialSelectedDateRef.current);
      setIsScrollReady(true);
    });
  }, []);

  useEffect(
    () => () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (alignFrameRef.current) {
        window.cancelAnimationFrame(alignFrameRef.current);
      }
    },
    [],
  );

  return {
    pickerDates,
    scrollContainerRef,
    setChipRef,
    handleScroll,
    handleChipClick,
  };
};

export default useCalendarPicker;