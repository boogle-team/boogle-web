import { api } from '@/shared/apis/axiosInstance';
import type {
  GetMonthlyReportRequestTypes,
  GetWeeklyReportRequestTypes,
  MonthlyReportResponseTypes,
  PostReportPdfRequestTypes,
  ReportPdfResponseTypes,
  WeeklyReportResponseTypes,
} from '../types/reportApiTypes';

export const getWeeklyReport = async ({
  includeGuide = true,
  weekStartDate,
}: GetWeeklyReportRequestTypes = {}) => {
  const { data } = await api.get<WeeklyReportResponseTypes>(
    '/api/v1/reports/weekly',
    {
      params: {
        includeGuide,
        weekStartDate,
      },
    },
  );

  return data;
};

export const getMonthlyReport = async ({
  includePattern = true,
  monthStartDate,
}: GetMonthlyReportRequestTypes = {}) => {
  const { data } = await api.get<MonthlyReportResponseTypes>(
    '/api/v1/reports/monthly',
    {
      params: {
        includePattern,
        monthStartDate,
      },
    },
  );

  return data;
};

export const postReportPdf = async (requestBody: PostReportPdfRequestTypes) => {
  const { data } = await api.post<ReportPdfResponseTypes>(
    '/api/v1/reports/pdf',
    requestBody,
    {
      headers: {
        Accept: 'application/pdf',
      },
      responseType: 'blob',
    },
  );

  return data;
};
