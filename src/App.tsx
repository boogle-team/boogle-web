import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/router';
import ProfileSettingsProvider from './pages/settings/contexts/ProfileSettingsProvider';
import './App.css';

function App() {
  return (
    <div className="app">
      <ProfileSettingsProvider>
        <RouterProvider router={Router} />
      </ProfileSettingsProvider>
    </div>
  );
}

export default App;
