import RecordTooltipContent from '@/pages/record/shared/components/RecordTooltipContent';
import SeverityCard from '@/pages/record/shared/components/SeverityCard';

import {
  SEVERITY_ICON_CLASS_NAME,
  TENESMUS_OPTIONS,
  TENESMUS_TOOLTIP,
} from '../constants/detailRecordConstants';
import type { SeverityTypes } from '../types/detailRecordTypes';

interface TenesmusFieldPropTypes {
  value: SeverityTypes;
  onChange: (value: SeverityTypes) => void;
}

const TenesmusField = ({ value, onChange }: TenesmusFieldPropTypes) => {
  return (
    <SeverityCard
      title="잔변감"
      options={TENESMUS_OPTIONS}
      value={value}
      onChange={onChange}
      tooltipContent={<RecordTooltipContent {...TENESMUS_TOOLTIP} />}
      iconClassName={SEVERITY_ICON_CLASS_NAME}
    />
  );
};

export default TenesmusField;
