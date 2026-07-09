import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Guide from '../pages/guide/Guide';
import Report from '../pages/report/Report';
import Calendar from '../pages/calendar/Calendar';

export const Router = createBrowserRouter([
  // TODO: Home 페이지 작성 후 '/' 라우트 복구
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
]);
