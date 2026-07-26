import RadioOptionCard from '@/pages/record/shared/components/RadioOptionCard';

import { DURATION_OPTIONS } from '../constants/detailRecordConstants';
import type { DurationTypes } from '../types/detailRecordTypes';

interface DurationFieldPropTypes {
  value: DurationTypes | null;
  onChange: (value: DurationTypes) => void;
}

const DurationField = ({ value, onChange }: DurationFieldPropTypes) => {
  return (
    <RadioOptionCard
      title="배변 시간"
      options={DURATION_OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
};

export default DurationField;
