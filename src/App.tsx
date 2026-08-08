import { RouterProvider } from 'react-router-dom';

import ForegroundNotificationToast from '@/pages/notification/components/ForegroundNotificationToast';
import { useForegroundNotification } from '@/pages/notification/hooks/useForegroundNotification';
import { Router } from '@/routes/router';
import PwaUpdateToast from '@/shared/components/PwaUpdateToast';
import { usePushTokenSynchronization } from '@/shared/hooks/usePushTokenSynchronization';
import { usePwaUpdatePrompt } from '@/shared/hooks/usePwaUpdatePrompt';

import '@/App.css';

const App = () => {
  usePushTokenSynchronization();

  const { foregroundNotification, dismissForegroundNotification } =
    useForegroundNotification();

  const { needRefresh, handleUpdateApply, handleUpdateDismiss } =
    usePwaUpdatePrompt();

  return (
    <div className="app">
      <RouterProvider router={Router} />
      <ForegroundNotificationToast
        notification={foregroundNotification}
        onDismiss={dismissForegroundNotification}
      />
      <PwaUpdateToast
        needRefresh={needRefresh}
        onApply={handleUpdateApply}
        onDismiss={handleUpdateDismiss}
      />
    </div>
  );
};

export default App;
