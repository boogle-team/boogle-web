import { useEffect, useState } from 'react';

import Chip from '@/shared/components/Chip';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';

interface GuideFeedbackButtonsPropTypes {
  feedbackStatus: GuideFeedbackTypes | null;
  guideId: string;
  isFeedbackPending: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
  onFeedbackSubmit?: () => void;
}

const GuideFeedbackButtons = ({
  feedbackStatus,
  guideId,
  isFeedbackPending,
  onFeedbackClick,
  onFeedbackSubmit,
}: GuideFeedbackButtonsPropTypes) => {
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(
    Boolean(feedbackStatus),
  );

  useEffect(() => {
    setIsFeedbackSubmitted(Boolean(feedbackStatus));
  }, [feedbackStatus, guideId]);

  const handleFeedbackClick = (feedback: GuideFeedbackTypes) => {
    setIsFeedbackSubmitted(true);
    onFeedbackSubmit?.();
    onFeedbackClick?.(feedback);
  };

  const handleHelpfulChipClick = () => {
    handleFeedbackClick('G');
  };

  const handleAlreadyDoingChipClick = () => {
    handleFeedbackClick('A');
  };

  if (isFeedbackSubmitted) {
    return null;
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
