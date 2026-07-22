import { useState } from 'react';

import type { ReportModeTypes } from '../types/reportTypes';
import { addDays, addMonths, getPeriodText } from '../utils/reportPeriodUtils';

export const useReportPeriod = () => {
  const [currentPeriodDate, setCurrentPeriodDate] = useState(() => new Date());
  const [selectedMode, setSelectedMode] = useState<ReportModeTypes>('weekly');
  const isWeeklyReport = selectedMode === 'weekly';
  const periodText = getPeriodText(selectedMode, currentPeriodDate);

  const changeReportMode = (mode: ReportModeTypes) => {
    setSelectedMode(mode);
  };

  const moveToPreviousPeriod = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, -7) : addMonths(previousDate, -1),
    );
  };

  const moveToNextPeriod = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, 7) : addMonths(previousDate, 1),
    );
  };

  return {
    changeReportMode,
    currentPeriodDate,
    isWeeklyReport,
    moveToNextPeriod,
    moveToPreviousPeriod,
    periodText,
    selectedMode,
  };
};
