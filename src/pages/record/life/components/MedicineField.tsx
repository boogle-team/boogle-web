import { MEDICINE_OPTIONS } from '../constants/lifeDetailRecordConstants';
import type { MedicineTypes } from '../types/lifeDetailRecordTypes';
import LifeSectionTitle from './LifeSectionTitle';
import MedicineChip from './MedicineChip';

const FIELD_TITLE = '약·영양제';

interface MedicineFieldPropTypes {
  value: MedicineTypes[];
  onToggle: (medicine: MedicineTypes) => void;
}

const MedicineField = ({ value, onToggle }: MedicineFieldPropTypes) => {
  return (
    <section className="flex flex-col gap-2">
      <LifeSectionTitle title={FIELD_TITLE} guideText="중복 선택 가능" />

      <div
        role="group"
        aria-label={FIELD_TITLE}
        className="grid grid-cols-3 gap-1"
      >
        {MEDICINE_OPTIONS.map(({ value: medicine, label, Icon }) => (
          <MedicineChip
            key={medicine}
            label={label}
            Icon={Icon}
            isSelected={value.includes(medicine)}
            onClick={() => onToggle(medicine)}
          />
        ))}
      </div>
    </section>
  );
};

export default MedicineField;
