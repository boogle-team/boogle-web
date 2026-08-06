import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import {
  HOME_DATE_MODAL_MARK_CONFIG,
  MAX_RECORD_SUMMARY_RANGE_COUNT,
} from '@/pages/home/constants/homeCalendarConfig';
import { HOME_RECORD_SUMMARY_RANGE } from '@/pages/home/constants/homeQueryKeys';
import useHomeQuery from '@/pages/home/hooks/useHomeQuery';
import useHomeRecordSummaryQueries from '@/pages/home/hooks/useHomeRecordSummaryQueries';
import { useHomeSelectedDateStore } from '@/pages/home/stores/homeSelectedDateStore';
import useDailyRecordQuery from '@/shared/hooks/useDailyRecordQuery';
import type { HomeViewModelTypes } from '@/pages/home/types/homeTypes';
import { getCalendarRecordMapFromHomeStatus } from '@/pages/home/utils/homeCalendarUtils';
import { getHomeViewModel } from '@/pages/home/utils/homeDataMapper';
import {
  getFullWeekdayLabel,
  getMonthDayLabel,
} from '@/shared/utils/dateLabelUtils';
import type {
  CalendarMarkConfigMapTypes,
  CalendarRecordMapTypes,
} from '@/shared/components/calendar';

interface UseHomeStateReturnTypes {
  isLoading: boolean;
  isError: boolean;
  isDailyRecordLoading: boolean;
  isDailyRecordError: boolean;
  dailyRecordErrorMessage: string;
  isRecordSummaryError: boolean;
  recordSummaryErrorMessage: string;
  selectedDateValue: string;
  homeViewModel: HomeViewModelTypes | null;
  dateModalRecordMap: CalendarRecordMapTypes;
  dateModalMarkConfig: CalendarMarkConfigMapTypes;
  calendarPickerKey: string;
  homeDateTitle: string;
  homeDateSubTitle: string;
  isDateModalOpen: boolean;
  handleDateTitleClick: () => void;
  handleDateModalClose: () => void;
  handleNotificationButtonClick: () => void;
  handleSettingButtonClick: () => void;
  handleCalendarDateSelect: (date: string) => void;
  handleDateModalSelect: (date: string) => void;
  handleRecordSummaryRangeRequest: (baseDate: string) => void;
  handleRecordSummaryRetryButtonClick: () => void;
  handleBoogleRecordCreateButtonClick: () => void;
  handleBoogleRecordEditButtonClick: (recordId: number) => void;
  handleLifeRecordCreateButtonClick: () => void;
  handleLifeRecordEditButtonClick: (recordId: number) => void;
  handleWeeklyPatternCardClick: () => void;
}

