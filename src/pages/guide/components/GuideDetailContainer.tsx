import { useNavigate } from 'react-router-dom';

import GuideDetailView from '@/pages/guide/components/GuideDetailView';
import useGuideDetailQuery from '@/pages/guide/hooks/useGuideDetailQuery';
import useGuideFeedback from '@/pages/guide/hooks/useGuideFeedback';
import useGuideFeedbackToast from '@/pages/guide/hooks/useGuideFeedbackToast';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';
import { getGuideDetailFromResponse } from '@/pages/guide/utils/guideDetailAdapter';

interface GuideDetailContainerPropTypes {
  guideId: number;
}

const GuideDetailContainer = ({ guideId }: GuideDetailContainerPropTypes) => {
  const navigate = useNavigate();
  const { guideDetailData, isError, isLoading } = useGuideDetailQuery(guideId);
  const { isPending, mutateAsync: submitGuideFeedback } =
    useGuideFeedback(guideId);
  const { feedbackToastVariant, showFeedbackToast } = useGuideFeedbackToast();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleFeedbackClick = async (feedback: GuideFeedbackTypes) => {
    try {
      await submitGuideFeedback(feedback);
      showFeedbackToast('success');
    } catch {
      showFeedbackToast('error');
    }
  };

  if (isLoading || isError || !guideDetailData) {
    return <GuideDetailStatus isError={isError} />;
  }

  return (
    <GuideDetailView
      feedbackToastVariant={feedbackToastVariant}
      guideDetail={getGuideDetailFromResponse(guideDetailData)}
      isFeedbackPending={isPending}
      onBackClick={handleBackClick}
      onFeedbackClick={handleFeedbackClick}
    />
  );
};

interface GuideDetailStatusPropTypes {
  isError: boolean;
}

const GuideDetailStatus = ({ isError }: GuideDetailStatusPropTypes) => (
  <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pt-20 text-gray-10">
    <p className="label text-center text-gray-7">
      {isError ? '가이드를 불러오지 못했어요.' : '가이드를 불러오는 중이에요.'}
    </p>
  </section>
);

export default GuideDetailContainer;
