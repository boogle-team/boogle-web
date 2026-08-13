import InsufficientGuideIcon from '@/pages/guide/assets/illustrations/insufficientGuideIcon.svg?react';
import GuideCardSection from '@/pages/guide/components/GuideCardSection';
import type { GuideSectionViewTypes } from '@/pages/guide/utils/guideListAdapter';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

interface GuideMainViewPropTypes {
  guideSections: GuideSectionViewTypes[];
  isError: boolean;
  isLoading: boolean;
}

const GuideMainView = ({
  guideSections,
  isError,
  isLoading,
}: GuideMainViewPropTypes) => (
  <section className="-mb-[var(--bottom-navigation-page-space)] min-h-screen bg-beige-5 px-layout pb-[var(--bottom-navigation-page-space)] text-gray-10">
    <div className="-mx-layout bg-beige-5">
      <TopNavigation
        title="가이드"
        isBackButtonVisible={false}
        isBorderVisible={false}
        className="bg-beige-5"
      />
    </div>

    {isLoading || isError ? (
      <GuideMainStatus isError={isError} />
    ) : (
      <div className="pt-4">
        {guideSections.map((guideSection, index) => (
          <div key={guideSection.key}>
            {index > 0 && <GuideDivider />}
            <GuideCardSection
              title={guideSection.title}
              guideItems={guideSection.guideItems}
              isWarning={guideSection.isWarning}
            >
              {guideSection.status ? (
                <PatternGuideStatusCard {...guideSection.status} />
              ) : undefined}
            </GuideCardSection>
          </div>
        ))}
      </div>
    )}
  </section>
);

const GuideDivider = () => <hr className="my-8 border-beige-7" />;

interface GuideMainStatusPropTypes {
  isError: boolean;
}

const GuideMainStatus = ({ isError }: GuideMainStatusPropTypes) => (
  <p className="caption pt-10 text-center text-gray-7">
    {isError ? '가이드를 불러오지 못했어요.' : '가이드를 불러오는 중이에요.'}
  </p>
);

interface PatternGuideStatusCardPropTypes {
  description: string;
  title: string;
}

const PatternGuideStatusCard = ({
  description,
  title,
}: PatternGuideStatusCardPropTypes) => (
  <article className="flex min-h-[4.5rem] items-center gap-3 rounded-xl border border-dashed border-orange-4 bg-orange-1 px-4 py-3">
    <InsufficientGuideIcon aria-hidden="true" className="h-10 w-10 shrink-0" />
    <div>
      <h3 className="label-bold text-gray-10">{title}</h3>
      <p className="caption mt-1 text-gray-7">{description}</p>
    </div>
  </article>
);

export default GuideMainView;
