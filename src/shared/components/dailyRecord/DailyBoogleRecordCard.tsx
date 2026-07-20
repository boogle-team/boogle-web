import BoogleRecordItem from './BoogleRecordItem';
import DailyRecordCardShell from './DailyRecordCardShell';
import EmptyRecordState from './EmptyRecordState';
import type {
  BoogleRecordStatusTypes,
  BoogleRecordSummaryTypes,
  DailyRecordVariantTypes,
} from './types/dailyRecordTypes';

import NoBoogleRecordCharacter from '@/shared/assets/illustrations/dailyRecord/noBoogleRecordCharacter.svg?react';
import NoBoogleSignCharacter from '@/shared/assets/illustrations/dailyRecord/noBoogleSignCharacter.svg?react';

interface DailyBoogleRecordCardPropTypes {
  variant: DailyRecordVariantTypes;
  records: BoogleRecordSummaryTypes[];
  status: BoogleRecordStatusTypes;
  onCreateClick: () => void;
  onEditClick?: (recordId: number) => void;
}

const EMPTY_MESSAGE_MAP: Record<
  Exclude<BoogleRecordStatusTypes, 'recorded'>,
  string
> = {
  todayEmpty: '아직 부글 신호가 오지 않았나요?',
  pastEmpty: '이날은 기록을 남기지 않았어요',
  future: '아직 오지 않은 날이에요',
  noBoogleSignal: '부글 신호가 오지 않았어요',
};

const DailyBoogleRecordCard = ({
  variant,
  records,
  status,
  onCreateClick,
  onEditClick,
}: DailyBoogleRecordCardPropTypes) => {
  const isFuture = status === 'future';
  const isBowelRecorded = status === 'recorded';
  const hasAnyRecord = records.length > 0;
  const noBoogleSignalRecordId = records[0]?.id;
  const isNoBoogleSignalRecord = status === 'noBoogleSignal' && hasAnyRecord;
  const shouldShowItemEditButton = variant === 'calendar' && isBowelRecorded;
  const shouldShowHeaderEditButton =
    variant === 'calendar' &&
    isNoBoogleSignalRecord &&
    noBoogleSignalRecordId !== undefined;
  const shouldShowHeaderCreateButton =
    !shouldShowHeaderEditButton &&
    (variant === 'home' || !hasAnyRecord || isFuture);
  const actionType = shouldShowHeaderEditButton
    ? 'edit'
    : shouldShowHeaderCreateButton
      ? 'create'
      : 'none';
  const actionLabel = shouldShowHeaderEditButton
    ? '부글 배변 없음 기록 수정'
    : '부글 기록 작성';
  const statusText = isBowelRecorded ? `${records.length}회` : undefined;
  const emptyCharacter =
    status === 'noBoogleSignal' ? (
      <NoBoogleSignCharacter className="h-[4.5rem] w-[4.5rem]" />
    ) : (
      <NoBoogleRecordCharacter className="h-12 w-12" />
    );

  const handleCardActionClick = () => {
    if (shouldShowHeaderEditButton && noBoogleSignalRecordId !== undefined) {
      onEditClick?.(noBoogleSignalRecordId);
      return;
    }

    onCreateClick();
  };

  return (
    <DailyRecordCardShell
      title="부글 기록"
      statusText={statusText}
      actionLabel={actionLabel}
      actionType={actionType}
      isActionDisabled={isFuture}
      onActionClick={handleCardActionClick}
    >
      {isBowelRecorded ? (
        <ul className="space-y-1 px-4 py-4">
          {records.map((record, index) => (
            <BoogleRecordItem
              key={record.id}
              record={record}
              isLastItem={index === records.length - 1}
              onEditClick={shouldShowItemEditButton ? onEditClick : undefined}
            />
          ))}
        </ul>
      ) : (
        <EmptyRecordState
          message={EMPTY_MESSAGE_MAP[status]}
          character={emptyCharacter}
        />
      )}
    </DailyRecordCardShell>
  );
};

export default DailyBoogleRecordCard;
