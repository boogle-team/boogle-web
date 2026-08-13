import { createElement } from 'react';

import { getGuideIcon } from '@/pages/guide/constants/guideIcons';
import PatternCheckIcon from '@/pages/report/assets/icons/PatternCheckIcon';
import PatternDangerIcon from '@/pages/report/assets/icons/PatternDangerIcon';
import PatternWarningIcon from '@/pages/report/assets/icons/PatternWarningIcon';
import MonthlyConditionImprovementIcon from '@/pages/report/assets/illustrations/monthlyConditionImprovementIcon.svg?react';
import MonthlyHardStoolPatternIcon from '@/pages/report/assets/illustrations/monthlyHardStoolPatternIcon.svg?react';
import MonthlySleepPatternIcon from '@/pages/report/assets/illustrations/monthlySleepPatternIcon.svg?react';
import MonthlyStressPatternIcon from '@/pages/report/assets/illustrations/monthlyStressPatternIcon.svg?react';
import MonthlyWaterPatternIcon from '@/pages/report/assets/illustrations/monthlyWaterPatternIcon.svg?react';
import type { PatternCardItemTypes } from '@/pages/report/types/reportTypes';

interface PatternCardIconPropTypes {
  item: PatternCardItemTypes;
}

const PatternCardIcon = ({ item }: PatternCardIconPropTypes) => {
  const { icon } = item;

  if (icon === 'check') {
    return <PatternCheckIcon aria-hidden="true" className="h-10 w-10" />;
  }
  if (icon === 'warning') {
    return <PatternWarningIcon aria-hidden="true" className="h-10 w-10" />;
  }
  if (icon === 'danger') {
    return <PatternDangerIcon aria-hidden="true" className="h-10 w-10" />;
  }
  if (icon === 'droplet') {
    return <MonthlyWaterPatternIcon aria-hidden="true" className="h-10 w-10" />;
  }
  if (icon === 'frown') {
    return (
      <MonthlyStressPatternIcon aria-hidden="true" className="h-10 w-10" />
    );
  }
  if (icon === 'moon') {
    return <MonthlySleepPatternIcon aria-hidden="true" className="h-10 w-10" />;
  }
  if (icon === 'package') {
    return (
      <MonthlyHardStoolPatternIcon aria-hidden="true" className="h-10 w-10" />
    );
  }
  if (icon === 'chart') {
    return (
      <MonthlyConditionImprovementIcon
        aria-hidden="true"
        className="h-10 w-10"
      />
    );
  }

  if (icon === 'guide') {
    const guideIcon = getGuideIcon(item.guideId);

    return guideIcon
      ? createElement(guideIcon, {
          'aria-hidden': true,
          className: 'h-10 w-10',
        })
      : null;
  }

  return null;
};

export default PatternCardIcon;
