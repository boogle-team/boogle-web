import { RouterProvider } from 'react-router-dom';

import ForegroundNotificationToast from '@/pages/notification/components/ForegroundNotificationToast';
import { useForegroundNotification } from '@/pages/notification/hooks/useForegroundNotification';
import { Router } from '@/routes/router';
import { usePushTokenSynchronization } from '@/shared/hooks/usePushTokenSynchronization';

import '@/App.css';

const App = () => {
  usePushTokenSynchronization();

  const { foregroundNotification, dismissForegroundNotification } =
    useForegroundNotification();

  return (
    <div className="app">
      <RouterProvider router={Router} />
      <ForegroundNotificationToast
        notification={foregroundNotification}
        onDismiss={dismissForegroundNotification}
      />
    </div>
  );
};

export default App;
