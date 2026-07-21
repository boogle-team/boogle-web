import ClockIcon from '../assets/icons/ClockIcon';
import { BOWEL_RHYTHMS } from '../constants/reportConstants';
import RhythmStatusIcon from '../assets/icons/RhythmStatusIcon';

const BOWEL_RHYTHM_DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const BowelRhythmCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">배변 리듬</h2>
    <div className="mt-4 grid grid-cols-7 text-center">
      {BOWEL_RHYTHMS.map(({ status }, index) => {
        const day = BOWEL_RHYTHM_DAYS[index];

        return (
          <div key={day} className="flex flex-col items-center gap-2">
            <span
              className={`micro-bold ${
                day === '토'
                  ? 'text-semantic-saturday'
                  : day === '일'
                    ? 'text-semantic-sunday'
                    : 'text-gray-7'
              }`}
            >
              {day}
            </span>
            <span className="flex h-8 w-8 items-center justify-center">
              <RhythmStatusIcon status={status} />
            </span>
          </div>
        );
      })}
    </div>
    <div className="mt-4 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2">
      <span className="flex h-5 w-5 items-center justify-center">
        <ClockIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
      </span>
      <p className="caption whitespace-nowrap tracking-[-0.015rem] text-gray-8">
        최근 2주{' '}
        <strong className="caption-bold tracking-[-0.015rem] text-semantic-danger">
          오전 8~10시
        </strong>
        에 가장 많아요
      </p>
    </div>
  </section>
);

export default BowelRhythmCard;
