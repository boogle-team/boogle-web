import { useState } from 'react';

import { postReportPdf } from '../apis/reportApis';
import type { ReportModeTypes } from '../types/reportTypes';
import { getReportDateRange } from '../utils/reportPeriodUtils';

export const useReportPdfDownload = () => {
  const [pdfErrorMessage, setPdfErrorMessage] = useState('');

  const downloadReportPdf = async (
    selectedMode: ReportModeTypes,
    currentPeriodDate: Date,
  ) => {
    const { endDate, startDate } = getReportDateRange(
      selectedMode,
      currentPeriodDate,
    );

    try {
      setPdfErrorMessage('');

      const reportPdf = await postReportPdf({
        endDate,
        includeDailyRecords: true,
        startDate,
      });
      const pdfUrl = URL.createObjectURL(reportPdf);
      const downloadLink = document.createElement('a');

      downloadLink.href = pdfUrl;
      downloadLink.download = `boogle-report-${startDate}-${endDate}.pdf`;
      downloadLink.click();
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
    } catch {
      setPdfErrorMessage('PDF 저장에 실패했어요. 잠시 후 다시 시도해 주세요.');
    }
  };

  return { downloadReportPdf, pdfErrorMessage };
};
