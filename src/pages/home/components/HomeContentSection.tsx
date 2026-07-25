import Sparkle from '@/shared/assets/icons/todaysTagSparkle.svg?react';
import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
} from '@/shared/components/dailyRecord';
import TagsSection from '@/shared/components/tagSection/TagsSection';
import type { HomeSelectedDateContentTypes } from '@/pages/home/types/homeTypes';
import { isHomeToday } from '@/pages/home/utils/homeDateUtils';
import HomeMessageBanner from '@/pages/home/components/HomeMessageBanner';
import WeeklyPatternSection from '@/pages/home/components/WeeklyPatternSection';

interface HomeContentSectionPropTypes {
  selectedDateContent: HomeSelectedDateContentTypes;
  selectedDate: string;
  todayDate: string;
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
  const shouldShowSectionDivider =
    tagItems.length > 0 && Boolean(weeklyPattern);
  const shouldShowMessageBanner = isHomeToday(selectedDate, todayDate);

  return (
    <section className="min-h-[24rem] bg-beige-6 px-layout py-8">
      <div className="flex flex-col gap-7">
        {shouldShowMessageBanner ? (
          <HomeMessageBanner content={messageBannerContent} />
        ) : null}
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
