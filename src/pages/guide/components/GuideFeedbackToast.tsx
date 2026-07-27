import FeedbackToastIcon from '../assets/illustrations/feedbackToastIcon.svg?react';

const GuideFeedbackToast = () => (
  <div
    className="flex w-full max-w-[22.375rem] flex-col items-start gap-2.5 rounded-xl bg-orange-1 px-4 py-3"
    role="status"
    aria-live="polite"
  >
    <div className="label-semi flex items-center gap-3 text-orange-6">
      <FeedbackToastIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span>소중한 의견 감사합니다.</span>
    </div>
  </div>
);

export default GuideFeedbackToast;
