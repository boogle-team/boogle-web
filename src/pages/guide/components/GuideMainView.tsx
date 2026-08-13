import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import useGuidesQuery from '../hooks/useGuidesQuery';
import GuideCardSection from './GuideCardSection';
import InsufficientGuideIcon from '../assets/illustrations/insufficientGuideIcon.svg?react';

interface GuideMainViewPropTypes {
  isInsufficient?: boolean;
}

const GuideMainView = ({ isInsufficient = false }: GuideMainViewPropTypes) => {
  const { guidesData, isError, isLoading } = useGuidesQuery();

  const patternSection = guidesData?.patternGuideSection;
  const healthSection = guidesData?.healthGuideSection;
  const warningSection = guidesData?.warningGuideSection;
  const isPatternDataInsufficient =
    isInsufficient ||
    patternSection?.dataStatus === 'INSUFFICIENT' ||
    (patternSection !== undefined &&
      patternSection.recordedDays < patternSection.requiredDays);
  const isPatternGuideEmpty =
    patternSection !== undefined &&
    !isPatternDataInsufficient &&
    (patternSection.dataStatus === 'NOT_FOUND' ||
      patternSection.guides.length === 0);

  return (
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
          <GuideCardSection
            title={patternSection?.sectionTitle ?? '내 패턴 기반'}
            guideItems={patternSection?.guides}
          >
            {isPatternDataInsufficient ? (
              <PatternGuideStatusCard
                title="아직 패턴을 보여드리기엔 일러요"
                description={
                  patternSection?.notice?.message ??
                  '3일 이상 기록하면 카드가 나타나요!'
                }
              />
            ) : isPatternGuideEmpty ? (
              <PatternGuideStatusCard
                title="이번 주에는 눈에 띄는 패턴이 없어요"
                description="기록을 계속하면 새로운 패턴을 알려드릴게요."
              />
            ) : undefined}
          </GuideCardSection>

          <GuideDivider />

          <GuideCardSection
            title={healthSection?.sectionTitle ?? '장 건강 기본 정보'}
            guideItems={healthSection?.guides}
          />

          <GuideDivider />

          <GuideCardSection
            title={warningSection?.sectionTitle ?? '주의 신호'}
            guideItems={warningSection?.guides}
            isWarning
          />
        </div>
      )}
    </section>
  );
};

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
