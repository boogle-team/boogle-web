import { RouterProvider } from 'react-router-dom';

import { Router } from '@/routes/router';

import '@/App.css';

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
