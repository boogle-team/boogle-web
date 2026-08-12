import Sparkle from '@/shared/assets/icons/todaysTagSparkle.svg?react';
import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
} from '@/shared/components/dailyRecord';
import InlineLoadingState from '@/shared/components/InlineLoadingState';
import TagsSection from '@/shared/components/tagSection/TagsSection';
import type { HomeSelectedDateContentTypes } from '@/pages/home/types/homeTypes';
import { isHomeToday } from '@/pages/home/utils/homeDateUtils';
import HomeMessageBanner from '@/pages/home/components/HomeMessageBanner';
import WeeklyPatternSection from '@/pages/home/components/WeeklyPatternSection';

interface HomeContentSectionPropTypes {
  selectedDateContent: HomeSelectedDateContentTypes;
  selectedDate: string;
  todayDate: string;
  isDailyRecordLoading: boolean;
  isDailyRecordError: boolean;
  dailyRecordErrorMessage: string;
  onBoogleRecordCreateClick: () => void;
  onBoogleRecordEditClick: (recordId: number) => void;
  onLifeRecordCreateClick: () => void;
  onLifeRecordEditClick: (recordId: number) => void;
  onWeeklyPatternCardClick: () => void;
}

const HomeContentSection = ({
  selectedDateContent,
  selectedDate,
  todayDate,
  isDailyRecordLoading,
  isDailyRecordError,
  dailyRecordErrorMessage,
  onBoogleRecordCreateClick,
  onBoogleRecordEditClick,
  onLifeRecordCreateClick,
  onLifeRecordEditClick,
  onWeeklyPatternCardClick,
}: HomeContentSectionPropTypes) => {
  const {
    autoTags,
    boogleRecordView,
    lifeRecordView,
    messageBannerContent,
    weeklyPattern,
  } = selectedDateContent;
  const tagItems = autoTags.map((tagLabel, tagIndex) => ({
    id: `${tagLabel}-${tagIndex}`,
    label: tagLabel,
  }));
  const shouldShowDailyRecordContent =
    !isDailyRecordLoading && !isDailyRecordError;
  const shouldShowSectionDivider =
    shouldShowDailyRecordContent &&
    tagItems.length > 0 &&
    Boolean(weeklyPattern);
  const shouldShowMessageBanner = isHomeToday(selectedDate, todayDate);

  return (
    <section className="min-h-[24rem] bg-beige-6 px-layout py-8">
      <div className="flex flex-col gap-7">
        {shouldShowMessageBanner ? (
          <HomeMessageBanner content={messageBannerContent} />
        ) : null}
        {isDailyRecordLoading ? (
          <InlineLoadingState message="기록을 불러오는 중이에요" />
        ) : null}
        {isDailyRecordError ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center text-gray-8">
            <p className="body-m-bold">기록 정보를 불러오지 못했어요</p>
            <p className="pt-1 caption">{dailyRecordErrorMessage}</p>
          </div>
        ) : null}
        {shouldShowDailyRecordContent ? (
          <div className="flex flex-col gap-7">
            <DailyBoogleRecordCard
              view={boogleRecordView}
              onCreateClick={onBoogleRecordCreateClick}
              onEditClick={onBoogleRecordEditClick}
            />
            <DailyLifeRecordCard
              view={lifeRecordView}
              onCreateClick={onLifeRecordCreateClick}
              onEditClick={onLifeRecordEditClick}
            />
          </div>
        ) : null}
        <TagsSection
          icon={<Sparkle />}
          title="이날의 태그"
          description="AI가 메모에서 찾아냈어요!"
          tags={tagItems}
        />
        {shouldShowSectionDivider ? (
          <div className="h-px w-full bg-beige-7" />
        ) : null}
        <WeeklyPatternSection
          weeklyPattern={weeklyPattern}
          onCardClick={onWeeklyPatternCardClick}
        />
      </div>
    </section>
  );
};

export default HomeContentSection;
