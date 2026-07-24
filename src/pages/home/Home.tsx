import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CalendarPicker from './components/CalendarPicker';
import DateBottomModal from './components/DateBottomModal';
import HomeContentSection from './components/HomeContentSection';
import {
  MOCK_HOME_RECORD_STATUS_BY_DATE,
  MOCK_HOME_RESPONSE,
} from './constants/mockHomeData';
import { getHomeDateSubTitle, getHomeDateTitle } from './utils/homeDateUtils';
import { getHomeMessageBannerContent } from './utils/homeMessageUtils';

const Home = () => {
  const navigate = useNavigate();
  const homeData = MOCK_HOME_RESPONSE.data;
  const messageBannerContent = getHomeMessageBannerContent(homeData);
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
    <div className="-mb-[10rem] min-h-screen bg-beige-6 pb-[10rem]">
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

      <HomeContentSection
        messageBannerContent={messageBannerContent}
        autoTags={homeData.lifeRecord?.autoTags ?? []}
        weeklyPattern={homeData.weeklyPattern}
      />
      <DateBottomModal
        isOpen={isDateModalOpen}
        onClose={handleDateModalClose}
      />
    </div>
  );
};

export default Home;
