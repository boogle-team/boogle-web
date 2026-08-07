export const loadAppEntryRoute = async () => {
  const { default: AppEntry } = await import('@/pages/appEntry/AppEntry');

  return { Component: AppEntry };
};

export const loadMainLayoutRoute = async () => {
  const { default: MainLayout } = await import('@/layout/MainLayout');

  return { Component: MainLayout };
};

export const loadHomeRoute = async () => {
  const { default: Home } = await import('@/pages/home/Home');

  return { Component: Home };
};

export const loadOnboardingRoute = async () => {
  const { default: Onboarding } = await import('@/pages/onboarding/Onboarding');

  return { Component: Onboarding };
};

export const loadOnboardingProfileRoute = async () => {
  const { default: Profile } = await import('@/pages/onboarding/Profile');

  return { Component: Profile };
};
