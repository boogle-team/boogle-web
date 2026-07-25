import Chip from '@/shared/components/Chip';
import type { GuideFeedbackTypes } from '../types/guideApiTypes';
import type { GuideActionTypes, GuideDetailTypes } from '../types/guideTypes';
import ActionTitleIcon from '../assets/illustrations/ActionTitleIcon.svg?react';

interface GuideActionSectionPropTypes {
  feedbackStatus?: GuideFeedbackTypes | null;
  guideDetail: GuideDetailTypes;
  isFeedbackPending?: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideActionSection = ({
  feedbackStatus = null,
  guideDetail,
  isFeedbackPending = false,
  onFeedbackClick,
}: GuideActionSectionPropTypes) => {
  const guideActions = getGuideActions(guideDetail);

  if (guideActions.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 border-t border-beige-7 pt-7">
      <h3 className="body-m-bold tracking-[-0.02rem] text-gray-8">
        이렇게 해보세요
      </h3>
      <div className="mt-2 flex flex-col gap-2">
        {guideActions.map((guideAction) => (
          <GuideActionCard key={guideAction.title} guideAction={guideAction} />
        ))}
      </div>

      <GuideFeedbackButtons
        feedbackStatus={feedbackStatus}
        isFeedbackPending={isFeedbackPending}
        onFeedbackClick={onFeedbackClick}
      />
    </section>
  );
};

interface GuideActionCardPropTypes {
  guideAction: GuideActionTypes;
}

const GuideActionCard = ({ guideAction }: GuideActionCardPropTypes) => (
  <article className="rounded-lg bg-beige-1 p-4 shadow-sm">
    <h4 className="body-m-bold flex items-center gap-2 text-gray-10">
      <ActionTitleIcon
        aria-hidden="true"
        className="h-[1.125rem] w-4 shrink-0"
      />
      {guideAction.title}
    </h4>
    {guideAction.description && (
      <p className="label mt-2 pl-6 text-gray-7">{guideAction.description}</p>
    )}
  </article>
);

const getGuideActions = (guideDetail: GuideDetailTypes): GuideActionTypes[] => {
  if (guideDetail.actions) {
    return guideDetail.actions;
  }

  if (!guideDetail.actionTitle) {
    return [];
  }

  return [
    {
      description: guideDetail.actionDescription,
      source: guideDetail.actionSource,
      title: guideDetail.actionTitle,
    },
  ];
};

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

export default GuideActionSection;
