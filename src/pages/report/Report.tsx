import { useState } from 'react';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';
import { postReportPdf } from './apis/reportApis';
import InsufficientReportBody from './components/InsufficientReportBody';
import MonthlyReportBody from './components/MonthlyReportBody';
import { MonthlyTypePreview } from './components/MonthlyTypeCard';
import ReportModeTabs from './components/ReportModeTabs';
import ReportPeriodNavigator from './components/ReportPeriodNavigator';
import WeeklyReportBody from './components/WeeklyReportBody';
import { BASE_REPORT_DATE } from './constants/reportConstants';
import type { ReportModeTypes } from './types/reportTypes';
import {
  addDays,
  addMonths,
  getPeriodText,
  getReportDateRange,
} from './utils/reportPeriodUtils';

const Report = () => {
  const [currentPeriodDate, setCurrentPeriodDate] =
    useState<Date>(BASE_REPORT_DATE);
  const [selectedMode, setSelectedMode] = useState<ReportModeTypes>('weekly');
  const isWeeklyReport = selectedMode === 'weekly';
  const isMonthlyTypePreview =
    new URLSearchParams(window.location.search).get('preview') ===
    'monthly-types';
  const isInsufficientReportPreview =
    new URLSearchParams(window.location.search).get('preview') ===
    'insufficient';
  const periodText = getPeriodText(selectedMode, currentPeriodDate);

  const handleModeClick = (mode: ReportModeTypes) => {
    setSelectedMode(mode);
  };

  const handlePreviousPeriodClick = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, -7) : addMonths(previousDate, -1),
    );
  };

  const handleNextPeriodClick = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, 7) : addMonths(previousDate, 1),
    );
  };

  const handlePdfButtonClick = async () => {
    const { endDate, startDate } = getReportDateRange(
      selectedMode,
      currentPeriodDate,
    );
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
    URL.revokeObjectURL(pdfUrl);
  };

  if (isMonthlyTypePreview) {
    return <MonthlyTypePreview />;
  }

  return (
    <section className="-mb-[10rem] min-h-screen bg-beige-5 pb-[10rem] text-gray-10">
      <div className="bg-beige-5">
        <div className="h-10" />
        <DefaultTopNavigation
          title="리포트"
          isBackButtonVisible={false}
          isBorderVisible={false}
          className="bg-beige-5"
        />
      </div>

      <div className="border-t border-beige-7 bg-beige-5 px-layout pb-6 pt-3">
        <ReportModeTabs
          selectedMode={selectedMode}
          onModeClick={handleModeClick}
        />

        <ReportPeriodNavigator
          periodText={periodText}
          onNextClick={handleNextPeriodClick}
          onPreviousClick={handlePreviousPeriodClick}
        />

        {isInsufficientReportPreview ? (
          <InsufficientReportBody selectedMode={selectedMode} />
        ) : isWeeklyReport ? (
          <WeeklyReportBody />
        ) : (
          <MonthlyReportBody onPdfButtonClick={handlePdfButtonClick} />
        )}
      </div>
    </section>
  );
};

export default Report;
