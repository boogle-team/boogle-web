import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_DATE_MODAL_MARK_CONFIG } from '@/pages/home/constants/homeCalendarConfig';
import useHomeQuery from '@/pages/home/hooks/useHomeQuery';
import type { HomeViewModelTypes } from '@/pages/home/types/homeTypes';
import { getCalendarRecordMapFromHomeStatus } from '@/pages/home/utils/homeCalendarUtils';
import {
  getHomeDateSubTitle,
  getHomeDateTitle,
} from '@/pages/home/utils/homeDateUtils';
import { getHomeViewModel } from '@/pages/home/utils/homeDataMapper';
import type {
  CalendarMarkConfigMapTypes,
  CalendarRecordMapTypes,
} from '@/shared/components/calendar';

interface UseHomeStateReturnTypes {
  isLoading: boolean;
  isError: boolean;
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
}

const useHomeState = (): UseHomeStateReturnTypes => {
  const navigate = useNavigate();
  const { homeData, isError, isLoading } = useHomeQuery();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [pickerBaseDate, setPickerBaseDate] = useState<string | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const selectedDateValue = homeData
    ? (selectedDate ?? homeData.today.date)
    : '';

  const homeViewModel = useMemo(() => {
    if (!homeData || !selectedDateValue) return null;

    return getHomeViewModel({
      homeData,
      selectedDate: selectedDateValue,
    });
  }, [homeData, selectedDateValue]);

  const dateModalRecordMap = useMemo(() => {
    if (!homeViewModel) return {};

    return getCalendarRecordMapFromHomeStatus(homeViewModel.recordStatusByDate);
  }, [homeViewModel]);

  const calendarPickerKey = pickerBaseDate ?? homeViewModel?.todayDate ?? '';

  const homeDateTitle = selectedDateValue
    ? getHomeDateTitle(selectedDateValue)
    : '';
  const homeDateSubTitle = selectedDateValue
    ? getHomeDateSubTitle(selectedDateValue)
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

  return {
    isLoading,
    isError,
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
  };
};

export default useHomeState;
