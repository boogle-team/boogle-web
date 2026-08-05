import { TriangleAlert } from 'lucide-react';

import FeedbackToastIcon from '../assets/illustrations/feedbackToast/feedbackToastIcon.svg?react';

type GuideFeedbackToastVariantTypes = 'error' | 'success';

interface GuideFeedbackToastPropTypes {
  variant?: GuideFeedbackToastVariantTypes;
}

const GuideFeedbackToast = ({
  variant = 'success',
}: GuideFeedbackToastPropTypes) => {
  const isError = variant === 'error';

  return (
    <div
      className={`flex w-full flex-col items-start gap-2.5 rounded-xl px-4 py-3 ${
        isError ? 'bg-semantic-danger' : 'bg-orange-1'
      }`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`label-semi flex items-center gap-3 ${
          isError ? 'text-beige-1' : 'text-orange-6'
        }`}
      >
        {isError ? (
          <TriangleAlert aria-hidden="true" className="h-5 w-5 shrink-0" />
        ) : (
          <FeedbackToastIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
        )}
        <span>
          {isError ? '잠시 후 다시 시도해 주세요.' : '소중한 의견 감사합니다.'}
        </span>
      </div>
    </div>
  );
};

export default GuideFeedbackToast;
