import { useLayoutEffect } from 'react';

const useGuideScrollReset = (selectedGuideId: number | null) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedGuideId]);
};

export default useGuideScrollReset;
