import { useSearchParams } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import InsufficientReportBody from './components/InsufficientReportBody';
import MonthlyReportBody from './components/MonthlyReportBody';
import { MonthlyTypePreview } from './components/MonthlyTypeCard';
import ReportModeTabs from './components/ReportModeTabs';
import ReportPeriodNavigator from './components/ReportPeriodNavigator';
import WeeklyReportBody from './components/WeeklyReportBody';
import { useReportGuideFeedback } from './hooks/useReportGuideFeedback';
import { useReportPdfDownload } from './hooks/useReportPdfDownload';
import { useReportPeriod } from './hooks/useReportPeriod';
import { useReportViewData } from './hooks/useReportViewData';
import type {
  ReportGuideFeedbackTypes,
  ReportModeTypes,
} from './types/reportTypes';

const Report = () => {
  const [searchParams] = useSearchParams();
  const {
    changeReportMode,
    currentPeriodDate,
    isWeeklyReport,
    moveToNextPeriod,
    moveToPreviousPeriod,
    periodText,
    selectedMode,
  } = useReportPeriod();
  const { downloadReportPdf, pdfErrorMessage } = useReportPdfDownload();
  const { insufficientReport, monthlyReportViewData, weeklyReportViewData } =
    useReportViewData(selectedMode);
  const {
    feedbackStatus: lifeGuideFeedbackStatus,
    isFeedbackPending: isLifeGuideFeedbackPending,
    submitGuideFeedback,
  } = useReportGuideFeedback(weeklyReportViewData.lifeGuide);
  const isMonthlyTypePreview = searchParams.get('preview') === 'monthly-types';
  const isInsufficientReportPreview =
    searchParams.get('preview') === 'insufficient';

  const handleModeClick = (mode: ReportModeTypes) => {
    changeReportMode(mode);
  };

  const handlePreviousPeriodClick = () => {
    moveToPreviousPeriod();
  };

  const handleNextPeriodClick = () => {
    moveToNextPeriod();
  };

  const handlePdfButtonClick = () => {
    void downloadReportPdf(selectedMode, currentPeriodDate);
  };

  const handleLifeGuideFeedbackClick = (feedback: ReportGuideFeedbackTypes) => {
    void submitGuideFeedback(feedback);
  };

  if (isMonthlyTypePreview) {
    return (
      <MonthlyTypePreview monthlyTypes={monthlyReportViewData.monthlyTypes} />
    );
  }

  return (
    <section className="-mb-[10rem] min-h-screen bg-beige-5 pb-[10rem] pt-[3.06rem] text-gray-10">
      <div className="bg-beige-5">
        <TopNavigation
          title="리포트"
          isBackButtonVisible={false}
          isBorderVisible={false}
          className="bg-beige-5"
        />
      </div>

      <div className="bg-beige-5 px-layout pb-6 pt-3">
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
          <InsufficientReportBody
            insufficientReport={insufficientReport}
            selectedMode={selectedMode}
          />
        ) : isWeeklyReport ? (
          <WeeklyReportBody
            {...weeklyReportViewData}
            lifeGuideFeedbackStatus={lifeGuideFeedbackStatus}
            isLifeGuideFeedbackPending={isLifeGuideFeedbackPending}
            onLifeGuideFeedbackClick={handleLifeGuideFeedbackClick}
          />
        ) : (
          <MonthlyReportBody
            {...monthlyReportViewData}
            pdfErrorMessage={pdfErrorMessage}
            onPdfButtonClick={handlePdfButtonClick}
          />
        )}
      </div>
    </section>
  );
};

export default Report;
