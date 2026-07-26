import FeelingComfortableIcon from '@/shared/assets/illustrations/record/feeling/feelingComfortable.svg?react';
import FeelingDifficultIcon from '@/shared/assets/illustrations/record/feeling/feelingDifficult.svg?react';
import FeelingNormalIcon from '@/shared/assets/illustrations/record/feeling/feelingNormal.svg?react';
import SeverityCard from '@/pages/record/shared/components/SeverityCard';

import { FEELING_OPTIONS } from '../constants/recordConstants';
import type { FeelingTypes } from '../types/recordTypes';

interface FeelingFieldPropTypes {
  value: FeelingTypes;
  onChange: (value: FeelingTypes) => void;
}

const FEELING_ICONS = {
  comfortable: FeelingComfortableIcon,
  normal: FeelingNormalIcon,
  difficult: FeelingDifficultIcon,
};

const FEELING_SEVERITY_OPTIONS = FEELING_OPTIONS.map((option) => ({
  ...option,
  Icon: FEELING_ICONS[option.value],
}));

const FeelingField = ({ value, onChange }: FeelingFieldPropTypes) => {
  return (
    <SeverityCard
      title="배변 느낌"
      options={FEELING_SEVERITY_OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
};

export default FeelingField;
