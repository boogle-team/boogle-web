import MessageBox from '@/pages/home/assets/icons/infoMessageBox.svg?react';
import BarGraph from '@/shared/assets/icons/weekPatternGraph.svg?react';
import SectionTitle from '@/shared/components/tagSection/SectionTitle';
import type { HomeWeeklyPatternTypes } from '../types/homeTypes';

interface WeeklyPatternSectionPropTypes {
  weeklyPattern: HomeWeeklyPatternTypes | null;
}

const WeeklyPatternSection = ({
  weeklyPattern,
}: WeeklyPatternSectionPropTypes) => {
  if (!weeklyPattern) {
    return null;
  }

  return (
    <section>
      <SectionTitle icon={<BarGraph />} title="이번 주 패턴" />
      <article className="mt-2 rounded-xl border border-orange-3 bg-yellow-1 px-4 py-4">
        <div className="flex gap-3">
          <MessageBox className="w-5.5 h-5.5 text-orange-6" />
          <div className="min-w-0">
            <h3 className="body-m-bold text-orange-6">{weeklyPattern.label}</h3>
            <p className="caption mt-[0.12rem] text-orange-5">
              {weeklyPattern.description}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default WeeklyPatternSection;
