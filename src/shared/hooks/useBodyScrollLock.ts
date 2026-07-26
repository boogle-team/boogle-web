import { useEffect } from 'react';

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const { overflow, position, top, width } = body.style;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.overflow = overflow;
      body.style.position = position;
      body.style.top = top;
      body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
