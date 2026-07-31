import { useState } from 'react';

import {
  patchGuideFeedback,
  postGuideFeedback,
} from '@/pages/guide/apis/guideApis';
import type {
  LifeGuideTypes,
  ReportGuideFeedbackStatusTypes,
  ReportGuideFeedbackTypes,
} from '../types/reportTypes';

export const useReportGuideFeedback = (lifeGuide: LifeGuideTypes) => {
  const [feedbackStatus, setFeedbackStatus] =
    useState<ReportGuideFeedbackStatusTypes>(lifeGuide.feedbackStatus ?? null);
  const [isFeedbackPending, setIsFeedbackPending] = useState(false);

  const submitGuideFeedback = async (feedback: ReportGuideFeedbackTypes) => {
    if (isFeedbackPending) {
      return;
    }

    try {
      setIsFeedbackPending(true);

      if (feedbackStatus === 'A' || feedbackStatus === 'G') {
        await patchGuideFeedback(
          { guideId: lifeGuide.guideContentId },
          { feedback },
        );
      } else {
        await postGuideFeedback(
          { guideId: lifeGuide.guideContentId },
          { feedback },
        );
      }

      setFeedbackStatus(feedback);
    } finally {
      setIsFeedbackPending(false);
    }
  };

  return {
    feedbackStatus,
    isFeedbackPending,
    submitGuideFeedback,
  };
};
