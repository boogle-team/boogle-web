import RecordTooltipContent from '@/pages/record/shared/components/RecordTooltipContent';
import SeverityCard from '@/pages/record/shared/components/SeverityCard';

import {
  BLOATING_OPTIONS,
  BLOATING_TOOLTIP,
  SEVERITY_ICON_CLASS_NAME,
} from '../constants/detailRecordConstants';
import type { SeverityTypes } from '../types/detailRecordTypes';

interface BloatingFieldPropTypes {
  value: SeverityTypes;
  onChange: (value: SeverityTypes) => void;
}

const BloatingField = ({ value, onChange }: BloatingFieldPropTypes) => {
  return (
    <SeverityCard
      title="복부 팽만"
      options={BLOATING_OPTIONS}
      value={value}
      onChange={onChange}
      tooltipContent={<RecordTooltipContent {...BLOATING_TOOLTIP} />}
      iconClassName={SEVERITY_ICON_CLASS_NAME}
    />
  );
};

export default BloatingField;
