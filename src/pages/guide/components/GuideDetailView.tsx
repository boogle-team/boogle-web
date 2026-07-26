import { useNavigate } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';
import type { GuideDetailTypes } from '../types/guideTypes';
import GuideActionSection from './GuideActionSection';
import GuideCategoryBadge from './GuideCategoryBadge';
import GuideDescriptionText, { GuideSourceText } from './GuideDescriptionText';
import GuideDetailSummaryCard from './GuideDetailSummaryCard';
import GuideInfoSectionCard from './GuideInfoSectionCard';
import GuideRelatedGuideList from './GuideRelatedGuideList';
import GuideWarningNoticeSection from './GuideWarningNoticeSection';
import GuideWarningSignList from './GuideWarningSignList';

interface GuideDetailViewPropTypes {
  guideDetail: GuideDetailTypes;
  isFeedbackPending?: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideDetailView = ({
  guideDetail,
  isFeedbackPending = false,
  onFeedbackClick,
}: GuideDetailViewPropTypes) => {
  const navigate = useNavigate();
  const isInfoGuide = guideDetail.type === 'info';
  const isWarningGuide = guideDetail.type === 'warning';
  const hasInfoSections = Boolean(guideDetail.infoSections);
  const hasSummaryCard = !isInfoGuide && !isWarningGuide;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pb-10 text-gray-10">
      <div className="-mx-layout">
        <div className="h-10 bg-beige-5" />
        <TopNavigation
          title="가이드 상세"
          isBorderVisible={false}
          className="bg-beige-5"
          onBackButtonClick={handleBackClick}
        />
      </div>

      <div className="pt-6">
        <GuideCategoryBadge guideDetail={guideDetail} />

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

          {isWarningGuide && <GuideWarningSignList guideDetail={guideDetail} />}

          {hasSummaryCard && (
            <GuideDetailSummaryCard guideDetail={guideDetail} />
          )}

          {hasInfoSections && (
            <div
              className={
                hasSummaryCard ? 'mt-5 border-t border-beige-7 pt-5' : undefined
              }
            >
              <GuideInfoSectionCard guideDetail={guideDetail} />
            </div>
          )}
        </section>

        <GuideActionSection
          feedbackStatus={guideDetail.feedbackStatus}
          guideDetail={guideDetail}
          isFeedbackPending={isFeedbackPending}
          onFeedbackClick={onFeedbackClick}
        />

        {!isWarningGuide && <GuideSourceText guideDetail={guideDetail} />}
        {isWarningGuide && (
          <GuideWarningNoticeSection guideDetail={guideDetail} />
        )}

        <GuideRelatedGuideList relatedGuides={guideDetail.relatedGuides} />
      </div>
    </section>
  );
};

export default GuideDetailView;
