import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import useGuideFeedback from '../hooks/useGuideFeedback';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';
import type { GuideDetailTypes } from '../types/guideTypes';
import GuideActionSection from './GuideActionSection';
import GuideCategoryBadge from './GuideCategoryBadge';
import GuideDescriptionText, { GuideSourceText } from './GuideDescriptionText';
import GuideDetailSummaryCard from './GuideDetailSummaryCard';
import GuideFeedbackToast from './GuideFeedbackToast';
import GuideInfoSectionCard from './GuideInfoSectionCard';
import GuideRelatedGuideList from './GuideRelatedGuideList';
import GuideWarningNoticeSection from './GuideWarningNoticeSection';
import GuideWarningSignList from './GuideWarningSignList';

interface GuideDetailViewPropTypes {
  guideDetail: GuideDetailTypes;
}

const FEEDBACK_TOAST_DURATION = 2500;

const GuideDetailView = ({ guideDetail }: GuideDetailViewPropTypes) => {
  const navigate = useNavigate();
  const { feedbackStatus, isFeedbackPending, submitGuideFeedback } =
    useGuideFeedback(
      Number(guideDetail.id),
      guideDetail.feedbackStatus ?? null,
    );
  const [isFeedbackErrorToastVisible, setIsFeedbackErrorToastVisible] =
    useState(false);
  const isInfoGuide = guideDetail.type === 'info';
  const isWarningGuide = guideDetail.type === 'warning';
  const hasInfoSections = Boolean(guideDetail.infoSections);
  const hasSummaryCard = !isInfoGuide && !isWarningGuide;
  const [isFeedbackToastVisible, setIsFeedbackToastVisible] = useState(false);

  useEffect(() => {
    if (!isFeedbackToastVisible) return;

    const toastTimerId = window.setTimeout(() => {
      setIsFeedbackToastVisible(false);
    }, FEEDBACK_TOAST_DURATION);

    return () => window.clearTimeout(toastTimerId);
  }, [isFeedbackToastVisible]);

  useEffect(() => {
    if (!isFeedbackErrorToastVisible) return;

    const errorToastTimerId = window.setTimeout(() => {
      setIsFeedbackErrorToastVisible(false);
    }, FEEDBACK_TOAST_DURATION);

    return () => window.clearTimeout(errorToastTimerId);
  }, [isFeedbackErrorToastVisible]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 성공하면 감사 토스트를, 실패하면 재시도 안내 토스트를 노출한다.
  const handleFeedbackClick = async (feedback: GuideFeedbackTypes) => {
    const isSubmitted = await submitGuideFeedback(feedback);

    if (isSubmitted) {
      setIsFeedbackToastVisible(true);

      return;
    }

    setIsFeedbackErrorToastVisible(true);
  };

  return (
    <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pb-10 text-gray-10">
      <div className="-mx-layout">
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
          feedbackStatus={feedbackStatus}
          guideDetail={guideDetail}
          isFeedbackPending={isFeedbackPending}
          isFeedbackToastVisible={isFeedbackToastVisible}
          onFeedbackClick={handleFeedbackClick}
        />

        {isWarningGuide && (
          <GuideWarningNoticeSection guideDetail={guideDetail} />
        )}
        {/* 주의 신호는 notice 블록이 출처까지 함께 그리므로 그때만 생략한다. */}
        {!(isWarningGuide && guideDetail.notice) && (
          <GuideSourceText guideDetail={guideDetail} />
        )}

        <GuideRelatedGuideList relatedGuides={guideDetail.relatedGuides} />
      </div>

      {isFeedbackErrorToastVisible && (
        <div className="fixed inset-x-0 bottom-[calc(var(--safe-area-bottom)+var(--page-bottom-padding))] z-50 mx-auto flex max-w-[430px] justify-center px-layout">
          <GuideFeedbackToast variant="error" />
        </div>
      )}
    </section>
  );
};

export default GuideDetailView;
