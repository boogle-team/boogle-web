import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Guide from '../pages/guide/Guide';
import Report from '../pages/report/Report';
import Calender from '../pages/calender/Calender';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Login />,
  },
  {
    path: '/mypage',
    element: <Guide />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/guide',
    element: <Guide />,
  },
  {
    path: '/report',
    element: <Report />,
  },
  {
    path: '/calender',
    element: <Calender />,
  },
]);