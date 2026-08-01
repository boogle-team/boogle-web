import { useMemo } from 'react';

import { MEDICINE_OPTIONS } from '../constants/lifeDetailRecordConstants';
import { useMedicines } from '../hooks/useMedicines';
import { MEDICINE_ID_BY_VALUE } from '../types/lifeRecordApiTypes';
import type { MedicineTypes } from '../types/lifeDetailRecordTypes';
import LifeSectionTitle from './LifeSectionTitle';
import MedicineChip from './MedicineChip';

const FIELD_TITLE = '약·영양제';

const MEDICINE_VALUE_BY_ID = Object.fromEntries(
  Object.entries(MEDICINE_ID_BY_VALUE).map(([medicine, id]) => [id, medicine]),
) as Record<number, MedicineTypes>;

interface MedicineFieldPropTypes {
  value: MedicineTypes[];
  onToggle: (medicine: MedicineTypes) => void;
}

const MedicineField = ({ value, onToggle }: MedicineFieldPropTypes) => {
  const { data: medicinesData } = useMedicines();
  const medicineOptions = useMemo(() => {
    if (!medicinesData?.items) return MEDICINE_OPTIONS;

    const optionByValue = new Map(
      MEDICINE_OPTIONS.map((medicineOption) => [
        medicineOption.value,
        medicineOption,
      ]),
    );

    return medicinesData.items
      .map(({ id }) => MEDICINE_VALUE_BY_ID[id])
      .filter((medicine): medicine is MedicineTypes => Boolean(medicine))
      .map((medicine) => optionByValue.get(medicine))
      .filter(
        (medicineOption): medicineOption is (typeof MEDICINE_OPTIONS)[number] =>
          Boolean(medicineOption),
      );
  }, [medicinesData]);

  return (
    <section className="flex flex-col gap-2">
      <LifeSectionTitle title={FIELD_TITLE} guideText="중복 선택 가능" />

      <div
        role="group"
        aria-label={FIELD_TITLE}
        className="grid grid-cols-3 gap-1"
      >
        {medicineOptions.map(({ value: medicine, label, Icon }) => (
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
