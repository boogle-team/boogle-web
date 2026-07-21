import { api } from '@/shared/apis/axiosInstance';
import type {
  DeleteGuideFeedbackResponseTypes,
  GetGuideDetailRequestTypes,
  GetGuidesRequestTypes,
  GuideDetailResponseTypes,
  GuideFeedbackPathTypes,
  GuideFeedbackRequestTypes,
  GuidesResponseTypes,
  PatchGuideFeedbackResponseTypes,
  PostGuideFeedbackResponseTypes,
} from '../types/guideApiTypes';

export const getGuides = async ({
  includeFeedback = true,
  monthStartDate,
  weekStartDate,
}: GetGuidesRequestTypes = {}) => {
  const { data } = await api.get<GuidesResponseTypes>('/api/v1/guides', {
    params: {
      includeFeedback,
      monthStartDate,
      weekStartDate,
    },
  });

  return data;
};

export const getGuideDetail = async ({
  guideContentId,
  monthStartDate,
  ruleCode,
  weekStartDate,
}: GetGuideDetailRequestTypes) => {
  const { data } = await api.get<GuideDetailResponseTypes>(
    `/api/v1/guides/${guideContentId}`,
    {
      params: {
        monthStartDate,
        ruleCode,
        weekStartDate,
      },
    },
  );

  return data;
};

export const postGuideFeedback = async (
  { guideContentId }: GuideFeedbackPathTypes,
  requestBody: GuideFeedbackRequestTypes,
) => {
  const { data } = await api.post<PostGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideContentId}/feedback`,
    requestBody,
  );

  return data;
};

export const patchGuideFeedback = async (
  { guideContentId }: GuideFeedbackPathTypes,
  requestBody: GuideFeedbackRequestTypes,
) => {
  const { data } = await api.patch<PatchGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideContentId}/feedback`,
    requestBody,
  );

  return data;
};

export const deleteGuideFeedback = async ({
  guideContentId,
}: GuideFeedbackPathTypes) => {
  const { data } = await api.delete<DeleteGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideContentId}/feedback`,
  );

  return data;
};
