import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useBottomNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    handleTabClick,
    handlePlusClick,
    handleModalClose,
  };
};

export default useBottomNavigation;
