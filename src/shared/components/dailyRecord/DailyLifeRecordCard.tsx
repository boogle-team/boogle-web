import {
  getMealRegularLabel,
  getSleepLabel,
  getStressLabel,
  getWaterLabel,
} from './constants/dailyRecordLabels';
import DailyRecordCardShell from './DailyRecordCardShell';
import EmptyRecordState from './EmptyRecordState';
import FoodList from './FoodList';
import LifeMetricCard from './LifeMetricCard';
import type {
  DailyRecordVariantTypes,
  LifeMetricTypes,
  LifeRecordStatusTypes,
  LifeRecordSummaryTypes,
} from './types/dailyRecordTypes';

import NoDailyRecordCharacter from '@/shared/assets/illustrations/dailyRecord/noDailyRecordCharacter.svg?react';
import DailyDinner from '@/shared/assets/illustrations/dailyRecord/dailyDinner.svg?react';
import DailySleep from '@/shared/assets/illustrations/dailyRecord/dailySleep.svg?react';
import DailyStress from '@/shared/assets/illustrations/dailyRecord/dailyStress.svg?react';
import DailyWater from '@/shared/assets/illustrations/dailyRecord/dailyWater.svg?react';

interface DailyLifeRecordCardPropTypes {
  variant: DailyRecordVariantTypes;
  record: LifeRecordSummaryTypes | null;
  status: LifeRecordStatusTypes;
  onCreateClick: () => void;
  onEditClick?: (recordId: number) => void;
}

const EMPTY_MESSAGE_MAP: Record<
  Exclude<LifeRecordStatusTypes, 'recorded'>,
  string
> = {
  todayEmpty: '아직 생활 기록이 없어요!',
  pastEmpty: '이날은 생활 기록이 없어요',
  future: '아직 오지 않은 날이에요',
};

const DailyLifeRecordCard = ({
  variant,
  record,
  status,
  onCreateClick,
  onEditClick,
}: DailyLifeRecordCardPropTypes) => {
  const isFuture = status === 'future';
  const isRecorded = status === 'recorded' && record;
  const isCalendarEditMode = variant === 'calendar' && Boolean(isRecorded);
  const actionType = isCalendarEditMode ? 'edit' : 'create';

  const handleActionClick = () => {
    if (isCalendarEditMode && record && onEditClick) {
      onEditClick(record.id);
      return;
    }

    onCreateClick();
  };

  const metrics: LifeMetricTypes[] = record
    ? [
        {
          key: 'sleep',
          label: '수면',
          value: getSleepLabel(record.sleep),
          icon: <DailySleep className="h-8 w-8" />,
          isWarning: record.sleep === 'B',
        },
        {
          key: 'stress',
          label: '스트레스',
          value: getStressLabel(record.stress),
          icon: <DailyStress className="h-8 w-8" />,
        },
        {
          key: 'mealRegular',
          label: '식사 규칙성',
          value: getMealRegularLabel(record.mealRegular),
          icon: <DailyDinner className="h-8 w-8" />,
        },
        {
          key: 'water',
          label: '수분',
          value: getWaterLabel(record.water),
          icon: <DailyWater className="h-8 w-8" />,
          isWarning: record.water === 'L',
        },
      ]
    : [];

  return (
    <DailyRecordCardShell
      title="생활 기록"
      statusText={isRecorded ? '완료' : undefined}
      actionLabel={isCalendarEditMode ? '생활 기록 수정' : '생활 기록 작성'}
      actionType={actionType}
      isActionDisabled={isFuture}
      onActionClick={handleActionClick}
    >
      {isRecorded ? (
        <div className="space-y-6 px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            {metrics.map(({ key, label, value, icon, isWarning }) => (
              <LifeMetricCard
                key={key}
                label={label}
                value={value}
                icon={icon}
                isWarning={isWarning}
              />
            ))}
          </div>

          <FoodList foods={record.foods} />
        </div>
      ) : status !== 'recorded' ? (
        <EmptyRecordState
          message={EMPTY_MESSAGE_MAP[status]}
          character={<NoDailyRecordCharacter className="h-12 w-12" />}
        />
      ) : null}
    </DailyRecordCardShell>
  );
};

export default DailyLifeRecordCard;