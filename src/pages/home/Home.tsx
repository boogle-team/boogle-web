import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CalendarPicker from './components/CalendarPicker';
import DateBottomModal from './components/DateBottomModal';
import {
  MOCK_HOME_RECORD_STATUS_BY_DATE,
  MOCK_HOME_RESPONSE,
} from './constants/mockHomeData';
import {
  getHomeDateSubTitle,
  getHomeDateTitle,
} from './utils/homeDateUtils';

const Home = () => {
  const navigate = useNavigate();
  const homeData = MOCK_HOME_RESPONSE.data;
  const [selectedDate, setSelectedDate] = useState(homeData.today.date);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-beige-6">
      <div className="bg-beige-1">
        <div className="h-12.25" />
        <TopNavigation
          variant="home"
          title={getHomeDateTitle(selectedDate)}
          subTitle={getHomeDateSubTitle(selectedDate)}
          hasUnreadNotification
          onTitleClick={handleDateTitleClick}
          onNotificationButtonClick={handleNotificationButtonClick}
          onSettingButtonClick={handleSettingButtonClick}
        />
        <CalendarPicker
          selectedDate={selectedDate}
          todayDate={homeData.today.date}
          recordStatusByDate={MOCK_HOME_RECORD_STATUS_BY_DATE}
          onSelectDate={handleCalendarDateSelect}
        />
      </div>

      <div className="min-h-[24rem] bg-beige-6" />

      <DateBottomModal
        isOpen={isDateModalOpen}
        onClose={handleDateModalClose}
      />
    </div>
  );
};

export default Home;
