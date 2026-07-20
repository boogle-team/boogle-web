import type { ReactNode } from 'react';

type DailyRecordChipVariantTypes = 'primary' | 'soft';

interface DailyRecordChipPropTypes {
  text: ReactNode;
  variant?: DailyRecordChipVariantTypes;
}

// 부글 기록 칩 스타일 컴포넌트
const DailyRecordChip = ({
  text,
  variant = 'soft',
}: DailyRecordChipPropTypes) => {
  const variantClassName = {
    primary: 'bg-orange-6 text-beige-1',
    soft: 'bg-orange-1 text-orange-7',
  }[variant];

  return (
    <span
      className={`label-semi inline-flex min-w-19 items-center justify-center rounded-full px-2 py-1 ${variantClassName}`}
    >
      {text}
    </span>
  );
};

export default DailyRecordChip;
