import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import InsufficientReportBody from './components/InsufficientReportBody';
import MonthlyReportBody from './components/MonthlyReportBody';
import ReportModeTabs from './components/ReportModeTabs';
import ReportPeriodNavigator from './components/ReportPeriodNavigator';
import WeeklyReportBody from './components/WeeklyReportBody';
import useMonthlyReportQuery from './hooks/useMonthlyReportQuery';
import { useReportPdfDownload } from './hooks/useReportPdfDownload';
import { useReportPeriod } from './hooks/useReportPeriod';
import useWeeklyReportQuery from './hooks/useWeeklyReportQuery';
import type { ReportModeTypes } from './types/reportTypes';
import {
  mapMonthlyInsufficientReport,
  mapMonthlyReportViewData,
} from './utils/monthlyReportViewDataMapper';
import { getReportDateRange } from './utils/reportPeriodUtils';
import {
  mapWeeklyInsufficientReport,
  mapWeeklyReportViewData,
} from './utils/weeklyReportViewDataMapper';

interface ReportStatusBodyPropTypes {
  isError?: boolean;
  message: string;
  onRetry?: () => void;
}

const ReportStatusBody = ({
  isError = false,
  message,
  onRetry,
}: ReportStatusBodyPropTypes) => (
  <div
    role={isError ? 'alert' : 'status'}
    className="flex min-h-[24rem] flex-col items-center justify-center gap-4 text-center"
  >
    <p className="body-m text-gray-7">{message}</p>
    {onRetry && (
      <button
        type="button"
        className="label-bold rounded-full border border-orange-6 px-5 py-2 text-orange-6"
        onClick={onRetry}
      >
        다시 시도
      </button>
    )}
  </div>
);

const Report = () => {
  const {
    changeReportMode,
    currentPeriodDate,
    isNextPeriodDisabled,
    isWeeklyReport,
    moveToNextPeriod,
    moveToPreviousPeriod,
    periodText,
    selectedMode,
  } = useReportPeriod();
  const { startDate: reportStartDate } = getReportDateRange(
    selectedMode,
    currentPeriodDate,
  );

  const {
    weeklyReport,
    isError: isWeeklyReportError,
    isLoading: isWeeklyReportLoading,
    refetch: refetchWeeklyReport,
  } = useWeeklyReportQuery(isWeeklyReport ? reportStartDate : '');
  const {
    monthlyReport,
    isError: isMonthlyReportError,
    isLoading: isMonthlyReportLoading,
    refetch: refetchMonthlyReport,
  } = useMonthlyReportQuery(isWeeklyReport ? '' : reportStartDate);

  const { downloadReportPdf, isPdfDownloading, pdfErrorMessage } =
    useReportPdfDownload();
  const weeklyReportViewData = weeklyReport
    ? mapWeeklyReportViewData(weeklyReport)
    : null;
  const monthlyReportViewData = monthlyReport
    ? mapMonthlyReportViewData(monthlyReport)
    : null;
  const isSelectedReportLoading = isWeeklyReport
    ? isWeeklyReportLoading
    : isMonthlyReportLoading;
  const loadingMessage = isPdfDownloading
    ? '월간 리포트 PDF를 저장하는 중입니다.'
    : isWeeklyReport
      ? '주간 리포트를 불러오는 중입니다.'
      : '월간 리포트를 불러오는 중입니다.';

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
    void downloadReportPdf(currentPeriodDate);
  };

  const handleWeeklyReportRetry = () => {
    void refetchWeeklyReport();
  };

  const handleMonthlyReportRetry = () => {
    void refetchMonthlyReport();
  };

  const renderWeeklyReport = () => {
    if (isWeeklyReportLoading) {
      return null;
    }

    if (isWeeklyReportError) {
      return (
        <ReportStatusBody
          isError
          message="주간 리포트를 불러오지 못했어요."
          onRetry={handleWeeklyReportRetry}
        />
      );
    }

    if (!weeklyReport) {
      return (
        <ReportStatusBody message="주간 리포트가 아직 준비되지 않았어요." />
      );
    }

    if (weeklyReport.dataStatus === 'INSUFFICIENT') {
      return (
        <InsufficientReportBody
          insufficientReport={mapWeeklyInsufficientReport(weeklyReport)}
          selectedMode="weekly"
        />
      );
    }

    if (!weeklyReportViewData) {
      return (
        <ReportStatusBody
          isError
          message="주간 리포트를 표시하지 못했어요."
          onRetry={handleWeeklyReportRetry}
        />
      );
    }

    return <WeeklyReportBody {...weeklyReportViewData} />;
  };

  const renderMonthlyReport = () => {
    if (isMonthlyReportLoading) {
      return null;
    }

    if (isMonthlyReportError) {
      return (
        <ReportStatusBody
          isError
          message="월간 리포트를 불러오지 못했어요."
          onRetry={handleMonthlyReportRetry}
        />
      );
    }

    if (!monthlyReport) {
      return (
        <ReportStatusBody message="월간 리포트가 아직 준비되지 않았어요." />
      );
    }

    if (monthlyReport.dataStatus === 'INSUFFICIENT') {
      return (
        <InsufficientReportBody
          insufficientReport={mapMonthlyInsufficientReport(monthlyReport)}
          selectedMode="monthly"
        />
      );
    }

    if (!monthlyReportViewData) {
      return (
        <ReportStatusBody
          isError
          message="월간 리포트를 표시하지 못했어요."
          onRetry={handleMonthlyReportRetry}
        />
      );
    }

    return (
      <MonthlyReportBody
        {...monthlyReportViewData}
        isPdfDownloading={isPdfDownloading}
        pdfErrorMessage={pdfErrorMessage}
        onPdfButtonClick={handlePdfButtonClick}
      />
    );
  };

  return (
    <section className="-mb-[var(--bottom-navigation-page-space)] min-h-screen bg-beige-5 pb-[var(--bottom-navigation-page-space)] text-gray-10">
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
          isNextDisabled={isNextPeriodDisabled}
          periodText={periodText}
          onNextClick={handleNextPeriodClick}
          onPreviousClick={handlePreviousPeriodClick}
        />

        {isWeeklyReport ? renderWeeklyReport() : renderMonthlyReport()}
      </div>
      {(isSelectedReportLoading || isPdfDownloading) && (
        <LoadingSpinner hasBackdrop message={loadingMessage} />
      )}
    </section>
  );
};

export default Report;
