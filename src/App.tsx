import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/router';
import ProfileSettingsProvider from './pages/settings/contexts/ProfileSettingsProvider';
import ForegroundNotificationToast from './pages/notification/components/ForegroundNotificationToast';
import { useForegroundNotification } from './pages/notification/hooks/useForegroundNotification';
import { usePushTokenSynchronization } from './shared/hooks/usePushTokenSynchronization';
import './App.css';

function App() {
  usePushTokenSynchronization();

  const { foregroundNotification, dismissForegroundNotification } =
    useForegroundNotification();

  return (
    <div className="app">
      <ProfileSettingsProvider>
        <RouterProvider router={Router} />
        <ForegroundNotificationToast
          notification={foregroundNotification}
          onDismiss={dismissForegroundNotification}
        />
      </ProfileSettingsProvider>
    </div>
  );
}

export default App;
