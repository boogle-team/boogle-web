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
            className={`label-semi flex items-center justify-center gap-2.5 rounded-[2.5rem] px-4 py-1 ${
              isEditing
                ? 'bg-orange-6 text-beige-1'
                : 'bg-orange-3 text-beige-1'
            }`}
          >
            {isEditing ? '확인' : '수정'}
          </button>
        }
      />

      <div className="relative">
        <p className="flex items-center gap-2">
          <span
            className={`display-lg ${isEditing ? 'text-orange-7' : 'text-gray-8'}`}
          >
            {formatTwoDigits(value.hour)}:{formatTwoDigits(value.minute)}
          </span>
          <span
            className={`body-lg ${isEditing ? 'text-orange-7' : 'text-gray-7'}`}
          >
            {value.meridiem}
          </span>
        </p>

        {isEditing && (
          <div className="absolute left-0 top-full z-20 mt-2 flex h-50 w-45 flex-col items-center justify-center rounded-xl bg-beige-1 px-2.5 py-2.75 shadow-[0_15px_75px_0_rgba(0,0,0,0.18)]">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-9 -translate-y-1/2 rounded-[0.4375rem] bg-beige-5" />

              <div className="relative grid grid-cols-3">
                <TimeWheelColumn
                  items={HOURS}
                  selectedIndex={hourIndex}
                  onSelect={(index) =>
                    onChange({ ...value, hour: HOURS[index] })
                  }
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
          </div>
        )}
      </div>
    </section>
  );
};

export default RecordTimeField;
