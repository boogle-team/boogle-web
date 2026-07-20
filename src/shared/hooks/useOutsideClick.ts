import { useEffect } from 'react';
import type { RefObject } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
