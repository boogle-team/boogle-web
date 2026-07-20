import { useEffect, useState } from 'react';

const TOAST_DURATION = 2500;

const useUnsavedChangesToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return;

    const timerId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, TOAST_DURATION);

    return () => window.clearTimeout(timerId);
  }, [isToastVisible]);

  const dismissToast = () => {
    setIsToastVisible(false);
  };

  const handleBackAttempt = (isModified: boolean, leavePage: () => void) => {
    if (isModified && !isToastVisible) {
      setIsToastVisible(true);
      return;
    }

    leavePage();
  };

  return {
    isToastVisible,
    dismissToast,
    handleBackAttempt,
  };
};

export default useUnsavedChangesToast;
