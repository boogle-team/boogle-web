import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 라우팅으로 화면이 바뀌어도 브라우저는 스크롤 위치를 유지한다.
 * 기록 화면은 항상 최상단부터 보여야 해서 진입 시 스크롤을 맨 위로 되돌린다.
 * 페인트 전에 실행되도록 useLayoutEffect를 쓴다.
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
