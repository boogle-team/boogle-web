import { useState } from 'react';

import { HOURS, MERIDIEMS, MINUTES } from '../constants/record.constants';
import type { MeridiemTypes, RecordTimeValueTypes } from '../types/recordTypes';
import RecordSectionTitle from './RecordSectionTitle';
import TimeWheelColumn from './TimeWheelColumn';

interface RecordTimeFieldPropTypes {
  value: RecordTimeValueTypes;
  onChange: (value: RecordTimeValueTypes) => void;
}

const formatTwoDigits = (value: number) => String(value).padStart(2, '0');

const RecordTimeField = ({ value, onChange }: RecordTimeFieldPropTypes) => {
  const [isEditing, setIsEditing] = useState(false);

  const hourIndex = HOURS.indexOf(value.hour);
  const minuteIndex = MINUTES.indexOf(value.minute);
  const meridiemIndex = MERIDIEMS.indexOf(value.meridiem);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle
        title="시간"
        rightContent={
          <button
            type="button"
            onClick={handleToggleEdit}
            className="label-semi rounded-lg bg-orange-2 px-4 py-2 text-orange-6"
          >
            {isEditing ? '확인' : '수정'}
          </button>
        }
      />

      <p className="flex items-baseline gap-1">
        <span className="display-lg text-gray-10">
          {value.hour}:{formatTwoDigits(value.minute)}
        </span>
        <span className="body-m-bold text-orange-6">{value.meridiem}</span>
      </p>

      {isEditing && (
        <div className="relative overflow-hidden rounded-2xl border border-gray-4 bg-beige-2 px-2">
          <div className="pointer-events-none absolute inset-x-2 top-1/2 h-10 -translate-y-1/2 rounded-lg bg-orange-1" />

          <div className="relative grid grid-cols-3">
            <TimeWheelColumn
              items={HOURS}
              selectedIndex={hourIndex}
              onSelect={(index) => onChange({ ...value, hour: HOURS[index] })}
            />
            <TimeWheelColumn
              items={MINUTES}
              selectedIndex={minuteIndex}
              onSelect={(index) =>
                onChange({ ...value, minute: MINUTES[index] })
              }
              formatItem={formatTwoDigits}
            />
            <TimeWheelColumn
              items={MERIDIEMS}
              selectedIndex={meridiemIndex}
              onSelect={(index) =>
                onChange({
                  ...value,
                  meridiem: MERIDIEMS[index] as MeridiemTypes,
                })
              }
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RecordTimeField;
