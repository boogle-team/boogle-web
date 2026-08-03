import Chip from '@/shared/components/Chip';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';

interface GuideFeedbackButtonsPropTypes {
  feedbackStatus: GuideFeedbackTypes | null;
  isFeedbackPending: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideFeedbackButtons = ({
  feedbackStatus,
  isFeedbackPending,
  onFeedbackClick,
}: GuideFeedbackButtonsPropTypes) => {
  const handleHelpfulChipClick = () => {
    onFeedbackClick?.('G');
  };

  const handleAlreadyDoingChipClick = () => {
    onFeedbackClick?.('A');
  };

  // 등록에 실패하면 feedbackStatus가 그대로여서 버튼이 다시 노출된다.
  if (feedbackStatus) {
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
          disabled={isFeedbackPending}
          onClick={handleAlreadyDoingChipClick}
        />
      </div>
    </div>
  );
};

export default GuideFeedbackButtons;
