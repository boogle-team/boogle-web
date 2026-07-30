import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import {
  HEALTH_GUIDES,
  PERSONAL_GUIDES,
  WARNING_GUIDE,
} from '../constants/guideMainItems';
import GuideCard from './GuideCard';
import GuideCardSection from './GuideCardSection';
import InsufficientGuideIcon from '../assets/illustrations/insufficientGuideIcon.svg?react';

interface GuideMainViewPropTypes {
  isInsufficient?: boolean;
}

const GuideMainView = ({ isInsufficient = false }: GuideMainViewPropTypes) => (
  <section className="-mb-[10rem] min-h-screen bg-beige-5 px-layout pb-[10rem] text-gray-10">
    <div className="-mx-layout bg-beige-5">
      <div className="h-10" />
      <TopNavigation
        title="가이드"
        isBackButtonVisible={false}
        isBorderVisible={false}
        className="bg-beige-5"
      />
    </div>

    <div className="pt-4">
      <GuideCardSection title="내 패턴 기반" guideItems={PERSONAL_GUIDES}>
        {isInsufficient ? <InsufficientGuideCard /> : undefined}
      </GuideCardSection>

      <GuideDivider />

      <GuideCardSection title="장 건강 기본 정보" guideItems={HEALTH_GUIDES} />

      <GuideDivider />

      <GuideCardSection title="주의 신호" isWarning>
        <GuideCard guideItem={WARNING_GUIDE} isWarning />
      </GuideCardSection>
    </div>
  </section>
);

const GuideDivider = () => <hr className="my-8 border-beige-7" />;

const InsufficientGuideCard = () => (
  <article className="flex min-h-[4.5rem] items-center gap-3 rounded-lg border border-dashed border-orange-4 bg-orange-1 px-4 py-3">
    <InsufficientGuideIcon aria-hidden="true" className="h-10 w-10 shrink-0" />
    <div>
      <h3 className="caption-bold text-gray-10">
        아직 패턴을 보여드리기엔 일러요
      </h3>
      <p className="micro mt-1 text-gray-7">
        3일 이상 기록하면 가이드가 나타나요!
      </p>
    </div>
  </article>
);

export default GuideMainView;
