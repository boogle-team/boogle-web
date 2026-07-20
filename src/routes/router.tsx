import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import BoogleRecordFormPage from '../pages/boogleRecord/BoogleRecordFormPage';
import Calendar from '../pages/calendar/Calendar';
import Guide from '../pages/guide/Guide';
import Home from '../pages/home/Home';
import LifeRecordFormPage from '../pages/lifeRecord/LifeRecordFormPage';
import Login from '../pages/login/Login';
import Report from '../pages/report/Report';

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
]);
