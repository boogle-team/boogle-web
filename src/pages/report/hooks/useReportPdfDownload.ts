import { useRef, useState } from 'react';

import { postReportPdf } from '../apis/reportApis';
import { getReportDateRange } from '../utils/reportPeriodUtils';

export const useReportPdfDownload = () => {
  const [pdfErrorMessage, setPdfErrorMessage] = useState('');
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const isDownloadingRef = useRef(false);

  const downloadReportPdf = async (currentPeriodDate: Date) => {
    if (isDownloadingRef.current) return;

    isDownloadingRef.current = true;

    const { startDate: monthStartDate } = getReportDateRange(
      'monthly',
      currentPeriodDate,
    );

    try {
      setPdfErrorMessage('');
      setIsPdfDownloading(true);

      const reportPdf = await postReportPdf({
        monthStartDate,
      });
      const pdfUrl = URL.createObjectURL(reportPdf);
      const downloadLink = document.createElement('a');

      downloadLink.href = pdfUrl;
      downloadLink.download = `boogle-report-${monthStartDate.slice(0, 7)}.pdf`;
      downloadLink.click();
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
    } catch {
      setPdfErrorMessage('PDF 저장에 실패했어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      isDownloadingRef.current = false;
      setIsPdfDownloading(false);
    }
  };

  return { downloadReportPdf, isPdfDownloading, pdfErrorMessage };
};
