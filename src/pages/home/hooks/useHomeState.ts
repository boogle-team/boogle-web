import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_DATE_MODAL_MARK_CONFIG } from '@/pages/home/constants/homeCalendarConfig';
import useHomeQuery from '@/pages/home/hooks/useHomeQuery';
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
  dailyRecordError: unknown;
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

  const homeViewModel = useMemo(() => {
    if (!homeData || !selectedDateValue) return null;

    return getHomeViewModel({
      dailyRecord: selectedDailyRecord,
      homeData,
      selectedDate: selectedDateValue,
    });
  }, [homeData, selectedDailyRecord, selectedDateValue]);

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
    dailyRecordError,
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
    handleBoogleRecordCreateButtonClick,
    handleBoogleRecordEditButtonClick,
    handleLifeRecordCreateButtonClick,
    handleLifeRecordEditButtonClick,
    handleWeeklyPatternCardClick,
  };
};

export default useHomeState;
