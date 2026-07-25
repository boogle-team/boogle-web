import MessageBox from '@/pages/home/assets/icons/infoMessageBox.svg?react';
import BarGraph from '@/shared/assets/icons/weekPatternGraph.svg?react';
import SectionTitle from '@/shared/components/tagSection/SectionTitle';
import type { HomeWeeklyPatternTypes } from '../types/homeTypes';

interface WeeklyPatternSectionPropTypes {
  onCardClick: () => void;
  weeklyPattern: HomeWeeklyPatternTypes | null;
}

const WeeklyPatternSection = ({
  onCardClick,
  weeklyPattern,
}: WeeklyPatternSectionPropTypes) => {
  if (!weeklyPattern) {
    return null;
  }

  return (
    <section>
      <SectionTitle icon={<BarGraph />} title="이번 주 패턴" />
      <button
        type="button"
        aria-label="이번 주 패턴 리포트로 이동"
        onClick={onCardClick}
        className="mt-2 w-full rounded-xl border border-orange-3 bg-yellow-1 px-4 py-4 text-left transition active:scale-[0.99]"
      >
        <div className="flex gap-3">
          <MessageBox className="w-5.5 h-5.5 text-orange-6" />
          <div className="min-w-0">
            <h3 className="body-m-bold text-orange-6">{weeklyPattern.label}</h3>
            <p className="caption mt-[0.12rem] text-orange-5">
              {weeklyPattern.description}
            </p>
          </div>
        </div>
      </button>
    </section>
  );
};

export default WeeklyPatternSection;
