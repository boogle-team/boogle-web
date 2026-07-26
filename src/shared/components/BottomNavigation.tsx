import { Plus } from 'lucide-react';
import type { FunctionComponent, SVGProps } from 'react';

import Home from '@/shared/assets/icons/home.svg?react';
import Calendar from '@/shared/assets/icons/calendar.svg?react';
import Report from '@/shared/assets/icons/report.svg?react';
import Guide from '@/shared/assets/icons/guide.svg?react';
import RecordBottomSheet from '@/shared/components/recordBottomSheet/RecordBottomSheet';
import useBottomNavigation from '@/shared/hooks/useBottomNavigation';
import {
  createNavBarPath,
  NAV_BAR_HEIGHT,
} from '@/shared/components/navBarPath';

interface NavItemTypes {
  label: string;
  path: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItemTypes[] = [
  {
    label: '홈',
    path: '/',
    Icon: Home,
  },
  {
    label: '캘린더',
    path: '/calendar',
    Icon: Calendar,
  },
  {
    label: '리포트',
    path: '/report',
    Icon: Report,
  },
  {
    label: '가이드',
    path: '/guide',
    Icon: Guide,
  },
];

// 중앙 + 버튼이 놓이는 3번째 열은 비워두므로, 해당 열 이후 아이템은 한 칸씩 밀어 배치한다.
const CENTER_COLUMN_INDEX = 2;

const getColumnStart = (index: number) =>
  index < CENTER_COLUMN_INDEX ? index + 1 : index + 2;

const BottomNavigation = () => {
  const {
    pathname,
    isModalOpen,
    navRef,
    navWidth,
    handleTabClick,
    handlePlusClick,
    handleModalClose,
    handleRecordSelectClick,
  } = useBottomNavigation();

  return (
    <>
      <nav
        ref={navRef}
        className="fixed bottom-0 left-1/2 z-50 h-[8.31rem] w-full max-w-[430px] -translate-x-1/2 overflow-visible"
      >
        {/* 실제 렌더 폭에 맞춰 생성한 하단 네비게이션 실루엣 (노치 곡률은 폭과 무관하게 고정) */}
        {navWidth > 0 && (
          <svg
            className="absolute inset-x-0 bottom-0 z-10 h-[6.25rem] w-full overflow-visible"
            viewBox={`0 0 ${navWidth} ${NAV_BAR_HEIGHT}`}
            aria-hidden="true"
          >
            <defs>
              <filter
                id="navBarShadow"
                x="-20%"
                y="-40%"
                width="140%"
                height="180%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="6"
                  floodColor="#f3e2d1"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>

            <path
              d={createNavBarPath(navWidth)}
              fill="#ffffff"
              filter="url(#navBarShadow)"
            />
          </svg>
        )}

        {/* 네비게이션 아이템 */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid h-[6.25rem] grid-cols-[1fr_1fr_5rem_1fr_1fr] items-end gap-x-[1.06rem] px-[1.56rem] pb-[2.13rem]">
          {NAV_ITEMS.map(({ label, path, Icon }, index) => {
            const isActive = pathname === path;

            return (
              <button
                key={path}
                type="button"
                onClick={() => handleTabClick(path)}
                aria-current={isActive ? 'page' : undefined}
                style={{ gridColumnStart: getColumnStart(index) }}
                className={`flex flex-col items-center gap-[0.25rem] transition-colors active:text-orange-6 ${
                  isActive ? 'text-orange-6' : 'text-gray-5'
                }`}
              >
                <Icon className="h-[2rem] w-[2rem]" />
                <span className="caption">{label}</span>
              </button>
            );
          })}
        </div>

        {/* 중앙 + 버튼 */}
        <button
          type="button"
          onClick={handlePlusClick}
          aria-label="배변 기록 추가"
          className="absolute inset-x-0 top-[1.13rem] z-30 mx-auto flex h-[3.75rem] w-[3.75rem] shrink-0 origin-center items-center justify-center rounded-full bg-orange-6 text-beige-1 transition-all duration-200 ease-out active:scale-[1.067] active:bg-orange-7"
        >
          <Plus className="h-[2rem] w-[2rem]" strokeWidth={3} />
        </button>
      </nav>
      <RecordBottomSheet
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSelect={handleRecordSelectClick}
      />
    </>
  );
};

export default BottomNavigation;
