import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useBottomNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 하단 바의 실제 렌더 폭. 디바이스 폭에 따라 달라지므로 측정해서 path 생성에 사용한다.
  const navRef = useRef<HTMLElement>(null);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setNavWidth(entry.contentRect.width);
    });

    resizeObserver.observe(navElement);

    return () => resizeObserver.disconnect();
  }, []);

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return {
    pathname,
    isModalOpen,
    navRef,
    navWidth,
    handleTabClick,
    handlePlusClick,
    handleModalClose,
  };
};

export default useBottomNavigation;
