import type { ReactNode } from 'react';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import StepBar from './StepBar';

// 프로필 입력 스텝들의 공통 레이아웃 셸.
// TopNavigation + StepBar + 좌우 padding + 하단 버튼 영역을 한 번만 정의하고,
// 스텝별로 바뀌는 가운데 내용은 children으로, 하단 버튼은 footer로 주입받는다.
interface StepLayoutPropTypes {
  title: string;
  currentStep: number;
  totalSteps?: number;
  footer: ReactNode;
  onBackButtonClick?: () => void;
  children: ReactNode;
}

const StepLayout = ({
  title,
  currentStep,
  totalSteps,
  footer,
  onBackButtonClick,
  children,
}: StepLayoutPropTypes) => {
  return (
    <div className="flex min-h-dvh flex-col bg-beige-1 pt-[3.06rem]">
      <TopNavigation
        variant="default"
        title={title}
        onBackButtonClick={onBackButtonClick}
      />

      <StepBar currentStep={currentStep} totalSteps={totalSteps} />

      <main className="flex flex-1 flex-col px-layout pt-6">{children}</main>

      <footer className="px-layout pb-[3.69rem] pt-4">{footer}</footer>
    </div>
  );
};

export default StepLayout;
