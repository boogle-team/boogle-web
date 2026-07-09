import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Guide from '../pages/guide/Guide';
import Report from '../pages/report/Report';
import Calender from '../pages/calender/Calender';

export const Router = createBrowserRouter([
  // TODO: Home 페이지 작성 후 '/' 라우트 복구
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
