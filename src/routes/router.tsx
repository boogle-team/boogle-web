import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: MainLayout } = await import('../layout/MainLayout');

      return { Component: MainLayout };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Home } = await import('../pages/home/Home');

          return { Component: Home };
        },
      },
      {
        path: 'calendar',
        lazy: async () => {
          const { default: Calendar } =
            await import('../pages/calendar/Calendar');

          return { Component: Calendar };
        },
      },
      {
        path: 'report',
        lazy: async () => {
          const { default: Report } = await import('../pages/report/Report');

          return { Component: Report };
        },
      },
      {
        path: 'guide',
        lazy: async () => {
          const { default: Guide } = await import('../pages/guide/Guide');

          return { Component: Guide };
        },
      },
    ],
  },
  {
    path: '/onboarding',
    lazy: async () => {
      const { default: Onboarding } =
        await import('../pages/onboarding/Onboarding');

      return { Component: Onboarding };
    },
  },
  {
    path: '/login',
    lazy: async () => {
      const { default: Login } = await import('../pages/login/Login');

      return { Component: Login };
    },
  },
  {
    path: '/onboarding/profile',
    lazy: async () => {
      const { default: Profile } = await import('../pages/onboarding/Profile');

      return { Component: Profile };
    },
  },
  {
    path: '/settings',
    lazy: async () => {
      const { default: Settings } = await import('../pages/settings/Settings');

      return { Component: Settings };
    },
  },
  {
    path: '/notifications',
    lazy: async () => {
      const { default: Notification } =
        await import('../pages/notification/Notification');

      return { Component: Notification };
    },
  },
  {
    path: '/settings/profile',
    lazy: async () => {
      const { default: ProfileEdit } =
        await import('../pages/settings/ProfileEdit');

      return { Component: ProfileEdit };
    },
  },
  {
    path: '/settings/bowel-rhythm',
    lazy: async () => {
      const { default: BowelRhythmSetting } =
        await import('../pages/settings/BowelRhythmSetting');

      return { Component: BowelRhythmSetting };
    },
  },
  {
    path: '/settings/baseline-info',
    lazy: async () => {
      const { default: BaselineInfoSetting } =
        await import('../pages/settings/BaselineInfoSetting');

      return { Component: BaselineInfoSetting };
    },
  },
  {
    path: '/settings/login-account',
    lazy: async () => {
      const { default: LoginAccount } =
        await import('../pages/settings/LoginAccount');

      return { Component: LoginAccount };
    },
  },
  {
    path: '/settings/sensitive-consent',
    lazy: async () => {
      const { default: SensitiveConsent } =
        await import('../pages/settings/SensitiveConsent');

      return { Component: SensitiveConsent };
    },
  },
  {
    path: '/settings/privacy-policy',
    lazy: async () => {
      const { default: PrivacyPolicy } =
        await import('../pages/settings/PrivacyPolicy');

      return { Component: PrivacyPolicy };
    },
  },
  {
    path: '/settings/terms',
    lazy: async () => {
      const { default: Terms } = await import('../pages/settings/Terms');

      return { Component: Terms };
    },
  },
  {
    path: '/settings/delete-account',
    lazy: async () => {
      const { default: DeleteAccount } =
        await import('../pages/settings/DeleteAccount');

      return { Component: DeleteAccount };
    },
  },
]);
