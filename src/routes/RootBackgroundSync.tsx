import { Outlet, useLocation } from 'react-router-dom';

import useRootBackgroundColor from '@/shared/hooks/useRootBackgroundColor';

const ROOT_BACKGROUND_COLORS = {
  ORANGE_6: 'var(--color-orange-6)',
  BEIGE_1: 'var(--color-beige-1)',
  BEIGE_2: 'var(--color-beige-2)',
  BEIGE_4: 'var(--color-beige-4)',
  BEIGE_5: 'var(--color-beige-5)',
  BEIGE_6: 'var(--color-beige-6)',
} as const;

const getRootBackgroundColor = (pathname: string) => {
  if (pathname === '/') {
    return ROOT_BACKGROUND_COLORS.ORANGE_6;
  }

  if (pathname === '/onboarding') {
    return ROOT_BACKGROUND_COLORS.BEIGE_4;
  }

  if (
    pathname === '/login' ||
    pathname === '/login/callback' ||
    pathname === '/oauth/callback'
  ) {
    return ROOT_BACKGROUND_COLORS.BEIGE_5;
  }

  if (
    pathname === '/calendar' ||
    pathname === '/report' ||
    pathname === '/guide' ||
    pathname === '/settings' ||
    pathname === '/notifications'
  ) {
    return ROOT_BACKGROUND_COLORS.BEIGE_5;
  }

  if (
    pathname === '/settings/profile' ||
    pathname === '/settings/bowel-rhythm' ||
    pathname === '/settings/baseline-info' ||
    pathname === '/settings/login-account' ||
    pathname === '/settings/sensitive-consent' ||
    pathname === '/settings/privacy-policy' ||
    pathname === '/settings/terms' ||
    pathname === '/settings/delete-account'
  ) {
    return ROOT_BACKGROUND_COLORS.BEIGE_2;
  }

  if (
    pathname === '/home' ||
    pathname === '/boogle-record/new' ||
    pathname === '/boogle-record/detail' ||
    pathname.startsWith('/boogle-record/edit/') ||
    pathname === '/life-record/new' ||
    pathname === '/life-record/detail' ||
    pathname.startsWith('/life-record/edit/')
  ) {
    return ROOT_BACKGROUND_COLORS.BEIGE_1;
  }

  return ROOT_BACKGROUND_COLORS.BEIGE_5;
};

const RootBackgroundSync = () => {
  const { pathname } = useLocation();

  useRootBackgroundColor(getRootBackgroundColor(pathname));

  return <Outlet />;
};

export default RootBackgroundSync;
