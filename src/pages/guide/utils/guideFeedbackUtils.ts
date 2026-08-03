import {
  patchGuideFeedback,
  postGuideFeedback,
} from '@/pages/guide/apis/guideApis';
import type { GuideFeedbackTypes } from '@/pages/guide/types/guideApiTypes';
import { getApiErrorCode } from '@/shared/utils/apiErrorUtils';

// 피드백은 주 단위로 관리돼 클라이언트 상태만으로는 등록/수정을 확정할 수 없다.
// 등록은 409, 수정은 404로 서로 대칭이라 응답 코드를 보고 반대쪽으로 재시도한다.
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

export const updateGuideFeedback = async (
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
