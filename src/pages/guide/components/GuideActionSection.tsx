import type { GuideFeedbackTypes } from '../types/guideApiTypes';
import type { GuideActionTypes, GuideDetailTypes } from '../types/guideTypes';
import ActionTitleIcon from '../assets/illustrations/actionTitleIcon.svg?react';
import GuideFeedbackButtons from './GuideFeedbackButtons';
import GuideFeedbackToast from './GuideFeedbackToast';

interface GuideActionSectionPropTypes {
  feedbackStatus?: GuideFeedbackTypes | null;
  guideDetail: GuideDetailTypes;
  isFeedbackPending?: boolean;
  isFeedbackToastVisible?: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideActionSection = ({
  feedbackStatus = null,
  guideDetail,
  isFeedbackPending = false,
  isFeedbackToastVisible = false,
  onFeedbackClick,
}: GuideActionSectionPropTypes) => {
  const guideActions = getGuideActions(guideDetail);
  // 피드백은 패턴 기반(P) 가이드에만 허용된다. (GUIDE_FEEDBACK_NOT_ALLOWED)
  const isFeedbackAllowed = guideDetail.type === 'personal';

  if (guideActions.length === 0 && !isFeedbackAllowed) {
    return null;
  }

  return (
    <section className="mt-8 border-t border-beige-7 pt-7">
      {guideActions.length > 0 && (
        <>
          <h3 className="body-m-bold tracking-[-0.02rem] text-gray-8">
            이렇게 해보세요
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {guideActions.map((guideAction) => (
              <GuideActionCard
                key={guideAction.title}
                guideAction={guideAction}
              />
            ))}
          </div>
        </>
      )}

      {isFeedbackToastVisible && (
        <div className="mt-3">
          <GuideFeedbackToast />
        </div>
      )}

      {isFeedbackAllowed && (
        <GuideFeedbackButtons
          feedbackStatus={feedbackStatus}
          isFeedbackPending={isFeedbackPending}
          onFeedbackClick={onFeedbackClick}
        />
      )}
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

export default GuideActionSection;
