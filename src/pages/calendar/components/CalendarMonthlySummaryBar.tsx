import type { CalendarMonthlySummaryTypes } from '@/pages/calendar/types/calendarSummaryTypes';

interface SummaryItemTypes {
  key: keyof CalendarMonthlySummaryTypes;
  label: string;
}

const SUMMARY_ITEMS: SummaryItemTypes[] = [
  { key: 'recordedDayCount', label: '기록' },
  { key: 'noBowelDayCount', label: '배변없음' },
  { key: 'unrecordedDayCount', label: '미기록' },
];

interface CalendarMonthlySummaryBarPropTypes {
  summary: CalendarMonthlySummaryTypes;
}

const CalendarMonthlySummaryBar = ({
  summary,
}: CalendarMonthlySummaryBarPropTypes) => {
  return (
    <ul className="flex w-full items-center justify-between rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
      {SUMMARY_ITEMS.map(({ key, label }) => (
        <li key={key} className="flex flex-1 flex-col items-center gap-0.5">
          <p className="flex items-baseline gap-0.5">
            <span className="display text-orange-6">{summary[key]}</span>
            <span className="label text-gray-7">일</span>
          </p>
          <p className="label text-center text-gray-7">{label}</p>
        </li>
      ))}
    </ul>
  );
};

export default CalendarMonthlySummaryBar;
