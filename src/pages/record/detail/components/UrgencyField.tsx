import RecordTooltipContent from '@/pages/record/shared/components/RecordTooltipContent';
import SeverityCard from '@/pages/record/shared/components/SeverityCard';

import {
  SEVERITY_ICON_CLASS_NAME,
  URGENCY_OPTIONS,
  URGENCY_TOOLTIP,
} from '../constants/detailRecordConstants';
import type { SeverityTypes } from '../types/detailRecordTypes';

interface UrgencyFieldPropTypes {
  value: SeverityTypes;
  onChange: (value: SeverityTypes) => void;
}

const UrgencyField = ({ value, onChange }: UrgencyFieldPropTypes) => {
  return (
    <SeverityCard
      title="급박감"
      options={URGENCY_OPTIONS}
      value={value}
      onChange={onChange}
      tooltipContent={<RecordTooltipContent {...URGENCY_TOOLTIP} />}
      iconClassName={SEVERITY_ICON_CLASS_NAME}
    />
  );
};

export default UrgencyField;
