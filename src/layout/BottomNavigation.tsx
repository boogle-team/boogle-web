import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { FunctionComponent, SVGProps } from 'react';
import Home from '@/shared/assets/icons/home.svg?react';
import Calendar from '@/shared/assets/icons/calendar.svg?react';
import Report from '@/shared/assets/icons/report.svg?react';
import Guide from '@/shared/assets/icons/guide.svg?react';

interface NavItemTypes {
  label: string;
  path: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItemTypes[] = [
  { label: '홈', path: '/', Icon: Home },
  { label: '캘린더', path: '/calender', Icon: Calendar },
  { label: '리포트', path: '/report', Icon: Report },
  { label: '가이드', path: '/guide', Icon: Guide },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-around rounded-t-[0.125rem] bg-beige-1 px-2 pb-2 pt-3 shadow-md">
      {NAV_ITEMS.slice(0, 2).map(({ label, path, Icon }) => {
        const isActive = pathname === path;

        return (
          <button
            key={path}
            type="button"
            onClick={() => handleTabClick(path)}
            className={`flex flex-1 flex-col items-center gap-1 transition-colors active:text-orange-6 ${
              isActive ? 'text-orange-6' : 'text-gray-5'
            }`}
          >
            <Icon className="h-[2rem] w-[2rem]" />
            <span className="caption">{label}</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={handlePlusClick}
        aria-label="배변 기록 추가"
        className="flex h-[3.5rem] w-[3.5rem] -translate-y-4 items-center justify-center rounded-full bg-orange-6 text-beige-1 shadow-md transition-colors active:bg-orange-7"
      >
        <Plus className="h-[1.4rem] w-[1.4rem]" />
      </button>

      {NAV_ITEMS.slice(2).map(({ label, path, Icon }) => {
        const isActive = pathname === path;

        return (
          <button
            key={path}
            type="button"
            onClick={() => handleTabClick(path)}
            className={`flex flex-1 flex-col items-center gap-1 transition-colors active:text-orange-6 ${
              isActive ? 'text-orange-6' : 'text-gray-5'
            }`}
          >
            <Icon className="h-[2rem] w-[2rem]" />
            <span className="caption">{label}</span>
          </button>
        );
      })}

      {/* TODO: 배변 기록 바텀 모달 - 실제 모달 컴포넌트로 교체 예정 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30"
          onClick={() => setIsModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default BottomNavigation;
