import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';
import MonthlyTypeCard, {
  MonthlyTypePreview,
} from './components/MonthlyTypeCard';
import InsufficientReportBody from './components/InsufficientReportBody';
import {
  BASE_REPORT_DATE,
  BOWEL_RHYTHMS,
  CONDITION_PROGRESS,
  MODE_OPTIONS,
  MONTHLY_PATTERNS,
  MONTHLY_SCORES,
  MONTHLY_SUMMARIES,
  WEEKLY_PATTERNS,
  WEEKLY_SUMMARIES,
  WEEKLY_TRENDS,
} from './constants/reportConstants';
import type {
  BowelRhythmTypes,
  PatternTypes,
  ReportModeTypes,
  ReportPeriodTextTypes,
  ReportSummaryTypes,
} from './types/reportTypes';
import { addDays, addMonths, getPeriodText } from './utils/reportPeriodUtils';

const Report = () => {
  const [currentPeriodDate, setCurrentPeriodDate] =
    useState<Date>(BASE_REPORT_DATE);
  const [selectedMode, setSelectedMode] = useState<ReportModeTypes>('weekly');
  const isWeeklyReport = selectedMode === 'weekly';
  const isMonthlyTypePreview =
    new URLSearchParams(window.location.search).get('preview') ===
    'monthly-types';
  const isInsufficientReportPreview =
    new URLSearchParams(window.location.search).get('preview') ===
    'insufficient';
  const periodText = getPeriodText(selectedMode, currentPeriodDate);

  const handleModeClick = (mode: ReportModeTypes) => {
    setSelectedMode(mode);
  };

  const handlePreviousPeriodClick = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, -7) : addMonths(previousDate, -1),
    );
  };

  const handleNextPeriodClick = () => {
    setCurrentPeriodDate((previousDate) =>
      isWeeklyReport ? addDays(previousDate, 7) : addMonths(previousDate, 1),
    );
  };

  const handlePdfButtonClick = () => {
    window.print();
  };

  if (isMonthlyTypePreview) {
    return <MonthlyTypePreview />;
  }

  return (
    <section className="-mb-[10rem] min-h-screen bg-beige-5 pb-[10rem] text-gray-10">
      <div className="bg-beige-5">
        <div className="h-10" />
        <DefaultTopNavigation
          title="리포트"
          isBackButtonVisible={false}
          isBorderVisible={false}
          className="bg-beige-5"
        />
      </div>

      <div className="border-t border-beige-7 bg-beige-5 px-layout pb-6 pt-3">
        <ReportModeTabs
          selectedMode={selectedMode}
          onModeClick={handleModeClick}
        />

        <ReportPeriodNavigator
          periodText={periodText}
          onNextClick={handleNextPeriodClick}
          onPreviousClick={handlePreviousPeriodClick}
        />

        {isInsufficientReportPreview ? (
          <InsufficientReportBody selectedMode={selectedMode} />
        ) : isWeeklyReport ? (
          <WeeklyReportBody />
        ) : (
          <MonthlyReportBody onPdfButtonClick={handlePdfButtonClick} />
        )}
      </div>
    </section>
  );
};

interface ReportModeTabsPropTypes {
  onModeClick: (mode: ReportModeTypes) => void;
  selectedMode: ReportModeTypes;
}

const ReportModeTabs = ({
  onModeClick,
  selectedMode,
}: ReportModeTabsPropTypes) => (
  <div className="grid grid-cols-2 text-center">
    {MODE_OPTIONS.map(({ label, value }) => {
      const isSelected = selectedMode === value;

      return (
        <button
          key={value}
          type="button"
          onClick={() => onModeClick(value)}
          className={`caption relative h-8 ${
            isSelected ? 'text-orange-6' : 'text-gray-6'
          }`}
        >
          {label}
          {isSelected && (
            <span className="absolute bottom-0 left-1/2 h-px w-16 -translate-x-1/2 bg-orange-6" />
          )}
        </button>
      );
    })}
  </div>
);

interface ReportPeriodNavigatorPropTypes {
  onNextClick: () => void;
  onPreviousClick: () => void;
  periodText: ReportPeriodTextTypes;
}

