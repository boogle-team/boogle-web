import { STOOL_COLOR_OPTIONS } from '../constants/detailRecordConstants';
import type { StoolColorTypes } from '../types/detailRecordTypes';

export const buildAbnormalColorDescription = (
  stoolColor: StoolColorTypes,
): string => {
  const selectedOption = STOOL_COLOR_OPTIONS.find(
    (option) => option.value === stoolColor,
  );

  return `${selectedOption?.label ?? ''} 변이 의심된다고 표시하셨어요.\n이런 증상이 반복되거나 지속되면 가까운 병원에서 진료를 받아보세요.`;
};
