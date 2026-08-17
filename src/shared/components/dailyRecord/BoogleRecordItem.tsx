import {
  getBoogleAmountLabel,
  getBowelFeelingLabel,
  getBoogleSeverityDetailLabel,
  getBoogleTakenTimeLabel,
  getStomachLabel,
  getStoolColorLabel,
  getStoolSimpleLabel,
} from './constants/dailyRecordLabels';
import BoogleRecordChip from './BoogleRecordChip';
import type { BoogleRecordSummaryTypes } from './types/dailyRecordTypes';

import RecordEdit from '@/shared/assets/icons/recordEdit.svg?react';
import BoogleRecordTimeLineFlower from '@/shared/assets/illustrations/dailyRecord/boogleRecordTimeLineFlower.svg?react';

interface BoogleRecordItemPropTypes {
  record: BoogleRecordSummaryTypes;
  isLastItem: boolean;
  shouldShowDetail?: boolean;
  onEditClick?: (recordId: number) => void;
}

const BoogleRecordItem = ({
  record,
  isLastItem,
  shouldShowDetail = false,
  onEditClick,
}: BoogleRecordItemPropTypes) => {
  const {
    id,
    bowelMovementAt,
    stoolBristol,
    stoolSimple,
    bowelFeeling,
    stomach,
    distension,
    remainingFeeling,
    urgency,
    takenTime,
    amount,
    color,
  } = record;
  const recordTime = bowelMovementAt ?? '--:--';
  const stomachLabel = getStomachLabel(stomach);
  const detailLabels = shouldShowDetail
    ? [
        getBoogleSeverityDetailLabel('복부팽만', distension),
        getBoogleSeverityDetailLabel('잔변감', remainingFeeling),
        getBoogleSeverityDetailLabel('배변 긴급도', urgency),
        getBoogleTakenTimeLabel(takenTime),
        getBoogleAmountLabel(amount),
        getStoolColorLabel(color),
      ].filter((label): label is string => Boolean(label))
    : [];

  const handleRecordEditClick = () => {
    onEditClick?.(id);
  };

  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-x-1">
      <div className="flex flex-col items-center">
        <span className="flex min-h-6 items-center">
          <BoogleRecordTimeLineFlower className="h-5 w-5 shrink-0" />
        </span>
        {!isLastItem ? (
          <span className="h-full min-h-10 w-[1px] bg-orange-2" />
        ) : null}
      </div>

      <div className="min-w-0">
        <div className="mb-1 flex min-h-6 items-center justify-between gap-3">
          <p className="label-semi text-gray-7">{recordTime}</p>

          {onEditClick ? (
            <button
              type="button"
              aria-label={`${recordTime} 부글 기록 수정`}
              onClick={handleRecordEditClick}
              className="flex h-7 w-7 shrink-0 items-center justify-center text-beige-10 transition-colors active:text-orange-6"
            >
              <RecordEdit className="h-6 w-6" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <BoogleRecordChip
            variant="primary"
            text={`${getStoolSimpleLabel(stoolSimple)} (${stoolBristol}형)`}
          />
          <BoogleRecordChip text={getBowelFeelingLabel(bowelFeeling)} />
          {stomachLabel ? <BoogleRecordChip text={stomachLabel} /> : null}
          {detailLabels.map((detailLabel) => (
            <BoogleRecordChip key={detailLabel} text={detailLabel} />
          ))}
        </div>
      </div>
    </li>
  );
};

export default BoogleRecordItem;
