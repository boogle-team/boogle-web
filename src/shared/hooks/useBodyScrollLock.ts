import { useLayoutEffect } from 'react';

/**
 * 잠긴 동안 배경(body) 스크롤을 막는다.
 *
 * iOS Safari는 body의 overflow: hidden을 무시하고 그대로 스크롤되는 경우가 있어
 * position: fixed로 화면을 붙잡고, 풀릴 때 원래 스크롤 위치로 되돌린다.
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useLayoutEffect(() => {
    if (!isLocked) return;

    const lockedScrollY = window.scrollY;
    const { overflow, position, top, width } = document.body.style;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;

      // position: fixed 동안 스크롤 위치가 0으로 초기화되므로 직접 복원한다.
      window.scrollTo(0, lockedScrollY);
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
