import Home from '@/shared/assets/icons/home.svg?react';
import Calendar from '@/shared/assets/icons/calendar.svg?react';
import Report from '@/shared/assets/icons/report.svg?react';
import Guide from '@/shared/assets/icons/guide.svg?react';
import { Plus } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <div>
      <Home className="text-gray-5 w-[2rem] h-[2rem]" />
      <Calendar className="text-gray-5 w-[2rem] h-[2rem]" />
      <Plus className="w-[1.4rem] h-[1.4rem] text-beige-1" />
      <Report className="text-gray-5 w-[2rem] h-[2rem]" />
      <Guide className="text-gray-5 w-[2rem] h-[2rem]" />
    </div>
  );
};

export default BottomNavigation;
