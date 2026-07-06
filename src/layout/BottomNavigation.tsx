import { Plus } from 'lucide-react';
import type { FunctionComponent, SVGProps } from 'react';

import Home from '@/shared/assets/icons/home.svg?react';
import Calendar from '@/shared/assets/icons/calendar.svg?react';
import Report from '@/shared/assets/icons/report.svg?react';
import Guide from '@/shared/assets/icons/guide.svg?react';
import useBottomNavigation from './useBottomNavigation';

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
    handleTabClick,
    handlePlusClick,
    handleModalClose,
  } = useBottomNavigation();

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 z-50 h-[8.31rem] w-full max-w-[430px] -translate-x-1/2 overflow-visible bg-gray-9">
        {/* 피그마에서 추출한 하단 네비게이션 SVG */}
        <svg
          className="absolute inset-x-0 bottom-0 z-10 h-[6.25rem] w-full overflow-visible"
          viewBox="0 0 390 100"
          preserveAspectRatio="none"
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
            d="M389 0C389.552 0 390 0.447715 390 1V99C390 99.5523 389.552 100 389 100H1C0.447715 100 0 99.5523 0 99V1C0 0.447715 0.447715 1.68613e-08 1 0H155.059C157.804 0 159.739 2.71374 159.22 5.40992C158.748 7.86733 158.5 10.4047 158.5 13C158.5 33.9868 175.066 54 195.5 54C215.934 54 232.5 33.9868 232.5 13C232.5 10.4047 232.252 7.86733 231.78 5.40992C231.261 2.71374 233.196 0 235.941 0H389Z"
            fill="#ffffff"
            filter="url(#navBarShadow)"
          />
        </svg>

        {/* 네비게이션 아이템 */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid h-[6.25rem] grid-cols-[1fr_1fr_5rem_1fr_1fr] items-end gap-x-[1.06rem] px-[1.56rem] pb-[1.56rem]">
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
          className="absolute left-1/2 top-[1.13rem] z-30 flex h-[3.75rem] w-[3.75rem] shrink-0 origin-center -translate-x-1/2 items-center justify-center rounded-full bg-orange-6 text-beige-1 transition-all duration-200 ease-out active:-translate-x-1/2 active:scale-[1.067] active:bg-orange-7"
        >
          <Plus className="h-[2rem] w-[2rem]" strokeWidth={3} />
        </button>
      </nav>

      {/* TODO: 배변 기록 바텀 모달 - 실제 모달 컴포넌트로 교체 예정 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30"
          onClick={handleModalClose}
        />
      )}
    </>
  );
};

export default BottomNavigation;
