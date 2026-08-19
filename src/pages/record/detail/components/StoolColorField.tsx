import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';
import WarningBadgeIcon from '@/shared/assets/icons/warningBadgeIcon.svg?react';

import {
  ABNORMAL_COLOR_NOTICE,
  ABNORMAL_STOOL_COLORS,
  STOOL_COLOR_OPTIONS,
} from '../constants/detailRecordConstants';
import type { StoolColorTypes } from '../types/detailRecordTypes';

interface StoolColorFieldPropTypes {
  value: StoolColorTypes | null;
  onChange: (value: StoolColorTypes) => void;
}

const StoolColorField = ({ value, onChange }: StoolColorFieldPropTypes) => {
  const isAbnormalColorSelected =
    value !== null && ABNORMAL_STOOL_COLORS.includes(value);

  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title="변 색상" />

      {/* 색상 선택 영역과 주의 안내 사이 간격(1rem)은 섹션 제목 간격(0.75rem)과 달라 따로 감싼다. */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-5">
          {STOOL_COLOR_OPTIONS.map((option) => {
            const isSelected = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onChange(option.value)}
                className="flex flex-col items-center gap-2"
              >
                {/* 선택 링은 box-shadow라 선택 여부가 원 간격에 영향을 주지 않는다. */}
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: option.color }}
                  className={`h-12 w-12 rounded-full ${
                    isSelected ? 'ring-[3px] ring-orange-3' : ''
                  }`}
                />

                <span
                  className={`caption-bold text-center ${
                    isSelected ? 'text-orange-7' : 'text-gray-7'
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {isAbnormalColorSelected && (
          <div className="flex items-start gap-4 rounded-xl border border-orange-3 bg-orange-1 p-4 shadow-sm">
            <WarningBadgeIcon
              className="h-10 w-10 shrink-0"
              aria-hidden="true"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="label-bold text-orange-7">
                {ABNORMAL_COLOR_NOTICE.title}
              </p>

              <p className="caption text-gray-7">
                {ABNORMAL_COLOR_NOTICE.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoolColorField;
