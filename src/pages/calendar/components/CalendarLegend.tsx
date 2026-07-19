import { CALENDAR_MARK_CONFIG, CALENDAR_MARK_ORDER } from '../constants/calendarMarkConfig';

const CalendarLegend = () => {
  return (
    <ul className="flex justify-center gap-4 pb-6">
      {CALENDAR_MARK_ORDER.map((markType) => {
        const { label, dotClassName } = CALENDAR_MARK_CONFIG[markType];

        return (
          <li key={markType} className="flex items-center gap-2">
            <span className={`h-3.5 w-3.5 shrink-0 rounded-full ${dotClassName}`} />
            <span className="caption text-gray-8">{label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarLegend;
