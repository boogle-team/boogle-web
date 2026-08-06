import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import CalendarPicker from '@/pages/home/components/CalendarPicker';
import DateBottomModal from '@/pages/home/components/DateBottomModal';
import HomeContentSection from '@/pages/home/components/HomeContentSection';
import useHomeState from '@/pages/home/hooks/useHomeState';

const Home = () => {
  const {
    isLoading,
    isError,
    isDailyRecordLoading,
    isDailyRecordError,
    dailyRecordErrorMessage,
    isRecordSummaryLoading,
    isRecordSummaryError,
    recordSummaryErrorMessage,
    selectedDateValue,
    homeViewModel,
    dateModalRecordMap,
    dateModalMarkConfig,
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
  } = useHomeState();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige-6">
        <div className="h-12.25 bg-beige-1" />
        <div className="h-[13.1875rem] bg-beige-1" />
        <section className="min-h-[24rem] bg-beige-6 px-layout py-8">
          <div className="h-[5.75rem] rounded-xl bg-beige-1" />
        </section>
      </div>
    );
  }

  if (isError || !homeViewModel || !selectedDateValue) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige-6 px-layout text-center">
        <p className="body-m-bold text-gray-8">홈 정보를 불러오지 못했어요</p>
      </div>
    );
  }

  return (
    <div className="-mb-[10rem] min-h-screen bg-beige-6 pb-[10rem]">
      <div className="bg-beige-1">
        <div className="h-12.25" />
        <TopNavigation
          variant="home"
          title={homeDateTitle}
          subTitle={homeDateSubTitle}
          hasUnreadNotification
          onTitleClick={handleDateTitleClick}
          onNotificationButtonClick={handleNotificationButtonClick}
          onSettingButtonClick={handleSettingButtonClick}
        />
        <CalendarPicker
          key={calendarPickerKey}
          selectedDate={selectedDateValue}
          todayDate={homeViewModel.todayDate}
          recordStatusByDate={homeViewModel.recordStatusByDate}
          isRecordSummaryLoading={isRecordSummaryLoading}
          isRecordSummaryError={isRecordSummaryError}
          recordSummaryErrorMessage={recordSummaryErrorMessage}
          onSelectDate={handleCalendarDateSelect}
          onRecordSummaryRangeRequest={handleRecordSummaryRangeRequest}
          onRecordSummaryRetryClick={handleRecordSummaryRetryButtonClick}
        />
      </div>

      <HomeContentSection
        selectedDateContent={homeViewModel.selectedDateContent}
        selectedDate={selectedDateValue}
        todayDate={homeViewModel.todayDate}
        isDailyRecordLoading={isDailyRecordLoading}
        isDailyRecordError={isDailyRecordError}
        dailyRecordErrorMessage={dailyRecordErrorMessage}
        onBoogleRecordCreateClick={handleBoogleRecordCreateButtonClick}
        onBoogleRecordEditClick={handleBoogleRecordEditButtonClick}
        onLifeRecordCreateClick={handleLifeRecordCreateButtonClick}
        onLifeRecordEditClick={handleLifeRecordEditButtonClick}
        onWeeklyPatternCardClick={handleWeeklyPatternCardClick}
      />
      <DateBottomModal
        isOpen={isDateModalOpen}
        selectedDate={selectedDateValue}
        todayDate={homeViewModel.todayDate}
        recordMap={dateModalRecordMap}
        markConfig={dateModalMarkConfig}
        onClose={handleDateModalClose}
        onSelectDate={handleDateModalSelect}
        onVisibleMonthChange={handleRecordSummaryRangeRequest}
      />
    </div>
  );
};

export default Home;
