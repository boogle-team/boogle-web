import { Outlet } from 'react-router-dom';
import BottomNavigation from '@/layout/BottomNavigation';

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <main className="pb-24">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
