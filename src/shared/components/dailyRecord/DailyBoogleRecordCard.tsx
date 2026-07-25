import BoogleRecordItem from './BoogleRecordItem';
import DailyRecordCardShell from './DailyRecordCardShell';
import EmptyRecordState from './EmptyRecordState';
import type {
  BoogleRecordStatusTypes,
  BoogleRecordViewTypes,
} from './types/dailyRecordTypes';

import NoBoogleRecordCharacter from '@/shared/assets/illustrations/dailyRecord/noBoogleRecordCharacter.svg?react';
import NoBoogleSignCharacter from '@/shared/assets/illustrations/dailyRecord/noBoogleSignCharacter.svg?react';

interface DailyBoogleRecordCardPropTypes {
  view: BoogleRecordViewTypes;
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
  view,
  onCreateClick,
  onEditClick,
}: DailyBoogleRecordCardPropTypes) => {
  const isFuture = view.status === 'future';
  const canEdit = Boolean(onEditClick);

  const getActionType = (): 'create' | 'edit' | 'none' => {
    if (!canEdit) return 'create';
    if (view.status === 'noBoogleSignal') return 'edit';
    if (view.status === 'recorded') return 'none';
    return 'create';
  };

  const actionType = getActionType();
  const actionLabel =
    actionType === 'edit' ? '부글 배변 없음 기록 수정' : '부글 기록 작성';
  const statusText =
    view.status === 'recorded' ? `${view.records.length}회` : undefined;
  const emptyCharacter =
    view.status === 'noBoogleSignal' ? (
      <NoBoogleSignCharacter className="h-[4.5rem] w-[4.5rem]" />
    ) : (
      <NoBoogleRecordCharacter className="h-12 w-12" />
    );

  const handleCardActionClick = () => {
    if (view.status === 'noBoogleSignal' && onEditClick) {
      onEditClick(view.record.id);
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
      {view.status === 'recorded' ? (
        <ul className="space-y-1 px-4 py-4">
          {view.records.map((record, index) => (
            <BoogleRecordItem
              key={record.id}
              record={record}
              isLastItem={index === view.records.length - 1}
              onEditClick={onEditClick}
            />
          ))}
        </ul>
      ) : (
        <EmptyRecordState
          message={EMPTY_MESSAGE_MAP[view.status]}
          character={emptyCharacter}
        />
      )}
    </DailyRecordCardShell>
  );
};

export default DailyBoogleRecordCard;
