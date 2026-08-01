import type { ComponentType, SVGProps } from 'react';

import AbdominalBloatingIcon from '@/shared/assets/illustrations/guide/abdominalBloatingIcon.svg?react';
import BowelAmountIcon from '@/shared/assets/illustrations/guide/bowelAmountIcon.svg?react';
import BowelMovementTimeIcon from '@/shared/assets/illustrations/guide/bowelMovementTimeIcon.svg?react';
import BristolStoolChartIcon from '@/shared/assets/illustrations/guide/bristolStoolChartIcon.svg?react';
import CaffeineRelationIcon from '@/shared/assets/illustrations/guide/caffeineRelationIcon.svg?react';
import FoodRelationIcon from '@/shared/assets/illustrations/guide/foodRelationIcon.svg?react';
import HormoneRelationIcon from '@/shared/assets/illustrations/guide/hormoneRelationIcon.svg?react';
import LooseStoolIcon from '@/shared/assets/illustrations/guide/looseStoolIcon.svg?react';
import NoBowelMovementIcon from '@/shared/assets/illustrations/guide/noBowelMovementIcon.svg?react';
import NormalBowelCountIcon from '@/shared/assets/illustrations/guide/normalBowelCountIcon.svg?react';
import SleepConditionIcon from '@/shared/assets/illustrations/guide/sleepConditionIcon.svg?react';
import StressGutIcon from '@/shared/assets/illustrations/guide/stressGutIcon.svg?react';
import IrregularityMealIcon from '@/shared/assets/illustrations/guide/irregularityMealIcon.svg?react';
import TenesmusFrequentlyIcon from '@/shared/assets/illustrations/guide/tenesmusFrequentlyIcon.svg?react';
import UrgencyFeelingIcon from '@/shared/assets/illustrations/guide/urgencyFeelingIcon.svg?react';
import WarningSignIcon from '@/shared/assets/illustrations/guide/warningSignIcon.svg?react';
import WaterDropIcon from '@/shared/assets/illustrations/guide/waterDropIcon.svg?react';
import WorkoutRelationIcon from '@/shared/assets/illustrations/guide/workoutRelationIcon.svg?react';

type GuideIconTypes = ComponentType<SVGProps<SVGSVGElement>>;

// guideId 체계는 서버 스펙 고정값이다. (장 건강 1~3 / 패턴 기반 101~114 / 주의 신호 1001)
// 아이콘 SVG에 배경색이 내장돼 있어 카테고리별 배경 클래스는 따로 두지 않는다.
export const GUIDE_ICON_BY_ID: Record<number, GuideIconTypes> = {
  1: NormalBowelCountIcon,
  2: BristolStoolChartIcon,
  3: StressGutIcon,
  101: WaterDropIcon,
  102: SleepConditionIcon,
  103: AbdominalBloatingIcon,
  104: TenesmusFrequentlyIcon,
  105: UrgencyFeelingIcon,
  106: BowelMovementTimeIcon,
  107: BowelAmountIcon,
  108: NoBowelMovementIcon,
  109: LooseStoolIcon,
  110: FoodRelationIcon,
  111: HormoneRelationIcon,
  112: IrregularityMealIcon,
  113: CaffeineRelationIcon,
  114: WorkoutRelationIcon,
  1001: WarningSignIcon,
};

// 서버에 새 가이드가 추가되면 매핑이 없을 수 있으므로 호출부에서 null을 처리한다.
export const getGuideIcon = (guideId: number): GuideIconTypes | null =>
  GUIDE_ICON_BY_ID[guideId] ?? null;
