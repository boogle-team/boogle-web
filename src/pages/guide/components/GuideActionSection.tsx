import ActionTitleIcon from '@/pages/guide/assets/illustrations/actionTitleIcon.svg?react';
import GuideFeedbackButtons from '@/pages/guide/components/GuideFeedbackButtons';
import GuideFeedbackToast from '@/pages/guide/components/GuideFeedbackToast';
import type {
  GuideFeedbackStatusTypes,
  GuideFeedbackTypes,
} from '@/pages/guide/types/guideApiTypes';
import type { GuideActionTypes } from '@/pages/guide/types/guideTypes';

interface GuideActionSectionPropTypes {
  actions: GuideActionTypes[];
  feedbackStatus?: GuideFeedbackStatusTypes;
  isFeedbackAllowed: boolean;
  isFeedbackPending?: boolean;
  isFeedbackToastVisible?: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideActionSection = ({
  actions,
  feedbackStatus = null,
  isFeedbackAllowed,
  isFeedbackPending = false,
  isFeedbackToastVisible = false,
  onFeedbackClick,
}: GuideActionSectionPropTypes) => {
  if (actions.length === 0 && !isFeedbackAllowed) {
    return null;
  }

  return (
    <section className="mt-8 border-t border-beige-7 pt-7">
      {actions.length > 0 && (
        <>
          <h3 className="body-m-bold tracking-[-0.02rem] text-gray-8">
            이렇게 해보세요
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {actions.map((guideAction) => (
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
    <h4 className="body-m-bold flex items-start gap-3 text-gray-10">
      <ActionTitleIcon aria-hidden="true" className="h-[1.5rem] w-4 shrink-0" />
      {guideAction.title}
    </h4>
    {guideAction.description && (
      <p className="caption mt-1 pl-6 text-gray-7">{guideAction.description}</p>
    )}
  </article>
);

export default GuideActionSection;
