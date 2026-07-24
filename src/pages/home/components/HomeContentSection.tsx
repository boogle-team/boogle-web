import Sparkle from '@/shared/assets/icons/todaysTagSparkle.svg?react';
import TagsSection from '@/shared/components/tagSection/TagsSection';
import type { HomeWeeklyPatternTypes } from '../types/homeTypes';
import type { HomeMessageBannerContentTypes } from '../utils/homeMessageUtils';
import HomeMessageBanner from './HomeMessageBanner';
import WeeklyPatternSection from './WeeklyPatternSection';

interface HomeContentSectionPropTypes {
  messageBannerContent: HomeMessageBannerContentTypes;
  autoTags: string[];
  weeklyPattern: HomeWeeklyPatternTypes | null;
}

const HomeContentSection = ({
  messageBannerContent,
  autoTags,
  weeklyPattern,
}: HomeContentSectionPropTypes) => {
  const tagItems = autoTags.map((tagLabel, tagIndex) => ({
    id: `${tagLabel}-${tagIndex}`,
    label: tagLabel,
  }));

  return (
    <section className="min-h-[24rem] bg-beige-6 px-layout py-8">
      <div className="flex flex-col gap-8">
        <HomeMessageBanner content={messageBannerContent} />
        <TagsSection
          icon={<Sparkle />}
          title="이날의 태그"
          description="AI가 메모에서 찾아냈어요!"
          tags={tagItems}
        />
        <div className="h-px w-full bg-beige-7" />
        <WeeklyPatternSection weeklyPattern={weeklyPattern} />
      </div>
    </section>
  );
};

export default HomeContentSection;
