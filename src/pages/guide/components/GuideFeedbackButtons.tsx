import { useEffect, useState } from 'react';

import Chip from '@/shared/components/Chip';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';
import GuideFeedbackToast from './GuideFeedbackToast';

interface GuideFeedbackButtonsPropTypes {
  feedbackStatus: GuideFeedbackTypes | null;
  guideId: string;
  isFeedbackPending: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideFeedbackButtons = ({
  feedbackStatus,
  guideId,
  isFeedbackPending,
  onFeedbackClick,
}: GuideFeedbackButtonsPropTypes) => {
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(
    Boolean(feedbackStatus),
  );
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    setIsFeedbackSubmitted(Boolean(feedbackStatus));
    setIsToastVisible(false);
  }, [feedbackStatus, guideId]);

  useEffect(() => {
    if (!isToastVisible) return;

    const toastTimerId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);

    return () => window.clearTimeout(toastTimerId);
  }, [isToastVisible]);

  const handleFeedbackClick = (feedback: GuideFeedbackTypes) => {
    setIsFeedbackSubmitted(true);
    setIsToastVisible(true);
    onFeedbackClick?.(feedback);
  };

  const handleHelpfulChipClick = () => {
    handleFeedbackClick('G');
  };

  const handleAlreadyDoingChipClick = () => {
    handleFeedbackClick('A');
  };

  if (isFeedbackSubmitted) {
    return isToastVisible && <GuideFeedbackToast />;
  }

  return (
    <div className="mt-5 text-center">
      <p className="caption tracking-[-0.015rem] text-gray-7">
        이 가이드가 도움이 됐나요?
      </p>
      <div className="mt-3 flex justify-center gap-2">
        <Chip
          text="도움이 됐어요"
          size="compact"
          variant="orange"
          disabled={isFeedbackPending}
          onClick={handleHelpfulChipClick}
        />
        <Chip
          text="이미 해요"
          size="compact"
          isSelected={feedbackStatus === 'A'}
          disabled={isFeedbackPending}
          onClick={handleAlreadyDoingChipClick}
        />
      </div>
    </div>
  );
};

export default GuideFeedbackButtons;
