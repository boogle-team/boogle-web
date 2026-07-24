import { useState } from 'react';
import Sparkle from '@/shared/assets/icons/todaysTagSparkle.svg?react';
import { useNavigate } from 'react-router-dom';
import TagsSection from '@/shared/components/tagSection/TagsSection';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CalendarPicker from './components/CalendarPicker';
import DateBottomModal from './components/DateBottomModal';
import WeeklyPatternSection from './components/WeeklyPatternSection';
import {
  MOCK_HOME_RECORD_STATUS_BY_DATE,
  MOCK_HOME_RESPONSE,
} from './constants/mockHomeData';
import { getHomeDateSubTitle, getHomeDateTitle } from './utils/homeDateUtils';

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

      <div className="min-h-[24rem] bg-beige-6 py-8">
        <div className="flex flex-col gap-8">
          <TagsSection
            icon={<Sparkle />}
            title="이날의 태그"
            description="AI가 메모에서 찾아냈어요!"
            tags={homeData.tags}
          />
          <div className="mx-layout h-px bg-beige-7" />
          <WeeklyPatternSection weeklyPattern={homeData.weeklyPattern} />
        </div>
      </div>

      <DateBottomModal
        isOpen={isDateModalOpen}
        onClose={handleDateModalClose}
      />
    </div>
  );
};

export default Home;
