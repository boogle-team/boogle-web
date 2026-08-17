import { useEffect, useState } from 'react';

export type GuideFeedbackToastVariantTypes = 'error' | 'success';

const FEEDBACK_TOAST_DURATION = 2500;

const useGuideFeedbackToast = () => {
  const [feedbackToastVariant, setFeedbackToastVariant] =
    useState<GuideFeedbackToastVariantTypes | null>(null);

  useEffect(() => {
    if (!feedbackToastVariant) {
      return;
    }

    const toastTimerId = window.setTimeout(() => {
      setFeedbackToastVariant(null);
    }, FEEDBACK_TOAST_DURATION);

    return () => window.clearTimeout(toastTimerId);
  }, [feedbackToastVariant]);

  const showFeedbackToast = (toastVariant: GuideFeedbackToastVariantTypes) => {
    setFeedbackToastVariant(toastVariant);
  };

  return {
    feedbackToastVariant,
    showFeedbackToast,
  };
};

export default useGuideFeedbackToast;
