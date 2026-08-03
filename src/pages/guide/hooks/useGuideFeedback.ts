import { useState } from 'react';

import type {
  GuideFeedbackStatusTypes,
  GuideFeedbackTypes,
} from '@/pages/guide/types/guideApiTypes';
import {
  registerGuideFeedback,
  updateGuideFeedback,
} from '@/pages/guide/utils/guideFeedbackUtils';

const useGuideFeedback = (
  guideId: number,
  initialFeedbackStatus: GuideFeedbackStatusTypes,
) => {
  const [feedbackStatus, setFeedbackStatus] = useState(initialFeedbackStatus);
  const [isFeedbackPending, setIsFeedbackPending] = useState(false);
  const [isFeedbackError, setIsFeedbackError] = useState(false);

  // 토스트 노출 여부를 호출부가 판단할 수 있도록 성공 여부를 반환한다.
  const submitGuideFeedback = async (feedback: GuideFeedbackTypes) => {
    if (isFeedbackPending) {
      return false;
    }

    const hasFeedback = feedbackStatus !== null;

    try {
      setIsFeedbackPending(true);
      setIsFeedbackError(false);

      if (hasFeedback) {
        await updateGuideFeedback(guideId, feedback);
      } else {
        await registerGuideFeedback(guideId, feedback);
      }

      setFeedbackStatus(feedback);

      return true;
    } catch {
      setIsFeedbackError(true);

      return false;
    } finally {
      setIsFeedbackPending(false);
    }
  };

  return {
    feedbackStatus,
    isFeedbackError,
    isFeedbackPending,
    submitGuideFeedback,
  };
};

export default useGuideFeedback;