const ReportPeriodNavigator = ({
  onNextClick,
  onPreviousClick,
  periodText,
}: ReportPeriodNavigatorPropTypes) => (
  <section className="relative mt-3 flex items-end justify-center text-center">
    <button
      type="button"
      aria-label="이전 기간"
      onClick={onPreviousClick}
      className="absolute left-[3.25rem] bottom-1 flex h-6 w-6 items-center justify-center text-gray-7"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>

    <div>
      {periodText.title && (
        <p className="micro text-gray-7">{periodText.title}</p>
      )}
      <p className="caption-bold text-gray-9">{periodText.description}</p>
    </div>

    <button
      type="button"
      aria-label="다음 기간"
      onClick={onNextClick}
      className="absolute right-[3.25rem] bottom-1 flex h-6 w-6 items-center justify-center text-gray-7"
    >
      <ChevronRight className="h-4 w-4" />
    </button>

    <div className="absolute right-0 top-1 h-px w-[5.75rem] border-t border-dashed border-gray-6" />
  </section>
);

const WeeklyReportBody = () => (
  <div className="mt-4 flex flex-col gap-5">
    <SummaryCards summaries={WEEKLY_SUMMARIES} showDescription />
    <ConditionDistributionCard />
    <BowelRhythmCard />
    <PatternCard patterns={WEEKLY_PATTERNS} title="감지된 패턴" />
    <LifeGuideCard />
    <p className="caption-reg text-center text-gray-6">
      월간 리포트에서 PDF로 저장할 수 있어요
    </p>
  </div>
);

interface MonthlyReportBodyPropTypes {
  onPdfButtonClick: () => void;
}

const MonthlyReportBody = ({
  onPdfButtonClick,
}: MonthlyReportBodyPropTypes) => (
  <div className="mt-4 flex flex-col gap-4">
    <MonthlyConditionScoreCard />
    <SummaryCards summaries={MONTHLY_SUMMARIES} showDescription={false} />
    <MonthlyWeeklyTrendCard />
    <ConditionDistributionCard />
    <MonthlyTypeCard />
    <PatternCard patterns={MONTHLY_PATTERNS} title="이번 달 패턴" />
    <button
      type="button"
      onClick={onPdfButtonClick}
      className="caption-bold h-12 rounded-xl bg-orange-2 text-orange-6"
    >
      이번 달 리포트 PDF 저장
    </button>
  </div>
);

interface SummaryCardsPropTypes {
  showDescription: boolean;
  summaries: ReportSummaryTypes[];
}

const SummaryCards = ({
  showDescription,
  summaries,
}: SummaryCardsPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <div className="grid grid-cols-3 divide-x divide-beige-7">
      {summaries.map(({ description, label, value }) => (
        <article
          key={label}
          className="flex min-h-[3.75rem] flex-col items-center justify-center text-center"
        >
          <strong className="body-m-bold text-gray-10">
            <SummaryValue value={value} />
          </strong>
          <span className="micro mt-1 text-gray-7">{label}</span>
          {showDescription && (
            <span className="micro text-orange-6">{description}</span>
          )}
        </article>
      ))}
    </div>
  </section>
);

const SummaryValue = ({ value }: { value: string }) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return value;
  }

  const [, number, unit] = match;

  return (
    <>
      <span className="text-orange-6">{number}</span>
      {unit}
    </>
  );
};

const MonthlyConditionScoreCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <div className="grid grid-cols-[4.75rem_1fr] items-center gap-3">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <MonthlyScoreRingIcon />
        <span className="caption-bold absolute text-orange-6">46%</span>
      </div>
      <div>
        <h2 className="caption-bold text-gray-10">부글 컨디션 점수</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {MONTHLY_SCORES.map(({ label, value }) => (
            <div
              key={label}
              className="grid grid-cols-[4.25rem_1fr_2rem] items-center gap-2"
            >
              <span className="micro text-gray-7">{label}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-4">
                <div
                  className="h-full rounded-full bg-orange-6"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="micro text-right text-gray-7">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MonthlyScoreRingIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M40.0008 12.549C36.1558 12.549 32.3537 13.3568 28.8408 14.9199C25.3279 16.4831 22.1823 18.767 19.6083 21.6234C17.0343 24.4797 15.0891 27.8448 13.8986 31.5008C12.7082 35.1569 12.2993 39.0226 12.698 42.8469C13.0968 46.6711 14.2942 50.3691 16.2133 53.7009C18.1323 57.0328 20.7302 59.9242 23.8381 62.1882C26.9459 64.452 30.4946 66.0378 34.2544 66.8427C38.0142 67.6476 41.9014 67.6535 45.6637 66.8603L48.0905 78.3723C42.7158 79.5054 37.1631 79.4964 31.7919 78.3466C26.4207 77.1968 21.3508 74.9317 16.911 71.6976C12.4712 68.4634 8.76027 64.3323 6.01875 59.5725C3.27727 54.8127 1.56618 49.5299 0.996549 44.0666C0.426944 38.6034 1.01161 33.0814 2.71223 27.8584C4.41288 22.6355 7.19188 17.8282 10.869 13.7477C14.5462 9.6672 19.0395 6.4044 24.0579 4.17127C28.9195 2.00797 34.1689 0.857565 39.4861 0.787772L40.0008 0.784323C49.6973 0.784323 59.0502 4.37657 66.2534 10.8678C73.4566 17.359 77.9994 26.289 79.005 35.9332C80.0105 45.5774 77.4075 55.2522 71.6984 63.0897C65.9892 70.9272 57.5785 76.3716 48.0905 78.3719L45.6637 66.8603C52.3052 65.4601 58.1925 61.6489 62.189 56.1626C66.1854 50.6763 68.0078 43.9039 67.3039 37.153C66.6 30.4021 63.4196 24.1513 58.3773 19.6074C53.4139 15.1347 46.9927 12.6282 40.319 12.5509L40.0008 12.549Z"
      fill="#F9F7F5"
    />
    <path
      d="M46.703 71.8531C47.4689 75.4861 51.0683 77.8632 54.5174 76.4887C61.3454 73.7676 67.3166 69.1627 71.6974 63.1488C77.4066 55.3113 80.0097 45.6364 79.0041 35.9922C77.9985 26.348 73.4556 17.4182 66.2524 10.927C60.7253 5.94621 53.9326 2.67215 46.6901 1.41817C43.0317 0.784759 40 3.85326 40 7.5661C40 10.3507 42.276 12.5612 45.0138 13.0698C49.9595 13.9886 54.5919 16.256 58.3767 19.6666C63.4189 24.2105 66.599 30.4613 67.3029 37.2123C68.0068 43.9632 66.1846 50.7356 62.1882 56.2219C59.1884 60.3399 55.1233 63.5142 50.4736 65.4335C47.8996 66.4959 46.1285 69.1284 46.703 71.8531Z"
      fill="#FF8C61"
    />
  </svg>
);

const MonthlyWeeklyTrendCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">주간 컨디션 점수</h2>
    <div className="mt-3 flex flex-col gap-3">
      {WEEKLY_TRENDS.map(({ count, week }) => (
        <div
          key={week}
          className="grid grid-cols-[1.5rem_1fr_2rem] items-center gap-2"
        >
          <span className="micro text-gray-7">{week}</span>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-4">
            <div className="h-full w-3/5 rounded-full bg-orange-6" />
          </div>
          <span className="micro text-right text-gray-7">{count}회</span>
        </div>
      ))}
    </div>
  </section>
);

const ConditionDistributionCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">변 상태 분포</h2>
    <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-gray-4">
      {CONDITION_PROGRESS.map(({ colorClassName, label, value }) => (
        <div
          key={label}
          className={colorClassName}
          style={{ width: `${value}%` }}
        />
      ))}
    </div>
    <div className="mt-3 grid grid-cols-3">
      {CONDITION_PROGRESS.map(({ colorClassName, label, value }) => (
        <div key={label} className="flex items-center justify-center gap-1">
          <span className={`h-2 w-2 rounded-full ${colorClassName}`} />
          <span className="micro text-gray-7">
            {label} {value}%
          </span>
        </div>
      ))}
    </div>
  </section>
);

const BowelRhythmCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">배변 리듬</h2>
    <div className="mt-4 grid grid-cols-7 text-center">
      {BOWEL_RHYTHMS.map(({ day, status }) => (
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
      ))}
    </div>
    <div className="mt-4 flex items-center justify-center gap-2 rounded-md bg-orange-1 py-2">
      <span className="flex h-5 w-5 items-center justify-center">
        <ClockIcon />
      </span>
      <p className="micro text-gray-7">
        최근 2주 <span className="text-orange-6">오전 8~10시</span>에 가장
        많아요
      </p>
    </div>
  </section>
);

