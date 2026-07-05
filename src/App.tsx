import { RouterProvider } from 'react-router-dom';
import { Router } from './routes/router';

function App() {
  return (
    <div className="mx-auto min-h-dvh w-full min-w-[320px] max-w-[430px] overflow-x-hidden shadow-[0_0_40px_rgba(0,0,0,0.15)]">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
