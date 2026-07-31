import { useState } from 'react';

import {
  patchGuideFeedback,
  postGuideFeedback,
} from '@/pages/guide/apis/guideApis';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';
import { getApiErrorCode } from '@/shared/utils/apiErrorUtils';
import type {
  LifeGuideTypes,
  ReportGuideFeedbackStatusTypes,
  ReportGuideFeedbackTypes,
} from '../types/reportTypes';

// 서버가 피드백 상태를 내려주지 않아 로컬 상태만으로는 등록/수정을 확정할 수 없다.
// 등록은 409, 수정은 404로 서로 대칭이라 응답 코드를 보고 반대쪽으로 재시도한다.
const registerGuideFeedback = async (
  guideId: number,
  feedback: GuideFeedbackTypes,
) => {
  try {
    await postGuideFeedback({ guideId }, { feedback });
  } catch (error) {
    if (getApiErrorCode(error) !== 'GUIDE_FEEDBACK_ALREADY_EXISTS') {
      throw error;
    }

    await patchGuideFeedback({ guideId }, { feedback });
  }
};

const updateGuideFeedback = async (
  guideId: number,
  feedback: GuideFeedbackTypes,
) => {
  try {
    await patchGuideFeedback({ guideId }, { feedback });
  } catch (error) {
    if (getApiErrorCode(error) !== 'GUIDE_FEEDBACK_NOT_FOUND') {
      throw error;
    }

    await postGuideFeedback({ guideId }, { feedback });
  }
};

export const useReportGuideFeedback = (lifeGuide: LifeGuideTypes) => {
  const [feedbackStatus, setFeedbackStatus] =
    useState<ReportGuideFeedbackStatusTypes>(lifeGuide.feedbackStatus ?? null);
  const [isFeedbackPending, setIsFeedbackPending] = useState(false);
  const [isFeedbackError, setIsFeedbackError] = useState(false);

  const submitGuideFeedback = async (feedback: ReportGuideFeedbackTypes) => {
    if (isFeedbackPending) {
      return;
    }

    const { guideContentId } = lifeGuide;
    const hasFeedback = feedbackStatus !== null;

    try {
      setIsFeedbackPending(true);
      setIsFeedbackError(false);

      if (hasFeedback) {
        await updateGuideFeedback(guideContentId, feedback);
      } else {
        await registerGuideFeedback(guideContentId, feedback);
      }

      setFeedbackStatus(feedback);
    } catch {
      setIsFeedbackError(true);
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
