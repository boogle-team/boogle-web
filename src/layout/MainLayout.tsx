import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from '@/shared/components/BottomNavigation';

const MainLayout = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isGuideDetailPage = pathname === '/guide' && searchParams.has('id');
  const isRecordFormPage =
    pathname.startsWith('/boogle-record/') ||
    pathname.startsWith('/life-record/');
  const isBottomNavigationHidden = isGuideDetailPage || isRecordFormPage;

  return (
    <div className="min-h-screen">
      <main className={isBottomNavigationHidden ? '' : 'pb-[calc(var(--bottom-navigation-page-space)+var(--safe-area-bottom))]'}>
        <Outlet />
      </main>
      {!isBottomNavigationHidden && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
