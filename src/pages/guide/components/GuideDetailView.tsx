import GuideActionSection from '@/pages/guide/components/GuideActionSection';
import GuideCategoryBadge from '@/pages/guide/components/GuideCategoryBadge';
import GuideDescriptionText from '@/pages/guide/components/GuideDescriptionText';
import GuideDetailSummaryCard from '@/pages/guide/components/GuideDetailSummaryCard';
import GuideFeedbackToast from '@/pages/guide/components/GuideFeedbackToast';
import GuideInfoSectionCard from '@/pages/guide/components/GuideInfoSectionCard';
import GuideRelatedGuideList from '@/pages/guide/components/GuideRelatedGuideList';
import GuideSourceText from '@/pages/guide/components/GuideSourceText';
import GuideWarningNoticeSection from '@/pages/guide/components/GuideWarningNoticeSection';
import GuideWarningSignList from '@/pages/guide/components/GuideWarningSignList';
import type { GuideFeedbackToastVariantTypes } from '@/pages/guide/hooks/useGuideFeedbackToast';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';
import type { GuideDetailTypes } from '@/pages/guide/types/guideTypes';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

interface GuideDetailViewPropTypes {
  feedbackToastVariant: GuideFeedbackToastVariantTypes | null;
  guideDetail: GuideDetailTypes;
  isFeedbackPending: boolean;
  onBackClick: () => void;
  onFeedbackClick: (feedback: GuideFeedbackTypes) => void;
}

const GuideDetailView = ({
  feedbackToastVariant,
  guideDetail,
  isFeedbackPending,
  onBackClick,
  onFeedbackClick,
}: GuideDetailViewPropTypes) => {
  const isInfoGuide = guideDetail.type === 'info';
  const isPersonalGuide = guideDetail.type === 'personal';
  const isWarningGuide = guideDetail.type === 'warning';
  const infoSections = isWarningGuide ? [] : guideDetail.infoSections;
  const hasInfoSections = infoSections.length > 0;

  return (
    <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pb-10 text-gray-10">
      <div className="-mx-layout">
        <TopNavigation
          title="가이드 상세"
          isBorderVisible={false}
          className="bg-beige-5"
          onBackButtonClick={onBackClick}
        />
      </div>

      <div className="pt-6">
        <GuideCategoryBadge guideType={guideDetail.type} />

        <h2 className="display mt-5 tracking-[-0.06875rem] text-gray-10">
          {guideDetail.title}
        </h2>
        <GuideDescriptionText text={guideDetail.description} />

        <section className="mt-9">
          {!isInfoGuide && (
            <h3 className="label-semi mb-2 text-gray-8">
              {isWarningGuide ? '증상별 확인' : '이 패턴이 나온 이유'}
            </h3>
          )}

          {isWarningGuide && (
            <GuideWarningSignList warningSigns={guideDetail.warningSigns} />
          )}

          {isPersonalGuide && (
            <GuideDetailSummaryCard
              metrics={guideDetail.metrics}
              notice={guideDetail.notice}
            />
          )}

          {hasInfoSections && (
            <div
              className={
                isPersonalGuide
                  ? 'mt-5 border-t border-beige-7 pt-5'
                  : undefined
              }
            >
              <GuideInfoSectionCard infoSections={infoSections} />
            </div>
          )}
        </section>

        <GuideActionSection
          actions={guideDetail.actions}
          feedbackStatus={isPersonalGuide ? guideDetail.feedbackStatus : null}
          isFeedbackAllowed={isPersonalGuide}
          isFeedbackPending={isFeedbackPending}
          isFeedbackToastVisible={feedbackToastVariant === 'success'}
          onFeedbackClick={onFeedbackClick}
        />

        {isWarningGuide ? (
          <GuideWarningNoticeSection
            notice={guideDetail.notice}
            source={guideDetail.source}
          />
        ) : (
          <GuideSourceText source={guideDetail.source} />
        )}

        <GuideRelatedGuideList relatedGuides={guideDetail.relatedGuides} />
      </div>

      {feedbackToastVariant === 'error' && (
        <div className="fixed inset-x-0 bottom-[calc(var(--safe-area-bottom)+var(--page-bottom-padding))] z-50 mx-auto flex max-w-[430px] justify-center px-layout">
          <GuideFeedbackToast variant="error" />
        </div>
      )}
    </section>
  );
};

export default GuideDetailView;
