import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';
import Notification from '@/pages/notification/Notification';
import RecordDetail from '@/pages/record/detail/Detail';
import RecordEdit from '@/pages/record/edit/Edit';
import RecordLife from '@/pages/record/life/Life';
import RecordLifeDetail from '@/pages/record/life/LifeDetail';
import RecordLifeEdit from '@/pages/record/life/LifeEdit';
import Record from '@/pages/record/main/Main';
import BaselineInfoSetting from '@/pages/settings/BaselineInfoSetting';
import BowelRhythmSetting from '@/pages/settings/BowelRhythmSetting';
import DeleteAccount from '@/pages/settings/DeleteAccount';
import LoginAccount from '@/pages/settings/LoginAccount';
import PrivacyPolicy from '@/pages/settings/PrivacyPolicy';
import ProfileEdit from '@/pages/settings/ProfileEdit';
import SensitiveConsent from '@/pages/settings/SensitiveConsent';
import Settings from '@/pages/settings/Settings';
import Terms from '@/pages/settings/Terms';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Home } = await import('@/pages/home/Home');

          return { Component: Home };
        },
      },
      {
        path: 'calendar',
        lazy: async () => {
          const { default: Calendar } =
            await import('@/pages/calendar/Calendar');

          return { Component: Calendar };
        },
      },
      {
        path: 'boogle-record/new',
        element: <Record />,
      },
      {
        path: 'boogle-record/edit/:recordId',
        element: <RecordEdit />,
      },
      {
        path: 'life-record/new',
        element: <RecordLife />,
      },
      {
        path: 'life-record/edit/:recordId',
        element: <RecordLifeEdit />,
      },
      {
        path: 'report',
        lazy: async () => {
          const { default: Report } = await import('@/pages/report/Report');

          return { Component: Report };
        },
      },
      {
        path: 'guide',
        lazy: async () => {
          const { default: Guide } = await import('@/pages/guide/Guide');

          return { Component: Guide };
        },
      },
    ],
  },
  {
    path: '/onboarding',
    lazy: async () => {
      const { default: Onboarding } =
        await import('@/pages/onboarding/Onboarding');

      return { Component: Onboarding };
    },
  },
  {
    path: '/login',
    lazy: async () => {
      const { default: Login } = await import('@/pages/login/Login');

      return { Component: Login };
    },
  },
  {
    path: '/onboarding/profile',
    lazy: async () => {
      const { default: Profile } = await import('@/pages/onboarding/Profile');

      return { Component: Profile };
    },
  },
  {
    path: '/record',
    element: <Record />,
  },
  {
    path: '/record/edit',
    element: <RecordEdit />,
  },
  {
    path: '/record/detail',
    element: <RecordDetail />,
  },
  {
    path: '/record/life',
    element: <RecordLife />,
  },
  {
    path: '/record/life/detail',
    element: <RecordLifeDetail />,
  },
  {
    path: '/record/life/edit',
    element: <RecordLifeEdit />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/notifications',
    element: <Notification />,
  },
  {
    path: '/settings/profile',
    element: <ProfileEdit />,
  },
  {
    path: '/settings/bowel-rhythm',
    element: <BowelRhythmSetting />,
  },
  {
    path: '/settings/baseline-info',
    element: <BaselineInfoSetting />,
  },
  {
    path: '/settings/login-account',
    element: <LoginAccount />,
  },
  {
    path: '/settings/sensitive-consent',
    element: <SensitiveConsent />,
  },
  {
    path: '/settings/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/settings/terms',
    element: <Terms />,
  },
  {
    path: '/settings/delete-account',
    element: <DeleteAccount />,
  },
]);
