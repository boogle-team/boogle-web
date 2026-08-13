import { api } from '@/shared/apis/axiosInstance';
import type {
  DeleteGuideFeedbackResponseTypes,
  GetGuideDetailRequestTypes,
  GuideDetailResponseTypes,
  GuideFeedbackPathTypes,
  GuideFeedbackRequestTypes,
  GuidesResponseTypes,
  PatchGuideFeedbackResponseTypes,
  PostGuideFeedbackResponseTypes,
} from '@/pages/guide/types/guideApiTypes';

export const getGuides = async () => {
  const { data } = await api.get<GuidesResponseTypes>('/api/v1/guides');

  return data;
};

export const getGuideDetail = async ({
  guideId,
}: GetGuideDetailRequestTypes) => {
  const { data } = await api.get<GuideDetailResponseTypes>(
    `/api/v1/guides/${guideId}`,
  );

  return data;
};

export const postGuideFeedback = async (
  { guideId }: GuideFeedbackPathTypes,
  requestBody: GuideFeedbackRequestTypes,
) => {
  const { data } = await api.post<PostGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideId}/feedback`,
    requestBody,
  );

  return data;
};

export const patchGuideFeedback = async (
  { guideId }: GuideFeedbackPathTypes,
  requestBody: GuideFeedbackRequestTypes,
) => {
  const { data } = await api.patch<PatchGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideId}/feedback`,
    requestBody,
  );

  return data;
};

export const deleteGuideFeedback = async ({
  guideId,
}: GuideFeedbackPathTypes) => {
  const { data } = await api.delete<DeleteGuideFeedbackResponseTypes>(
    `/api/v1/guides/${guideId}/feedback`,
  );

  return data;
};
