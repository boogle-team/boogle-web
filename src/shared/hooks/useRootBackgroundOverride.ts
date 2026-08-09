import { useContext, useLayoutEffect } from 'react';

import RootBackgroundContext from '@/shared/contexts/rootBackgroundContext';

/**
 * 마운트되어 있는 동안 루트 배경색을 임시로 덮어쓴다.
 * backgroundColor가 null이면 아무것도 등록하지 않는다.
 */
const useRootBackgroundOverride = (backgroundColor: string | null) => {
  const rootBackgroundContext = useContext(RootBackgroundContext);

  if (!rootBackgroundContext) {
    throw new Error(
      'useRootBackgroundOverride는 RootBackgroundSync 안에서 사용해야 합니다.',
    );
  }

  const { registerRootBackgroundOverride } = rootBackgroundContext;

  useLayoutEffect(() => {
    if (!backgroundColor) {
      return;
    }

    return registerRootBackgroundOverride(backgroundColor);
  }, [backgroundColor, registerRootBackgroundOverride]);
};

export default useRootBackgroundOverride;
