import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { GUIDE_DETAIL_QUERY_KEY } from '@/pages/guide/hooks/useGuideDetailQuery';
import type {
  GuideFeedbackStatusTypes,
  GuideFeedbackTypes,
} from '@/pages/guide/types/guideApiTypes';
import { registerGuideFeedback } from '@/pages/guide/utils/guideFeedbackUtils';

const useGuideFeedback = (
  guideId: number,
  initialFeedbackStatus: GuideFeedbackStatusTypes,
) => {
  const queryClient = useQueryClient();
  const [feedbackStatus, setFeedbackStatus] = useState(initialFeedbackStatus);
  const [isFeedbackPending, setIsFeedbackPending] = useState(false);
  const [isFeedbackError, setIsFeedbackError] = useState(false);

  // 토스트 노출 여부를 호출부가 판단할 수 있도록 성공 여부를 반환한다.
  const submitGuideFeedback = async (feedback: GuideFeedbackTypes) => {
    if (isFeedbackPending) {
      return false;
    }

    try {
      setIsFeedbackPending(true);
      setIsFeedbackError(false);

      await registerGuideFeedback(guideId, feedback);

      setFeedbackStatus(feedback);

      // 서버 피드백 상태가 바뀌었으므로 상세 캐시를 지워 재진입 시 옛 값이 남지 않게 한다.
      queryClient.invalidateQueries({
        queryKey: [GUIDE_DETAIL_QUERY_KEY, guideId],
      });

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
