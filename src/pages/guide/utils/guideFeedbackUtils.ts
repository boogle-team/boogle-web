import {
  patchGuideFeedback,
  postGuideFeedback,
} from '@/pages/guide/apis/guideApis';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';
import { getApiErrorCode } from '@/shared/utils/apiErrorUtils';

// 피드백은 주 단위로 한 번만 받으므로 UI는 이번 주 응답 전에만 칩을 노출한다.
// 다만 캐시가 오래됐거나 다른 기기에서 이미 등록했으면 409가 돌아오므로 수정으로 이어 붙인다.
export const registerGuideFeedback = async (
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
