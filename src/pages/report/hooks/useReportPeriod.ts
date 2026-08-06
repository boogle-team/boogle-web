import { useState } from 'react';

import type { ReportModeTypes } from '../types/reportTypes';
import {
  addDays,
  addMonths,
  getPeriodText,
  isCurrentOrFutureReportPeriod,
} from '../utils/reportPeriodUtils';

export const useReportPeriod = () => {
  const [selectedMode, setSelectedMode] = useState<ReportModeTypes>('weekly');
  const [periodDateByMode, setPeriodDateByMode] = useState<
    Record<ReportModeTypes, Date>
  >(() => {
    const currentDate = new Date();

    return {
      monthly: currentDate,
      weekly: currentDate,
    };
  });
  const currentPeriodDate = periodDateByMode[selectedMode];
  const isWeeklyReport = selectedMode === 'weekly';
  const isNextPeriodDisabled = isCurrentOrFutureReportPeriod(
    selectedMode,
    currentPeriodDate,
  );
  const periodText = getPeriodText(selectedMode, currentPeriodDate);

  const changeReportMode = (mode: ReportModeTypes) => {
    setSelectedMode(mode);
  };

  const moveToPreviousPeriod = () => {
    setPeriodDateByMode((previousPeriodDateByMode) => ({
      ...previousPeriodDateByMode,
      [selectedMode]: isWeeklyReport
        ? addDays(previousPeriodDateByMode[selectedMode], -7)
        : addMonths(previousPeriodDateByMode[selectedMode], -1),
    }));
  };

  const moveToNextPeriod = () => {
    if (isNextPeriodDisabled) return;

    setPeriodDateByMode((previousPeriodDateByMode) => ({
      ...previousPeriodDateByMode,
      [selectedMode]: isWeeklyReport
        ? addDays(previousPeriodDateByMode[selectedMode], 7)
        : addMonths(previousPeriodDateByMode[selectedMode], 1),
    }));
  };

  return {
    changeReportMode,
    currentPeriodDate,
    isWeeklyReport,
    isNextPeriodDisabled,
    moveToNextPeriod,
    moveToPreviousPeriod,
    periodText,
    selectedMode,
  };
};
