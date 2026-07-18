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
    path: '/login',
    lazy: async () => {
      const { default: Login } = await import('../pages/login/Login');

      return { Component: Login };
    },
  },
]);
