import Chip from '@/shared/components/Chip';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';

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

  // 피드백은 주 1회만 받으므로 이번 주 응답이 있으면 칩을 감춘다.
  // 다음 주에는 서버 feedbackStatus가 비워져 다시 노출되고, 등록에 실패하면 그대로 남는다.
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
