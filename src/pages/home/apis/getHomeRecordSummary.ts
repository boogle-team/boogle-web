import { api } from '@/shared/apis/axiosInstance';
import type {
  HomeRecordSummaryParamTypes,
  HomeRecordSummaryResponseTypes,
} from '@/pages/home/types/homeRecordSummaryTypes';

export const getHomeRecordSummary = async ({
  baseDate,
  range,
}: HomeRecordSummaryParamTypes) => {
  const { data } = await api.get<HomeRecordSummaryResponseTypes>(
    '/api/v1/home/summary',
    { params: { baseDate, range } },
  );

  return data.data;
};
