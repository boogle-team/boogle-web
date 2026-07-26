import { createBrowserRouter } from 'react-router-dom';
import BoogleRecordFormPage from '../pages/boogleRecord/BoogleRecordFormPage';
import LifeRecordFormPage from '../pages/lifeRecord/LifeRecordFormPage';
import Record from '../pages/record/main/Main';
import RecordEdit from '../pages/record/edit/Edit';
import RecordDetail from '../pages/record/detail/Detail';
import RecordLife from '../pages/record/life/Life';
import RecordLifeEdit from '../pages/record/life/LifeEdit';
import Notification from '@/pages/notification/Notification';
import Settings from '@/pages/settings/Settings';
import ProfileEdit from '../pages/settings/ProfileEdit';
import BaselineInfoSetting from '@/pages/settings/BaselineInfoSetting';
import BowelRhythmSetting from '@/pages/settings/BowelRhythmSetting';
import LoginAccount from '@/pages/settings/LoginAccount';
import PrivacyPolicy from '@/pages/settings/PrivacyPolicy';
import SensitiveConsent from '@/pages/settings/SensitiveConsent';
import Terms from '@/pages/settings/Terms';
import DeleteAccount from '@/pages/settings/DeleteAccount';

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
      // TODO: 실제 부글/생활 기록 작성·수정 페이지 구현 후 임시 페이지 컴포넌트를 교체하면 됨.
      {
        path: 'boogle-record/new',
        element: <BoogleRecordFormPage />,
      },
      {
        path: 'boogle-record/edit/:recordId',
        element: <BoogleRecordFormPage />,
      },
      {
        path: 'life-record/new',
        element: <LifeRecordFormPage />,
      },
      {
        path: 'life-record/edit/:recordId',
        element: <LifeRecordFormPage />,
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
