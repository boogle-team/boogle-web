import type { GuideActionTypes, GuideDetailTypes } from '../types/guideTypes';

interface GuideActionSectionPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideActionSection = ({ guideDetail }: GuideActionSectionPropTypes) => {
  const guideActions = getGuideActions(guideDetail);

  if (guideActions.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 border-t border-beige-7 pt-7">
      <h3 className="caption-bold text-gray-8">이렇게 해보세요</h3>
      <div className="mt-2 flex flex-col gap-2">
        {guideActions.map((guideAction) => (
          <GuideActionCard key={guideAction.title} guideAction={guideAction} />
        ))}
      </div>

      <GuideFeedbackButtons />
    </section>
  );
};

const GuideActionCard = ({
  guideAction,
}: {
  guideAction: GuideActionTypes;
}) => (
  <article className="rounded-lg bg-beige-1 p-4 shadow-sm">
    <h4 className="body-m-bold flex items-center gap-2 text-gray-10">
      <ActionTitleIcon />
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

const GuideFeedbackButtons = () => (
  <div className="mt-6 text-center">
    <p className="caption tracking-[-0.015rem] text-gray-7">
      이 가이드가 도움이 됐나요?
    </p>
    <div className="mt-3 flex justify-center gap-2">
      <button
        type="button"
        className="caption-bold rounded-full bg-orange-6 px-5 py-2 text-beige-1"
      >
        도움이 됐어요
      </button>
      <button
        type="button"
        className="caption-bold rounded-full bg-beige-1 px-5 py-2 text-gray-7"
      >
        이미 해요
      </button>
    </div>
  </div>
);

const ActionTitleIcon = () => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M5.89498 0C5.42843 0 5.05284 0.3345 5.05284 0.75V1.5H8.4214V0.75C8.4214 0.3345 8.0458 0 7.57926 0H5.89498ZM0.84214 3C0.61879 3 0.404589 3.07902 0.246657 3.21967C0.0887253 3.36032 0 3.55109 0 3.75V6.75C0 6.94891 0.0887253 7.13968 0.246657 7.28033C0.404589 7.42098 0.61879 7.5 0.84214 7.5H12.6321C12.7982 7.49989 12.9605 7.45605 13.0986 7.374L15.6251 5.874C15.7404 5.80551 15.835 5.71272 15.9004 5.60386C15.9658 5.49501 16 5.37346 16 5.25C16 5.12654 15.9658 5.00499 15.9004 4.89614C15.835 4.78728 15.7404 4.69449 15.6251 4.626L13.0986 3.126C12.9605 3.04395 12.7982 3.00011 12.6321 3H0.84214ZM5.05284 9V17.25C5.05284 17.6655 5.42843 18 5.89498 18H7.57926C8.0458 18 8.4214 17.6655 8.4214 17.25V9H5.05284Z"
      fill="#FF8C61"
    />
  </svg>
);

export default GuideActionSection;
