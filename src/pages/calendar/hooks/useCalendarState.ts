import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs, { type Dayjs } from 'dayjs';
import {
  DATE_FORMAT,
  type CalendarRecordMapTypes,
} from '@/shared/components/calendar';
import {
  getBoogleRecordView,
  getLifeRecordView,
  type BoogleRecordViewTypes,
  type LifeRecordViewTypes,
} from '@/shared/components/dailyRecord';
import { CALENDAR_MARK_CONFIG } from '@/pages/calendar/constants/calendarMarkConfig';
import useCalendarDailyRecordQuery from '@/pages/calendar/hooks/useCalendarDailyRecordQuery';
import useCalendarMonthQuery from '@/pages/calendar/hooks/useCalendarMonthQuery';
import { toCalendarRecordMap } from '@/pages/calendar/utils/calendarRecordMapper';
import { getCalendarMonthlySummary } from '@/pages/calendar/utils/getCalendarMonthlySummary';
import { getDailyAutoTags } from '@/pages/calendar/utils/getDailyAutoTags';
import type { CalendarMonthlySummaryTypes } from '@/pages/calendar/types/calendarSummaryTypes';

interface UseCalendarStateReturnTypes {
  currentDate: Dayjs;
  todayDate: string;
  selectedDate: string;
  recordMap: CalendarRecordMapTypes;
  markConfig: typeof CALENDAR_MARK_CONFIG;
  monthlySummary: CalendarMonthlySummaryTypes;
  boogleRecordView: BoogleRecordViewTypes;
  lifeRecordView: LifeRecordViewTypes;
  autoTagItems: { id: string; label: string }[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isMonthError: boolean;
  monthError: unknown;
  handlePreviousMonthButtonClick: () => void;
  handleNextMonthButtonClick: () => void;
  handleDateCellClick: (date: string) => void;
  handleBoogleRecordCreateButtonClick: () => void;
  handleBoogleRecordEditButtonClick: (recordId: number) => void;
  handleLifeRecordCreateButtonClick: () => void;
  handleLifeRecordEditButtonClick: (recordId: number) => void;
}

const useCalendarState = (): UseCalendarStateReturnTypes => {
  const navigate = useNavigate();
  // TODO: 캘린더 조회 API에 서버 기준 날짜가 추가되면 그 값으로 교체한다.
  const [todayDate] = useState(() => dayjs().format(DATE_FORMAT));
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().startOf('month'),
  );
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const {
    data: selectedDailyRecord,
    error,
    isError,
    isLoading,
  } = useCalendarDailyRecordQuery(selectedDate);

  const {
    data: calendarMonth,
    error: monthError,
    isError: isMonthError,
  } = useCalendarMonthQuery({
    year: currentDate.year(),
    // dayjs의 month()는 0부터 시작하므로 서버 규격(1~12)에 맞춘다.
    month: currentDate.month() + 1,
  });

  const recordMap = useMemo(
    () => toCalendarRecordMap(calendarMonth?.days ?? []),
    [calendarMonth?.days],
  );

  const monthlySummary = useMemo(
    () => getCalendarMonthlySummary({ currentDate, todayDate, recordMap }),
    [currentDate, recordMap, todayDate],
  );

  const boogleRecordView = useMemo(
    () =>
      getBoogleRecordView({
        selectedDate,
        records: selectedDailyRecord?.boogleRecords ?? [],
      }),
    [selectedDailyRecord?.boogleRecords, selectedDate],
  );

  const lifeRecordView = useMemo(
    () =>
      getLifeRecordView({
        selectedDate,
        record: selectedDailyRecord?.lifeRecord ?? null,
      }),
    [selectedDailyRecord?.lifeRecord, selectedDate],
  );

  const autoTagItems = useMemo(
    () =>
      getDailyAutoTags({
        boogleRecords: selectedDailyRecord?.boogleRecords ?? [],
        lifeRecord: selectedDailyRecord?.lifeRecord ?? null,
      }).map((tagLabel) => ({ id: tagLabel, label: tagLabel })),
    [selectedDailyRecord?.boogleRecords, selectedDailyRecord?.lifeRecord],
  );

  const handlePreviousMonthButtonClick = () =>
    setCurrentDate((previousDate) =>
      previousDate.subtract(1, 'month').startOf('month'),
    );

  const handleNextMonthButtonClick = () =>
    setCurrentDate((previousDate) =>
      previousDate.add(1, 'month').startOf('month'),
    );

  const handleDateCellClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleBoogleRecordCreateButtonClick = () => {
    navigate(`/boogle-record/new?date=${selectedDate}`);
  };

  const handleBoogleRecordEditButtonClick = (recordId: number) => {
    navigate(`/boogle-record/edit/${recordId}`);
  };

  const handleLifeRecordCreateButtonClick = () => {
    navigate(`/life-record/new?date=${selectedDate}`);
  };

  const handleLifeRecordEditButtonClick = (recordId: number) => {
    navigate(`/life-record/edit/${recordId}`);
  };

  return {
    currentDate,
    todayDate,
    selectedDate,
    recordMap,
    markConfig: CALENDAR_MARK_CONFIG,
    monthlySummary,
    boogleRecordView,
    lifeRecordView,
    autoTagItems,
    isLoading,
    isError,
    error,
    isMonthError,
    monthError,
    handlePreviousMonthButtonClick,
    handleNextMonthButtonClick,
    handleDateCellClick,
    handleBoogleRecordCreateButtonClick,
    handleBoogleRecordEditButtonClick,
    handleLifeRecordCreateButtonClick,
    handleLifeRecordEditButtonClick,
  };
};

export default useCalendarState;