const useHomeState = (): UseHomeStateReturnTypes => {
  const navigate = useNavigate();
  const { homeData, isError, isLoading } = useHomeQuery();
  const selectedDate = useHomeSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useHomeSelectedDateStore(
    (state) => state.setSelectedDate,
  );
  const registeredRecordSummaryBaseDatesRef = useRef(new Set<string>());
  const [recordSummaryBaseDates, setRecordSummaryBaseDates] = useState<
    string[]
  >([]);
  const [pickerBaseDate, setPickerBaseDate] = useState<string | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const selectedDateValue = homeData
    ? (selectedDate ?? homeData.today.date)
    : '';
  const {
    data: selectedDailyRecord,
    error: dailyRecordError,
    isError: isDailyRecordError,
    isLoading: isDailyRecordLoading,
  } = useDailyRecordQuery(selectedDateValue);
  const {
    recordStatusByDate: summaryRecordStatusByDate,
    isError: isRecordSummaryError,
    error: recordSummaryError,
    refetchRecordSummaries,
  } = useHomeRecordSummaryQueries(
    recordSummaryBaseDates,
    HOME_RECORD_SUMMARY_RANGE,
  );
  const dailyRecordErrorMessage = isDailyRecordError
    ? getApiErrorMessage(dailyRecordError, '잠시 후 다시 시도해 주세요')
    : '';
  const recordSummaryErrorMessage = isRecordSummaryError
    ? getApiErrorMessage(recordSummaryError, '기록 표시를 불러오지 못했어요')
    : '';

  const homeViewModel = useMemo(() => {
    if (!homeData || !selectedDateValue) return null;

    return getHomeViewModel({
      dailyRecord: selectedDailyRecord,
      homeData,
      selectedDate: selectedDateValue,
      summaryRecordStatusByDate,
    });
  }, [
    homeData,
    selectedDailyRecord,
    selectedDateValue,
    summaryRecordStatusByDate,
  ]);

  const dateModalRecordMap = useMemo(() => {
    if (!homeViewModel) return {};

    return getCalendarRecordMapFromHomeStatus(homeViewModel.recordStatusByDate);
  }, [homeViewModel]);

  const calendarPickerKey = pickerBaseDate ?? homeViewModel?.todayDate ?? '';

  const homeDateTitle = selectedDateValue
    ? getMonthDayLabel(selectedDateValue)
    : '';
  const homeDateSubTitle = selectedDateValue
    ? getFullWeekdayLabel(selectedDateValue)
    : '';

  const handleDateTitleClick = () => {
    setIsDateModalOpen(true);
  };

  const handleDateModalClose = () => {
    setIsDateModalOpen(false);
  };

  const handleNotificationButtonClick = () => {
    navigate('/notifications');
  };

  const handleSettingButtonClick = () => {
    navigate('/settings');
  };

  const handleCalendarDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleDateModalSelect = (date: string) => {
    setPickerBaseDate(date);
    setSelectedDate(date);
  };

  const handleRecordSummaryRangeRequest = useCallback((baseDate: string) => {
    if (registeredRecordSummaryBaseDatesRef.current.has(baseDate)) return;

    registeredRecordSummaryBaseDatesRef.current.add(baseDate);
    setRecordSummaryBaseDates((currentBaseDates) => {
      const nextBaseDates = [...currentBaseDates, baseDate].slice(
        -MAX_RECORD_SUMMARY_RANGE_COUNT,
      );
      const removedBaseDates = currentBaseDates.filter(
        (currentBaseDate) => !nextBaseDates.includes(currentBaseDate),
      );

      // 제거된 범위는 다시 스크롤해 돌아왔을 때 재등록될 수 있어야 한다
      removedBaseDates.forEach((removedBaseDate) => {
        registeredRecordSummaryBaseDatesRef.current.delete(removedBaseDate);
      });

      return nextBaseDates;
    });
  }, []);

  const handleRecordSummaryRetryButtonClick = () => {
    void refetchRecordSummaries();
  };

  const handleBoogleRecordCreateButtonClick = () => {
    navigate(`/boogle-record/new?date=${selectedDateValue}`);
  };

  const handleBoogleRecordEditButtonClick = (recordId: number) => {
    navigate(`/boogle-record/edit/${recordId}`);
  };

  const handleLifeRecordCreateButtonClick = () => {
    navigate(`/life-record/new?date=${selectedDateValue}`);
  };

  const handleLifeRecordEditButtonClick = (recordId: number) => {
    navigate(`/life-record/edit/${recordId}`);
  };

  const handleWeeklyPatternCardClick = () => {
    navigate('/report');
  };

  return {
    isLoading,
    isError,
    isDailyRecordLoading,
    isDailyRecordError,
    dailyRecordErrorMessage,
    isRecordSummaryError,
    recordSummaryErrorMessage,
    selectedDateValue,
    homeViewModel,
    dateModalRecordMap,
    dateModalMarkConfig: HOME_DATE_MODAL_MARK_CONFIG,
    calendarPickerKey,
    homeDateTitle,
    homeDateSubTitle,
    isDateModalOpen,
    handleDateTitleClick,
    handleDateModalClose,
    handleNotificationButtonClick,
    handleSettingButtonClick,
    handleCalendarDateSelect,
    handleDateModalSelect,
    handleRecordSummaryRangeRequest,
    handleRecordSummaryRetryButtonClick,
    handleBoogleRecordCreateButtonClick,
    handleBoogleRecordEditButtonClick,
    handleLifeRecordCreateButtonClick,
    handleLifeRecordEditButtonClick,
    handleWeeklyPatternCardClick,
  };
};

export default useHomeState;
