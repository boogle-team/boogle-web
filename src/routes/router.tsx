import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Guide from '../pages/guide/Guide';
import Report from '../pages/report/Report';
import Calendar from '../pages/calendar/Calendar';
import Record from '../pages/record/main/Main';

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
    path: '/record',
    element: <Record />,
  },
]);
