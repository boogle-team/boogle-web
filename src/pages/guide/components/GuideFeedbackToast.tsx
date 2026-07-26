import FeedbackToast from '../assets/illustrations/feedbackToast.svg?react';

const GuideFeedbackToast = () => (
  <div
    className="fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-[22.375rem] -translate-x-1/2"
    style={{ bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
    role="status"
    aria-live="polite"
  >
    <FeedbackToast aria-hidden="true" className="h-auto w-full" />
    <span className="sr-only">소중한 의견 감사합니다.</span>
  </div>
);

export default GuideFeedbackToast;