interface PatternCardPropTypes {
  patterns: PatternTypes[];
  title: string;
}

const PatternCard = ({ patterns, title }: PatternCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">{title}</h2>
    <div className="mt-3 flex flex-col">
      {patterns.map(({ description, icon, title: patternTitle }, index) => (
        <article
          key={patternTitle}
          className={`grid grid-cols-[2rem_1fr] gap-3 py-2 ${
            index > 0 ? 'border-t border-beige-7' : ''
          }`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md">
            {icon === 'check' && <PatternCheckIcon />}
            {icon === 'warning' && <PatternWarningIcon />}
            {icon === 'danger' && <PatternDangerIcon />}
          </div>
          <div>
            <h3 className="caption-bold text-gray-10">{patternTitle}</h3>
            <p className="micro mt-1 text-gray-7">{description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const LifeGuideCard = () => (
  <section className="rounded-xl border border-orange-4 bg-orange-1 px-4 py-4">
    <h2 className="caption-bold text-gray-9">생활 가이드</h2>
    <article className="mt-3">
      <h3 className="caption-bold text-semantic-danger">
        수분 섭취와 딱딱한 변
      </h3>
      <p className="micro mt-1 text-gray-8">
        하루 물 6~8잔을 목표로 해보세요. 딱딱한 변이 개선될 수 있어요.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="caption-bold h-8 rounded-full bg-orange-6 text-beige-1"
        >
          도움이 됐어요
        </button>
        <button
          type="button"
          className="caption-bold h-8 rounded-full border border-gray-5 bg-beige-1 text-gray-7"
        >
          이미 해요
        </button>
      </div>
    </article>
  </section>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="20" height="20" rx="10" fill="#FFB79B" />
    <g clipPath="url(#clockIconClipPath)">
      <path
        d="M13.0001 4.80369C13.9051 5.3262 14.6579 6.07601 15.184 6.97887C15.7102 7.88174 15.9914 8.90635 15.9998 9.95129C16.0082 10.9962 15.7436 12.0253 15.2322 12.9365C14.7207 13.8478 13.9801 14.6096 13.0837 15.1467C12.1872 15.6837 11.1661 15.9774 10.1213 15.9985C9.07656 16.0197 8.04438 15.7676 7.12697 15.2672C6.20956 14.7669 5.43874 14.0356 4.89081 13.1458C4.34288 12.256 4.03685 11.2385 4.003 10.1941L4 9.99969L4.003 9.80529C4.0366 8.76908 4.33813 7.75927 4.87819 6.87429C5.41826 5.98931 6.17842 5.25936 7.08457 4.75562C7.99073 4.25188 9.01195 3.99153 10.0487 3.99995C11.0854 4.00838 12.1023 4.28529 13.0001 4.80369ZM10.0001 6.39969C9.85311 6.39971 9.71127 6.45366 9.60145 6.55132C9.49162 6.64898 9.42146 6.78354 9.40427 6.92949L9.40007 6.99969V9.99969L9.40547 10.0783C9.41915 10.1824 9.4599 10.2811 9.52367 10.3645L9.57587 10.4245L11.3759 12.2245L11.4323 12.2737C11.5375 12.3553 11.6669 12.3996 11.8001 12.3996C11.9333 12.3996 12.0627 12.3553 12.1679 12.2737L12.2243 12.2239L12.2741 12.1675C12.3557 12.0623 12.4001 11.9329 12.4001 11.7997C12.4001 11.6665 12.3557 11.5371 12.2741 11.4319L12.2243 11.3755L10.6001 9.75069V6.99969L10.5959 6.92949C10.5787 6.78354 10.5085 6.64898 10.3987 6.55132C10.2889 6.45366 10.147 6.39971 10.0001 6.39969Z"
        fill="#FFF4EF"
      />
    </g>
    <defs>
      <clipPath id="clockIconClipPath">
        <rect
          width="12"
          height="12"
          fill="white"
          transform="translate(4 3.99976)"
        />
      </clipPath>
    </defs>
  </svg>
);

const RhythmStatusIcon = ({
  status,
}: {
  status: BowelRhythmTypes['status'];
}) => {
  if (status === 'empty') {
    return (
      <span className="h-8 w-8 rounded-full border border-dashed border-beige-8 bg-beige-1" />
    );
  }

  const fillColor = {
    normal: '#FFA17D',
    warning: '#F5C162',
    danger: '#FF7675',
  }[status];

  return <RhythmSmileIcon fillColor={fillColor} />;
};

const RhythmSmileIcon = ({ fillColor }: { fillColor: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#rhythmSmileIconClipPath)">
      <g filter="url(#rhythmSmileIconFilter)">
        <path
          d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM15.2041 18.7617C14.9848 18.5426 14.6294 18.5425 14.4102 18.7617C14.1912 18.981 14.1911 19.3365 14.4102 19.5557C15.5597 20.7052 17.4237 20.7051 18.5732 19.5557C18.7925 19.3364 18.7925 18.981 18.5732 18.7617C18.354 18.5425 17.9986 18.5425 17.7793 18.7617C17.0683 19.4727 15.9151 19.4727 15.2041 18.7617ZM13.123 14.667C12.5029 14.667 12 15.1699 12 15.79C12.0002 16.41 12.503 16.9121 13.123 16.9121C13.743 16.912 14.2458 16.41 14.2461 15.79C14.2461 15.1699 13.7432 14.6671 13.123 14.667ZM19.8604 14.667C19.2402 14.6671 18.7373 15.1699 18.7373 15.79C18.7375 16.41 19.2404 16.912 19.8604 16.9121C20.4804 16.9121 20.9832 16.41 20.9834 15.79C20.9834 15.1699 20.4805 14.667 19.8604 14.667Z"
          fill={fillColor}
        />
      </g>
    </g>
    <defs>
      <filter
        id="rhythmSmileIconFilter"
        x="-0.5"
        y="-0.5"
        width="33"
        height="33"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.25 0.25"
          numOctaves="3"
          seed="2953"
        />
        <feDisplacementMap
          in="shape"
          scale="1"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_382_9963">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <clipPath id="rhythmSmileIconClipPath">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PatternCheckIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-7 w-7"
  >
    <rect width="40" height="40" rx="12" fill="#FFCEBB" />
    <g clipPath="url(#patternCheckIconClipPath)">
      <path
        d="M18.1333 21.8667L15.2667 19C15.0222 18.7556 14.7111 18.6333 14.3333 18.6333C13.9556 18.6333 13.6444 18.7556 13.4 19C13.1556 19.2444 13.0333 19.5556 13.0333 19.9333C13.0333 20.3111 13.1556 20.6222 13.4 20.8667L17.2 24.6667C17.4667 24.9333 17.7778 25.0667 18.1333 25.0667C18.4889 25.0667 18.8 24.9333 19.0667 24.6667L26.6 17.1333C26.8444 16.8889 26.9667 16.5778 26.9667 16.2C26.9667 15.8222 26.8444 15.5111 26.6 15.2667C26.3556 15.0222 26.0444 14.9 25.6667 14.9C25.2889 14.9 24.9778 15.0222 24.7333 15.2667L18.1333 21.8667ZM10.6667 32C9.93333 32 9.30578 31.7391 8.784 31.2173C8.26222 30.6956 8.00089 30.0676 8 29.3333V10.6667C8 9.93333 8.26133 9.30578 8.784 8.784C9.30667 8.26222 9.93422 8.00089 10.6667 8H29.3333C30.0667 8 30.6947 8.26133 31.2173 8.784C31.74 9.30667 32.0009 9.93422 32 10.6667V29.3333C32 30.0667 31.7391 30.6947 31.2173 31.2173C30.6956 31.74 30.0676 32.0009 29.3333 32H10.6667Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="patternCheckIconClipPath">
        <rect width="24" height="24" fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);

const PatternWarningIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-7 w-7"
  >
    <rect width="40" height="40" rx="12" fill="#F9D89C" />
    <g clipPath="url(#patternAlertIconClipPath)">
      <path
        d="M18.2 25.4C18.2 24.9226 18.3896 24.4648 18.7272 24.1272C19.0648 23.7896 19.5226 23.6 20 23.6C20.4774 23.6 20.9352 23.7896 21.2728 24.1272C21.6104 24.4648 21.8 24.9226 21.8 25.4C21.8 25.8774 21.6104 26.3352 21.2728 26.6728C20.9352 27.0104 20.4774 27.2 20 27.2C19.5226 27.2 19.0648 27.0104 18.7272 26.6728C18.3896 26.3352 18.2 25.8774 18.2 25.4ZM18.8192 13.784C18.8693 13.5073 19.015 13.257 19.2308 13.0768C19.4466 12.8965 19.7188 12.7978 20 12.7978C20.2812 12.7978 20.5534 12.8965 20.7692 13.0768C20.985 13.257 21.1307 13.5073 21.1808 13.784L21.2 14V20L21.1808 20.216C21.1307 20.4927 20.985 20.743 20.7692 20.9232C20.5534 21.1035 20.2812 21.2022 20 21.2022C19.7188 21.2022 19.4466 21.1035 19.2308 20.9232C19.015 20.743 18.8693 20.4927 18.8192 20.216L18.8 20V14L18.8192 13.784ZM32 20C32 23.1826 30.7357 26.2348 28.4853 28.4853C26.2348 30.7357 23.1826 32 20 32C16.8174 32 13.7652 30.7357 11.5147 28.4853C9.26428 26.2348 8 23.1826 8 20C8 16.8174 9.26428 13.7652 11.5147 11.5147C13.7652 9.26428 16.8174 8 20 8C23.1826 8 26.2348 9.26428 28.4853 11.5147C30.7357 13.7652 32 16.8174 32 20ZM29.6 20C29.6 17.4539 28.5886 15.0121 26.7882 13.2118C24.9879 11.4114 22.5461 10.4 20 10.4C17.4539 10.4 15.0121 11.4114 13.2118 13.2118C11.4114 15.0121 10.4 17.4539 10.4 20C10.4 22.5461 11.4114 24.9879 13.2118 26.7882C15.0121 28.5886 17.4539 29.6 20 29.6C22.5461 29.6 24.9879 28.5886 26.7882 26.7882C28.5886 24.9879 29.6 22.5461 29.6 20Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="patternAlertIconClipPath">
        <rect width="24" height="24" fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);

const PatternDangerIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-7 w-7"
  >
    <rect width="40" height="40" rx="12" fill="#FF7675" />
    <g clipPath="url(#patternDangerIconClipPath)">
      <path
        d="M20.8556 25.6556C21.0852 25.4252 21.2 25.14 21.2 24.8C21.2 24.46 21.0848 24.1752 20.8544 23.9456C20.624 23.716 20.3392 23.6008 20 23.6C19.6608 23.5992 19.376 23.7144 19.1456 23.9456C18.9152 24.1768 18.8 24.4616 18.8 24.8C18.8 25.1384 18.9152 25.4236 19.1456 25.6556C19.376 25.8876 19.6608 26.0024 20 26C20.3392 25.9976 20.6244 25.8836 20.8556 25.6556ZM20.8556 20.8544C21.0852 20.6248 21.2 20.34 21.2 20V15.2C21.2 14.86 21.0848 14.5752 20.8544 14.3456C20.624 14.116 20.3392 14.0008 20 14C19.6608 13.9992 19.376 14.1144 19.1456 14.3456C18.9152 14.5768 18.8 14.8616 18.8 15.2V20C18.8 20.34 18.9152 20.6252 19.1456 20.8556C19.376 21.086 19.6608 21.2008 20 21.2C20.3392 21.1992 20.6244 21.084 20.8556 20.8544ZM20 32C18.34 32 16.78 31.6848 15.32 31.0544C13.86 30.424 12.59 29.5692 11.51 28.49C10.43 27.4108 9.5752 26.1408 8.9456 24.68C8.316 23.2192 8.0008 21.6592 8 20C7.9992 18.3408 8.3144 16.7808 8.9456 15.32C9.5768 13.8592 10.4316 12.5892 11.51 11.51C12.5884 10.4308 13.8584 9.576 15.32 8.9456C16.7816 8.3152 18.3416 8 20 8C21.6584 8 23.2184 8.3152 24.68 8.9456C26.1416 9.576 27.4116 10.4308 28.49 11.51C29.5684 12.5892 30.4236 13.8592 31.0556 15.32C31.6876 16.7808 32.0024 18.3408 32 20C31.9976 21.6592 31.6824 23.2192 31.0544 24.68C30.4264 26.1408 29.5716 27.4108 28.49 28.49C27.4084 29.5692 26.1384 30.4244 24.68 31.0556C23.2216 31.6868 21.6616 32.0016 20 32Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="patternDangerIconClipPath">
        <rect width="24" height="24" fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);

export default Report;
