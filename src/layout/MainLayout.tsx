import { Outlet, useLocation } from 'react-router-dom';

import { isGuideDetailLocation } from '@/pages/guide/utils/guideRouteUtils';
import BottomNavigation from '@/shared/components/BottomNavigation';

const MainLayout = () => {
  const { pathname, search } = useLocation();
  const isGuideDetailPage = isGuideDetailLocation({ pathname, search });
  const isRecordFormPage =
    pathname.startsWith('/boogle-record/') ||
    pathname.startsWith('/life-record/');
  const isBottomNavigationHidden = isGuideDetailPage || isRecordFormPage;

  return (
    <div className="min-h-screen">
      <main
        className={
          isBottomNavigationHidden
            ? ''
            : 'pb-[var(--bottom-navigation-page-space)]'
        }
      >
        <Outlet />
      </main>
      {!isBottomNavigationHidden && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
