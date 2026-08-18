import ActionTitleIcon from '@/pages/guide/assets/illustrations/actionTitleIcon.svg?react';
import InfoNoticeIcon from '@/pages/guide/assets/illustrations/noticeIcon/infoNoticeIcon.svg?react';
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
  isInfoGuide: boolean;
  onFeedbackClick?: (feedback: GuideFeedbackTypes) => void;
}

const GuideActionSection = ({
  actions,
  feedbackStatus = null,
  isFeedbackAllowed,
  isFeedbackPending = false,
  isFeedbackToastVisible = false,
  isInfoGuide,
  onFeedbackClick,
}: GuideActionSectionPropTypes) => {
  if (actions.length === 0 && !isFeedbackAllowed) {
    return null;
  }

  return (
    <section className="mt-8 border-t border-beige-7 pt-7">
      {actions.length > 0 && (
        <>
          {!isInfoGuide && (
            <h3 className="body-m-bold tracking-[-0.02rem] text-gray-8">
              이렇게 해보세요
            </h3>
          )}
          <div className={`${isInfoGuide ? '' : 'mt-2'} flex flex-col gap-2`}>
            {actions.map((guideAction) => (
              <GuideActionCard
                key={guideAction.title}
                guideAction={guideAction}
                variant={isInfoGuide ? 'notice' : 'default'}
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
  variant: 'default' | 'notice';
}

const GuideActionCard = ({
  guideAction,
  variant,
}: GuideActionCardPropTypes) => {
  const isNotice = variant === 'notice';

  return (
    <article
      className={
        isNotice
          ? 'rounded-lg border border-orange-2 bg-orange-1 px-4 py-3'
          : 'rounded-lg bg-beige-1 p-4 shadow-sm'
      }
    >
      <h4
        className={`${isNotice ? 'label-semi items-start text-orange-6' : 'body-m-bold items-start text-gray-10'} flex gap-3`}
      >
        {isNotice ? (
          <InfoNoticeIcon
            aria-hidden="true"
            className="h-[1.375rem] w-[1.375rem] shrink-0"
          />
        ) : (
          <ActionTitleIcon
            aria-hidden="true"
            className="h-[1.5rem] w-4 shrink-0"
          />
        )}
        {guideAction.title}
      </h4>
      {guideAction.description && (
        <p
          className={`${isNotice ? 'label mt-2 pl-[2.125rem] text-orange-6' : 'caption mt-1 pl-7 text-gray-7'}`}
        >
          {guideAction.description}
        </p>
      )}
    </article>
  );
};

export default GuideActionSection;
