import {
  getCaffeineLabel,
  getExerciseLabel,
  getHormoneLabel,
  getMedicineLabel,
  getOutingLabel,
  getSleepTimeLabel,
  getWaterIntakeLabel,
} from './constants/dailyRecordLabels';
import type { LifeRecordSummaryTypes } from './types/dailyRecordTypes';

import ChevronDownIcon from '@/shared/assets/icons/chevronDownIcon.svg?react';
import Apple from '@/shared/assets/illustrations/dailyRecord/apple.svg?react';

interface LifeRecordDetailSectionPropTypes {
  record: LifeRecordSummaryTypes;
  isOpen: boolean;
  onToggleClick: () => void;
}

interface LifeRecordDetailItemTypes {
  label: string;
  value: string;
}

const LifeRecordDetailSection = ({
  record,
  isOpen,
  onToggleClick,
}: LifeRecordDetailSectionPropTypes) => {
  const detailItems: LifeRecordDetailItemTypes[] = [
    { label: '수면 시간', value: getSleepTimeLabel(record.sleepTime) },
    { label: '운동', value: getExerciseLabel(record.exercise) },
    { label: '카페인', value: getCaffeineLabel(record.caffeine) },
    { label: '물 섭취량', value: getWaterIntakeLabel(record.waterIntake) },
    { label: '외출·여행', value: getOutingLabel(record.outing) },
    { label: '약·영양제', value: getMedicineLabel(record.medicine) },
    { label: '생리·호르몬 변화', value: getHormoneLabel(record.hormone) },
  ];

  return (
    <div className="space-y-3">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggleClick}
        className="flex w-full items-center justify-between text-gray-7"
      >
        <span className="label flex items-center gap-1">
          <Apple className="h-5 w-5" />
          생활 기록 <p className="label-bold">세부 항목</p> 더보기
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-gray-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen ? (
        <dl className="space-y-2 rounded-xl bg-beige-5 px-4 py-4">
          {detailItems.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <dt className="label text-gray-7">{label}</dt>
              <dd className="label min-w-0 flex-1 text-right text-gray-8">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
};

export default LifeRecordDetailSection;
