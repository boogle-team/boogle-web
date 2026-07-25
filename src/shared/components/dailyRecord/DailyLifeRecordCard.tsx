import { useState } from 'react';

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
import LifeRecordDetailSection from './LifeRecordDetailSection';
import type {
  LifeMetricTypes,
  LifeRecordStatusTypes,
  LifeRecordViewTypes,
} from './types/dailyRecordTypes';

import NoDailyRecordCharacter from '@/shared/assets/illustrations/dailyRecord/noDailyRecordCharacter.svg?react';
import DailyDinner from '@/shared/assets/illustrations/dailyRecord/dailyDinner.svg?react';
import DailySleep from '@/shared/assets/illustrations/dailyRecord/dailySleep.svg?react';
import DailyStress from '@/shared/assets/illustrations/dailyRecord/dailyStress.svg?react';
import DailyWater from '@/shared/assets/illustrations/dailyRecord/dailyWater.svg?react';

interface DailyLifeRecordCardPropTypes {
  view: LifeRecordViewTypes;
  shouldShowDetail?: boolean;
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

// 생활 기록 세부 항목 더보기 컴포넌트
const DailyLifeRecordCard = ({
  view,
  shouldShowDetail = false,
  onCreateClick,
  onEditClick,
}: DailyLifeRecordCardPropTypes) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const isFuture = view.status === 'future';
  const isRecorded = view.status === 'recorded';
  const isEditMode = Boolean(onEditClick) && isRecorded;

  const handleActionClick = () => {
    if (view.status === 'recorded' && onEditClick) {
      onEditClick(view.record.id);
      return;
    }

    onCreateClick();
  };

  const handleDetailToggleClick = () => {
    setIsDetailOpen((previousIsDetailOpen) => !previousIsDetailOpen);
  };

  const metrics: LifeMetricTypes[] =
    view.status === 'recorded'
      ? [
          {
            key: 'sleep',
            label: '수면',
            value: getSleepLabel(view.record.sleep),
            icon: <DailySleep className="h-8 w-8" />,
            isWarning: view.record.sleep === 'B',
          },
          {
            key: 'stress',
            label: '스트레스',
            value: getStressLabel(view.record.stress),
            icon: <DailyStress className="h-8 w-8" />,
          },
          {
            key: 'mealRegular',
            label: '식사 규칙성',
            value: getMealRegularLabel(view.record.mealRegular),
            icon: <DailyDinner className="h-8 w-8" />,
          },
          {
            key: 'water',
            label: '수분',
            value: getWaterLabel(view.record.water),
            icon: <DailyWater className="h-8 w-8" />,
            isWarning: view.record.water === 'L',
          },
        ]
      : [];

  return (
    <DailyRecordCardShell
      title="생활 기록"
      statusText={isRecorded ? '완료' : undefined}
      actionLabel={isEditMode ? '생활 기록 수정' : '생활 기록 작성'}
      actionType={isEditMode ? 'edit' : 'create'}
      isActionDisabled={isFuture}
      onActionClick={handleActionClick}
    >
      {view.status === 'recorded' ? (
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

          <FoodList foods={view.record.foods} />
          {/* 생활 기록 세부 항목을 보여줘야 한다면 */}
          {shouldShowDetail ? (
            <LifeRecordDetailSection
              record={view.record}
              isOpen={isDetailOpen}
              onToggleClick={handleDetailToggleClick}
            />
          ) : null}
        </div>
      ) : (
        <EmptyRecordState
          message={EMPTY_MESSAGE_MAP[view.status]}
          character={<NoDailyRecordCharacter className="h-12 w-12" />}
        />
      )}
    </DailyRecordCardShell>
  );
};

export default DailyLifeRecordCard;
