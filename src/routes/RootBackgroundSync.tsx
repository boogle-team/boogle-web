import { useCallback, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import RootBackgroundContext from '@/shared/contexts/rootBackgroundContext';
import useRootBackgroundColor from '@/shared/hooks/useRootBackgroundColor';

const ROOT_BACKGROUND_COLORS = {
  ORANGE_6: 'var(--color-orange-6)',
  BEIGE_1: 'var(--color-beige-1)',
  BEIGE_4: 'var(--color-beige-4)',
  BEIGE_5: 'var(--color-beige-5)',
} as const;

const DEFAULT_ROOT_BACKGROUND_COLOR = ROOT_BACKGROUND_COLORS.BEIGE_5;

/**
 * 경로별 배경색은 정확 일치를 우선 조회한다.
 * 등록되지 않은 경로는 기본 배경색을 사용한다.
 */
const EXACT_PATH_BACKGROUND_COLORS: Record<string, string> = {
  '/': ROOT_BACKGROUND_COLORS.ORANGE_6,

  '/onboarding': ROOT_BACKGROUND_COLORS.BEIGE_4,
  '/onboarding/profile': ROOT_BACKGROUND_COLORS.BEIGE_1,

  '/login': ROOT_BACKGROUND_COLORS.BEIGE_5,
  '/login/callback': ROOT_BACKGROUND_COLORS.BEIGE_5,
  '/oauth/callback': ROOT_BACKGROUND_COLORS.BEIGE_5,

  '/home': ROOT_BACKGROUND_COLORS.BEIGE_1,
  '/calendar': ROOT_BACKGROUND_COLORS.BEIGE_5,
  '/report': ROOT_BACKGROUND_COLORS.BEIGE_5,
  '/guide': ROOT_BACKGROUND_COLORS.BEIGE_5,
  '/notifications': ROOT_BACKGROUND_COLORS.BEIGE_5,

  '/settings': ROOT_BACKGROUND_COLORS.BEIGE_5,

  '/boogle-record/new': ROOT_BACKGROUND_COLORS.BEIGE_1,
  '/boogle-record/detail': ROOT_BACKGROUND_COLORS.BEIGE_1,
  '/life-record/new': ROOT_BACKGROUND_COLORS.BEIGE_1,
  '/life-record/detail': ROOT_BACKGROUND_COLORS.BEIGE_1,
};

/** 같은 배경색을 공유하는 하위 경로와 동적 세그먼트는 접두사로 처리한다. */
const PREFIX_PATH_BACKGROUND_COLORS: [string, string][] = [
  ['/settings/', ROOT_BACKGROUND_COLORS.BEIGE_1],
  ['/boogle-record/edit/', ROOT_BACKGROUND_COLORS.BEIGE_1],
  ['/life-record/edit/', ROOT_BACKGROUND_COLORS.BEIGE_1],
];

const getRootBackgroundColor = (pathname: string) => {
  const exactMatchedColor = EXACT_PATH_BACKGROUND_COLORS[pathname];

  if (exactMatchedColor) {
    return exactMatchedColor;
  }

  const prefixMatched = PREFIX_PATH_BACKGROUND_COLORS.find(([prefix]) =>
    pathname.startsWith(prefix),
  );

  if (prefixMatched) {
    const [, backgroundColor] = prefixMatched;

    return backgroundColor;
  }

  return DEFAULT_ROOT_BACKGROUND_COLOR;
};

interface RootBackgroundOverrideTypes {
  id: number;
  backgroundColor: string;
}

const RootBackgroundSync = () => {
  const { pathname } = useLocation();
  const [rootBackgroundOverrides, setRootBackgroundOverrides] = useState<
    RootBackgroundOverrideTypes[]
  >([]);
  const overrideIdRef = useRef(0);

  const registerRootBackgroundOverride = useCallback(
    (backgroundColor: string) => {
      overrideIdRef.current += 1;

      const { current: id } = overrideIdRef;

      setRootBackgroundOverrides((previousOverrides) => [
        ...previousOverrides,
        { id, backgroundColor },
      ]);

      return () => {
        setRootBackgroundOverrides((previousOverrides) =>
          previousOverrides.filter((override) => override.id !== id),
        );
      };
    },
    [],
  );

  const activeOverrideColor =
    rootBackgroundOverrides.at(-1)?.backgroundColor ?? null;

  useRootBackgroundColor(
    activeOverrideColor ?? getRootBackgroundColor(pathname),
  );

  return (
    <RootBackgroundContext.Provider value={{ registerRootBackgroundOverride }}>
      <Outlet />
    </RootBackgroundContext.Provider>
  );
};

export default RootBackgroundSync;
