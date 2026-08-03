import { createBrowserRouter } from 'react-router-dom';

import Notification from '@/pages/notification/Notification';
import RecordDetail from '@/pages/record/detail/Detail';
import RecordEdit from '@/pages/record/edit/Edit';
import RecordLife from '@/pages/record/life/Life';
import RecordLifeDetail from '@/pages/record/life/LifeDetail';
import RecordLifeEdit from '@/pages/record/life/LifeEdit';
import Record from '@/pages/record/main/Main';
import Settings from '@/pages/settings/Settings';
import ProfileEdit from '@/pages/settings/ProfileEdit';
import BaselineInfoSetting from '@/pages/settings/BaselineInfoSetting';
import BowelRhythmSetting from '@/pages/settings/BowelRhythmSetting';
import LoginAccount from '@/pages/settings/LoginAccount';
import PrivacyPolicy from '@/pages/settings/PrivacyPolicy';
import SensitiveConsent from '@/pages/settings/SensitiveConsent';
import Terms from '@/pages/settings/Terms';
import DeleteAccount from '@/pages/settings/DeleteAccount';
import ProfileSettingsProvider from '@/pages/settings/contexts/ProfileSettingsProvider';
import {
  loadAppEntryRoute,
  loadHomeRoute,
  loadMainLayoutRoute,
  loadOnboardingProfileRoute,
  loadOnboardingRoute,
} from '@/routes/lazyRouteLoaders';
import ProtectedRoute from '@/routes/ProtectedRoute';

export const Router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        lazy: loadAppEntryRoute,
      },
      {
        path: 'onboarding',
        lazy: loadOnboardingRoute,
      },
      {
        path: 'login',
        lazy: async () => {
          const { default: Login } = await import('@/pages/login/Login');

          return { Component: Login };
        },
      },
      {
        path: 'login/callback',
        lazy: async () => {
          const { default: OAuthCallback } =
            await import('@/pages/login/OAuthCallback');

          return { Component: OAuthCallback };
        },
      },
      {
        path: 'oauth/callback',
        lazy: async () => {
          const { default: OAuthCallback } =
            await import('@/pages/login/OAuthCallback');

          return { Component: OAuthCallback };
        },
      },
      {
        path: 'onboarding/profile',
        lazy: loadOnboardingProfileRoute,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            lazy: loadMainLayoutRoute,
            children: [
              {
                path: 'home',
                lazy: loadHomeRoute,
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
                path: 'report',
                lazy: async () => {
                  const { default: Report } =
                    await import('@/pages/report/Report');

                  return { Component: Report };
                },
              },
              {
                path: 'guide',
                lazy: async () => {
                  const { default: Guide } =
                    await import('@/pages/guide/Guide');

                  return { Component: Guide };
                },
              },
            ],
          },
          {
            path: 'record',
            element: <Record />,
          },
          {
            path: 'record/edit',
            element: <RecordEdit />,
          },
          {
            path: 'record/detail',
            element: <RecordDetail />,
          },
          {
            path: 'record/life',
            element: <RecordLife />,
          },
          {
            path: 'record/life/detail',
            element: <RecordLifeDetail />,
          },
          {
            path: 'record/life/edit',
            element: <RecordLifeEdit />,
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
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'notifications',
            element: <Notification />,
          },
          {
            element: <ProfileSettingsProvider />,
            children: [
              {
                path: 'settings/profile',
                element: <ProfileEdit />,
              },
              {
                path: 'settings/bowel-rhythm',
                element: <BowelRhythmSetting />,
              },
              {
                path: 'settings/baseline-info',
                element: <BaselineInfoSetting />,
              },
            ],
          },
          {
            path: 'settings/login-account',
            element: <LoginAccount />,
          },
          {
            path: 'settings/sensitive-consent',
            element: <SensitiveConsent />,
          },
          {
            path: 'settings/privacy-policy',
            element: <PrivacyPolicy />,
          },
          {
            path: 'settings/terms',
            element: <Terms />,
          },
          {
            path: 'settings/delete-account',
            element: <DeleteAccount />,
          },
        ],
      },
      {
        path: '*',
        lazy: async () => {
          const { default: NotFound } =
            await import('@/shared/components/NotFound');

          return { Component: NotFound };
        },
      },
    ],
  },
]);
