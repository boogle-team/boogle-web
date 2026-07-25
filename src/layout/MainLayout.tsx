import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from '@/shared/components/BottomNavigation';

const MainLayout = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isGuideDetailPage = pathname === '/guide' && searchParams.has('id');

  return (
    <div className="min-h-screen">
      <main className={isGuideDetailPage ? '' : 'pb-[10rem]'}>
        <Outlet />
      </main>
      {!isGuideDetailPage && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
