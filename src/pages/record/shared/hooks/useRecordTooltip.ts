import { useLayoutEffect, useRef, useState } from 'react';

import useOutsideClick from '@/shared/hooks/useOutsideClick';

// 꼬리 밑변 폭(0.75rem)의 절반. 꼬리 중심을 안내 버튼 중심에 맞출 때 뺀다.
const TOOLTIP_ARROW_HALF_WIDTH = 6;

/**
 * 섹션 제목의 안내(i) 버튼으로 여닫는 툴팁 상태를 관리한다.
 * 제목 길이에 따라 버튼 위치가 달라지므로 꼬리 좌표는 열릴 때마다 실측한다.
 */
export const useRecordTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipArrowLeft, setTooltipArrowLeft] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(sectionRef, () => setIsTooltipOpen(false));

  useLayoutEffect(() => {
    if (!isTooltipOpen || !sectionRef.current || !infoButtonRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const infoButtonRect = infoButtonRef.current.getBoundingClientRect();
    const infoButtonCenter =
      infoButtonRect.left - sectionRect.left + infoButtonRect.width / 2;

    setTooltipArrowLeft(infoButtonCenter - TOOLTIP_ARROW_HALF_WIDTH);
  }, [isTooltipOpen]);

  const handleInfoClick = () => {
    setIsTooltipOpen((prev) => !prev);
  };

  return {
    isTooltipOpen,
    handleInfoClick,
    sectionRef,
    infoButtonRef,
    tooltipArrowStyle: { left: `${tooltipArrowLeft}px` },
  };
};
