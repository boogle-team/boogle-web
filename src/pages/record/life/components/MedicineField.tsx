import { useMemo } from 'react';

import { MEDICINE_OPTIONS } from '../constants/lifeDetailRecordConstants';
import { useMedicines } from '../hooks/useMedicines';
import type { MedicineTypes } from '../types/lifeDetailRecordTypes';
import { getMedicineValue } from '../utils/lifeRecordItemMapper';
import LifeSectionTitle from './LifeSectionTitle';
import MedicineChip from './MedicineChip';

const FIELD_TITLE = '약·영양제';

interface MedicineFieldPropTypes {
  value: MedicineTypes[];
  onToggle: (medicine: MedicineTypes) => void;
}

const MedicineField = ({ value, onToggle }: MedicineFieldPropTypes) => {
  const { data: medicinesData } = useMedicines();
  const medicineOptions = useMemo(() => {
    const optionByValue = new Map(
      MEDICINE_OPTIONS.map((medicineOption) => [
        medicineOption.value,
        medicineOption,
      ]),
    );

    const serverOptions = medicinesData?.items
      ? medicinesData.items
          .map(getMedicineValue)
          .filter((medicine): medicine is MedicineTypes => Boolean(medicine))
          .map((medicine) => optionByValue.get(medicine))
          .filter(
            (
              medicineOption,
            ): medicineOption is (typeof MEDICINE_OPTIONS)[number] =>
              Boolean(medicineOption),
          )
      : MEDICINE_OPTIONS;

    const selectedOptions = value
      .map((medicine) => optionByValue.get(medicine))
      .filter(
        (medicineOption): medicineOption is (typeof MEDICINE_OPTIONS)[number] =>
          Boolean(medicineOption),
      );

    const optionValueSet = new Set(serverOptions.map(({ value }) => value));

    return [
      ...serverOptions,
      ...selectedOptions.filter(
        (medicineOption) => !optionValueSet.has(medicineOption.value),
      ),
    ];
  }, [medicinesData, value]);

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
