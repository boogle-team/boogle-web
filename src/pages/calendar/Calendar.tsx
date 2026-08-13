import { CalendarGrid, MonthNavigator } from '@/shared/components/calendar';
import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
} from '@/shared/components/dailyRecord';
import InlineLoadingState from '@/shared/components/InlineLoadingState';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import TagsSection from '@/shared/components/tagSection/TagsSection';
import Sparkle from '@/shared/assets/icons/todaysTagSparkle.svg?react';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import CalendarLegend from '@/pages/calendar/components/CalendarLegend';
import CalendarMonthlySummaryBar from '@/pages/calendar/components/CalendarMonthlySummaryBar';
import SelectedDateHeader from '@/pages/calendar/components/SelectedDateHeader';
import useCalendarState from '@/pages/calendar/hooks/useCalendarState';

const Calendar = () => {
  const {
    currentDate,
    todayDate,
    selectedDate,
    recordMap,
    markConfig,
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
  } = useCalendarState();

  return (
    <div className="-mb-[var(--bottom-navigation-page-space)] min-h-screen bg-beige-5 pb-[var(--bottom-navigation-page-space)]">
      <TopNavigation
        title="캘린더"
        isBackButtonVisible={false}
        isBorderVisible={false}
        className="bg-beige-5"
      />

      <div className="px-4 pb-6">
        <MonthNavigator
          currentDate={currentDate}
          onPrevMonth={handlePreviousMonthButtonClick}
          onNextMonth={handleNextMonthButtonClick}
        />
        <CalendarLegend />
        <CalendarGrid
          currentDate={currentDate}
          recordMap={recordMap}
          selectedDate={selectedDate}
          todayDate={todayDate}
          markConfig={markConfig}
          onSelectDate={handleDateCellClick}
        />

        {isMonthError ? (
          <p className="pt-4 text-center caption text-gray-8">
            이번 달 기록 표시를 불러오지 못했어요
            <br />
            {getApiErrorMessage(monthError, '잠시 후 다시 시도해 주세요')}
          </p>
        ) : null}
      </div>

      <div className="px-layout pt-6">
        <CalendarMonthlySummaryBar summary={monthlySummary} />
      </div>

      <section className="flex flex-col gap-3 px-layout py-8">
        <SelectedDateHeader selectedDate={selectedDate} />

        {isLoading ? (
          <InlineLoadingState message="기록을 불러오는 중이에요" />
        ) : null}
        {isError ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center text-gray-8">
            <p className="body-m-bold">기록 정보를 불러오지 못했어요</p>
            <p className="pt-1 caption">
              {getApiErrorMessage(error, '잠시 후 다시 시도해 주세요')}
            </p>
          </div>
        ) : null}
        {!isLoading && !isError ? (
          <div className="flex flex-col gap-7">
            <DailyBoogleRecordCard
              view={boogleRecordView}
              shouldShowActionWhenRecorded={false}
              onCreateClick={handleBoogleRecordCreateButtonClick}
              onEditClick={handleBoogleRecordEditButtonClick}
            />
            <DailyLifeRecordCard
              view={lifeRecordView}
              shouldShowDetail
              onCreateClick={handleLifeRecordCreateButtonClick}
              onEditClick={handleLifeRecordEditButtonClick}
            />

            <TagsSection
              icon={<Sparkle />}
              title="이날의 태그"
              description="AI가 메모에서 찾았어요!"
              tags={autoTagItems}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Calendar;
