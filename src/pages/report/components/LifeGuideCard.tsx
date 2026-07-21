import Chip from '@/shared/components/Chip';
import type {
  LifeGuideTypes,
  ReportGuideFeedbackStatusTypes,
  ReportGuideFeedbackTypes,
} from '../types/reportTypes';

interface LifeGuideCardPropTypes {
  feedbackStatus?: ReportGuideFeedbackStatusTypes;
  isFeedbackPending?: boolean;
  lifeGuide: LifeGuideTypes;
  onFeedbackClick?: (feedback: ReportGuideFeedbackTypes) => void;
}

const LifeGuideCard = ({
  feedbackStatus,
  isFeedbackPending = false,
  lifeGuide,
  onFeedbackClick,
}: LifeGuideCardPropTypes) => {
  const selectedFeedbackStatus = feedbackStatus ?? lifeGuide.feedbackStatus;

  const handleHelpfulChipClick = () => {
    onFeedbackClick?.('G');
  };

  const handleAlreadyDoingChipClick = () => {
    onFeedbackClick?.('A');
  };

  return (
    <section className="rounded-xl border border-orange-4 bg-orange-1 px-4 py-4">
      <h2 className="body-m tracking-[-0.02rem] text-gray-9">생활 가이드</h2>
      <article className="mt-3">
        <h3 className="label-bold tracking-[-0.0175rem] text-semantic-danger">
          {lifeGuide.title}
        </h3>
        <p className="caption mt-1 tracking-[-0.015rem] text-gray-7">
          {lifeGuide.description}
        </p>
        <div className="mt-3 flex gap-2">
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
            isSelected={selectedFeedbackStatus === 'A'}
            disabled={isFeedbackPending}
            onClick={handleAlreadyDoingChipClick}
          />
        </div>
      </article>
    </section>
  );
};

export default LifeGuideCard;
