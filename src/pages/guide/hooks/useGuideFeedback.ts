import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  GuideDetailResponseTypes,
  GuideFeedbackTypes,
} from '@/pages/guide/types/guideApiTypes';
import { getGuideDetailQueryKey } from '@/pages/guide/hooks/useGuideDetailQuery';
import { GUIDES_QUERY_KEY } from '@/pages/guide/hooks/useGuidesQuery';
import { registerGuideFeedback } from '@/pages/guide/utils/guideFeedbackUtils';

const useGuideFeedback = (guideId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedback: GuideFeedbackTypes) =>
      registerGuideFeedback(guideId, feedback),
    onSuccess: (_response, feedback) => {
      queryClient.setQueryData<GuideDetailResponseTypes>(
        getGuideDetailQueryKey(guideId),
        (previousGuideDetail) => {
          if (!previousGuideDetail) {
            return previousGuideDetail;
          }

          return {
            ...previousGuideDetail,
            data: {
              ...previousGuideDetail.data,
              feedbackStatus: feedback,
            },
          };
        },
      );

      void queryClient.invalidateQueries({ queryKey: GUIDES_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: getGuideDetailQueryKey(guideId),
      });
    },
  });
};

export default useGuideFeedback;
