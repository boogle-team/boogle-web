import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Guide from '../pages/guide/Guide';
import Report from '../pages/report/Report';
import Calendar from '../pages/calendar/Calendar';
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
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'report',
        element: <Report />,
      },
      {
        path: 'guide',
        element: <Guide />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
