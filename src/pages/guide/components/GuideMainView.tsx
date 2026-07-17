import { ChevronRight, HelpCircle } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';

interface GuideMainViewPropTypes {
  isInsufficient?: boolean;
}

interface GuideMainItemTypes {
  description: string;
  iconBackgroundColor: string;
  iconColor: string;
  id?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}

const personalGuides: GuideMainItemTypes[] = [
  {
    description:
      '수분이 부족했던 날 딱딱한 변이 함께 나타났어요. 하루 6~8잔을 목표로 해보세요.',
    iconBackgroundColor: 'bg-orange-3',
    iconColor: 'text-beige-1',
    id: 'water-and-hard-stool',
    Icon: WaterDropIcon,
    title: '수분과 딱딱한 변의 관계',
  },
  {
    description:
      '수면이 부족했던 날 딱딱한 변이 함께 나타났어요. 하루 6~8잔을 목표로 해보세요.',
    iconBackgroundColor: 'bg-orange-3',
    iconColor: 'text-beige-1',
    id: 'sleep-and-gut',
    Icon: SleepConditionIcon,
    title: '수면과 장 컨디션',
  },
];

const healthGuides: GuideMainItemTypes[] = [
  {
    description:
      '주 3회에서 하루 3회까지 다양해요. 개인마다 리듬이 달라요.',
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    id: 'normal-bowel-count',
    Icon: NormalBowelCountIcon,
    title: '정상 배변 횟수는?',
  },
  {
    description: '1~7형으로 분류하며 3~4형이 이상적인 형태예요.',
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    id: 'bristol-stool-chart',
    Icon: BristolStoolChartIcon,
    title: '브리스톨 변 형태 척도란?',
  },
  {
    description:
      '장과 뇌는 연결돼 있어요. 스트레스가 높으면 장 운동이 불규칙해질 수 있어요.',
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    id: 'stress-and-gut',
    Icon: StressGutIcon,
    title: '스트레스와 장의 관계',
  },
];

const warningGuide: GuideMainItemTypes = {
  description: '혈변·흑변, 4일 이상 배변 없음·복통, 2주 이상 묽은 변',
  iconBackgroundColor: 'bg-semantic-danger',
  iconColor: 'text-beige-1',
  id: 'warning-signs',
  Icon: WarningSignIcon,
  title: '이런 증상이면 전문가 상담을',
};

const GuideMainView = ({ isInsufficient = false }: GuideMainViewPropTypes) => (
  <section className="min-h-screen bg-beige-5 px-layout pb-3 text-gray-10">
    <header className="-mx-layout bg-beige-5">
      <div className="h-10" />
      <div className="flex h-12 items-center justify-center">
        <h1 className="label">가이드</h1>
      </div>
    </header>

    <div className="pt-4">
      <section>
        <h2 className="caption text-gray-8">내 패턴 기반</h2>
        <div className="mt-3 flex flex-col gap-2">
          {isInsufficient ? (
            <InsufficientGuideCard />
          ) : (
            personalGuides.map((guideItem) => (
              <GuideMainCard key={guideItem.title} guideItem={guideItem} />
            ))
          )}
        </div>
      </section>

      <GuideDivider />

      <section>
        <h2 className="caption text-gray-8">장 건강 기본 정보</h2>
        <div className="mt-3 flex flex-col gap-2">
          {healthGuides.map((guideItem) => (
            <GuideMainCard key={guideItem.title} guideItem={guideItem} />
          ))}
        </div>
      </section>

      <GuideDivider />

      <section>
        <h2 className="caption text-gray-8">주의 신호</h2>
        <div className="mt-3">
          <GuideMainCard guideItem={warningGuide} isWarning />
        </div>
      </section>
    </div>
  </section>
);

const GuideDivider = () => <hr className="my-8 border-beige-7" />;

function WaterDropIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#FFCEBB" />
      <path
        d="M18.542 9.40705C18.225 9.60175 17.9529 9.85873 17.7429 10.1617L12.237 18.1479C10.0074 21.7933 10.8639 26.3606 14.2257 29.0183C17.5673 31.6606 22.4261 31.6606 25.7665 29.0183C29.1284 26.3606 29.9849 21.7922 27.7868 18.1985L22.2505 10.1617C21.4379 8.97914 19.7834 8.64804 18.542 9.40705Z"
        fill="white"
      />
    </svg>
  );
}

function NormalBowelCountIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#F9D89C" />
      <path
        d="M10 20V16.3333C10 15.3609 10.3951 14.4282 11.0983 13.7406C11.8016 13.053 12.7554 12.6667 13.75 12.6667H30M26.25 16.3333L30 12.6667L26.25 9M30 20V23.6667C30 24.6391 29.6049 25.5718 28.9017 26.2594C28.1984 26.947 27.2446 27.3333 26.25 27.3333H10M13.75 23.6667L10 27.3333L13.75 31"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SleepConditionIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#FFCEBB" />
      <path
        d="M28.7 18.2353C29.5403 18.2353 30.3491 18.5495 30.9612 19.114C31.5733 19.6785 31.9427 20.4506 31.994 21.2729L32 21.4706V29.1176C31.9999 29.3412 31.9133 29.5564 31.7576 29.7198C31.602 29.8831 31.3888 29.9824 31.1613 29.9977C30.9338 30.0129 30.7089 29.9429 30.532 29.8018C30.3552 29.6608 30.2395 29.4591 30.2084 29.2376L30.2 29.1176V26.4706H9.8V29.1176C9.79999 29.3309 9.72123 29.5369 9.57828 29.6976C9.43533 29.8583 9.23786 29.9628 9.0224 29.9918L8.9 30C8.68251 30 8.47239 29.9228 8.30848 29.7826C8.14458 29.6425 8.03798 29.4489 8.0084 29.2376L8 29.1176V21.4706C7.99996 20.6467 8.32051 19.8539 8.89627 19.2538C9.47203 18.6537 10.2596 18.2915 11.0984 18.2412L11.3 18.2353H28.7ZM13.7 10H26.3C27.1403 9.99996 27.9491 10.3142 28.5612 10.8787C29.1733 11.4432 29.5427 12.2153 29.594 13.0376L29.6 13.2353V17.0588H26L25.9916 16.9212C25.96 16.6586 25.8391 16.4141 25.6484 16.2271C25.4577 16.0401 25.2083 15.9216 24.9404 15.8906L24.8 15.8824H22.4C22.1061 15.8824 21.8224 15.9882 21.6028 16.1797C21.3831 16.3711 21.2428 16.635 21.2084 16.9212L21.2 17.0588H18.8L18.7916 16.9212C18.76 16.6586 18.6391 16.4141 18.4484 16.2271C18.2577 16.0401 18.0083 15.9216 17.7404 15.8906L17.6 15.8824H15.2C14.9061 15.8824 14.6224 15.9882 14.4028 16.1797C14.1831 16.3711 14.0428 16.635 14.0084 16.9212L14 17.0588H10.4V13.2353C10.4 12.4114 10.7205 11.6186 11.2963 11.0185C11.872 10.4184 12.6596 10.0562 13.4984 10.0059L13.7 10Z"
        fill="white"
      />
    </svg>
  );
}

function BristolStoolChartIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#F9D89C" />
      <path
        d="M20.5541 8.00552C20.3178 7.97635 20.0816 8.06386 19.9313 8.24305C19.7809 8.42223 19.7337 8.66393 19.811 8.88062C19.9313 9.22233 19.9957 9.58487 19.9957 9.96825C19.9957 10.8725 19.6306 11.5184 19.0551 11.9518C18.458 12.4019 17.5904 12.6602 16.5595 12.6602H15.5287C13.4412 12.6602 11.7489 14.3021 11.7489 16.3273C11.7489 16.9441 11.9078 17.5275 12.187 18.04C10.3831 18.3151 9 19.8319 9 21.6613C9 23.6032 10.5549 25.1909 12.5178 25.3201C12.6509 24.8033 12.943 24.3283 13.3596 23.9657L19.4287 18.7068C19.9528 18.2526 20.6314 17.9984 21.3358 17.9984C23.2515 17.9984 24.6216 19.7902 24.0718 21.5696L23.5264 23.3365C24.7634 23.3865 25.7899 24.2158 26.0949 25.3326H27.2202C29.3077 25.3326 31 23.6907 31 21.6655C31 19.8361 29.6212 18.3192 27.813 18.0442C28.0922 17.5316 28.2511 16.9524 28.2511 16.3315C28.2511 14.3063 26.5588 12.6644 24.4713 12.6644H24.0676C24.1062 12.4394 24.1277 12.2102 24.1277 11.9727C24.1277 9.94325 22.5771 8.26805 20.5584 8.00552H20.5541ZM15.2152 26.666H17.8696L16.5295 31.004C16.3749 31.4999 16.7571 32 17.294 32C17.4916 32 17.6806 31.9292 17.8266 31.8041L23.8872 26.5369C24.0375 26.4077 24.1234 26.2202 24.1234 26.0201C24.1234 25.6368 23.8055 25.3284 23.4104 25.3284H20.756L22.0961 20.9904C22.2507 20.4945 21.8684 19.9944 21.3315 19.9944C21.1339 19.9944 20.9449 20.0653 20.7989 20.1903L14.7384 25.4617C14.5881 25.5909 14.5021 25.7784 14.5021 25.9785C14.5021 26.3618 14.82 26.6702 15.2152 26.6702V26.666Z"
        fill="white"
      />
    </svg>
  );
}

function StressGutIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#F9D89C" />
      <g clipPath="url(#stressGutIconClip)">
        <path
          d="M29.6 17.6C28.712 17.6 27.944 18.08 27.536 18.8H21.2V16.4H26C26.66 16.4 27.2 15.86 27.2 15.2V12.464C27.92 12.044 28.4 11.288 28.4 10.4C28.4 9.08 27.32 8 26 8C24.68 8 23.6 9.08 23.6 10.4C23.6 11.288 24.08 12.056 24.8 12.464V14H21.2V11.6C21.2 9.62 19.58 8 17.6 8C16.04 8 14.708 8.996 14.204 10.412C13.1632 10.5133 12.1973 10.9981 11.4942 11.7722C10.7911 12.5463 10.401 13.5543 10.4 14.6C10.4 14.996 10.46 15.38 10.568 15.752C9.044 16.568 8 18.188 8 20C8 21.296 8.516 22.508 9.404 23.396C9.272 23.852 9.2 24.32 9.2 24.8C9.2 27.152 10.892 29.108 13.172 29.516C13.832 30.992 15.332 32 17 32C19.316 32 21.2 30.116 21.2 27.8V26H24.8V27.536C24.08 27.956 23.6 28.712 23.6 29.6C23.6 30.92 24.68 32 26 32C27.32 32 28.4 30.92 28.4 29.6C28.4 28.712 27.92 27.944 27.2 27.536V24.8C27.2 24.14 26.66 23.6 26 23.6H21.2V21.2H27.536C27.956 21.92 28.712 22.4 29.6 22.4C30.92 22.4 32 21.32 32 20C32 18.68 30.92 17.6 29.6 17.6Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="stressGutIconClip">
          <rect width="24" height="24" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function WarningSignIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="12" fill="#FF7675" />
      <path
        d="M19.9999 9.5C21.0418 9.5 22.0127 10.0075 22.6073 10.855L22.7219 11.0289L31.574 25.7504C31.8431 26.2145 31.9894 26.7389 31.9994 27.2747C32.0095 27.8105 31.8828 28.34 31.6313 28.8138C31.3798 29.2875 31.0117 29.6899 30.5615 29.9833C30.1113 30.2767 29.5937 30.4515 29.0572 30.4913L28.8444 30.5H11.1433C10.6062 30.494 10.0795 30.3525 9.61212 30.0888C9.14478 29.8251 8.75214 29.4478 8.47084 28.9921C8.18955 28.5363 8.02877 28.017 8.00352 27.4827C7.97826 26.9483 8.08936 26.4162 8.32643 25.9362L8.43444 25.7352L17.2823 11.0245C17.5652 10.559 17.964 10.174 18.4401 9.90694C18.9162 9.63987 19.4535 9.4997 19.9999 9.5ZM20.0108 23.9846L19.8722 23.9922C19.6071 24.0237 19.3627 24.1508 19.1854 24.3497C19.008 24.5486 18.9101 24.8053 18.9101 25.0713C18.9101 25.3372 19.008 25.5939 19.1854 25.7928C19.3627 25.9917 19.6071 26.1189 19.8722 26.1503L19.9999 26.1579L20.1384 26.1503C20.4036 26.1189 20.648 25.9917 20.8253 25.7928C21.0026 25.5939 21.1005 25.3372 21.1005 25.0713C21.1005 24.8053 21.0026 24.5486 20.8253 24.3497C20.648 24.1508 20.4036 24.0237 20.1384 23.9922L20.0108 23.9846ZM19.9999 16.3783C19.7327 16.3783 19.4747 16.476 19.2751 16.6529C19.0754 16.8298 18.9478 17.0735 18.9165 17.3378L18.9089 17.4649V21.8114L18.9165 21.9385C18.9481 22.2026 19.0758 22.446 19.2754 22.6227C19.4751 22.7993 19.7328 22.8968 19.9999 22.8968C20.2669 22.8968 20.5247 22.7993 20.7243 22.6227C20.924 22.446 21.0517 22.2026 21.0832 21.9385L21.0909 21.8114V17.4649L21.0832 17.3378C21.052 17.0735 20.9244 16.8298 20.7247 16.6529C20.525 16.476 20.2671 16.3783 19.9999 16.3783Z"
        fill="white"
      />
    </svg>
  );
}

const InsufficientGuideCard = () => (
  <article className="flex min-h-[4.5rem] items-center gap-3 rounded-lg border border-dashed border-orange-4 bg-orange-1 px-4 py-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-4 text-beige-1">
      <HelpCircle className="h-5 w-5" />
    </span>
    <div>
      <h3 className="caption-bold text-gray-10">
        아직 패턴을 보여드리기엔 일러요
      </h3>
      <p className="micro mt-1 text-gray-7">
        3일 이상 기록하면 가이드가 나타나요!
      </p>
    </div>
  </article>
);

const GuideMainCard = ({
  guideItem,
  isWarning = false,
}: {
  guideItem: GuideMainItemTypes;
  isWarning?: boolean;
}) => {
  const { description, iconBackgroundColor, iconColor, id, Icon, title } =
    guideItem;
  const hasFullIcon =
    id === 'water-and-hard-stool' ||
    id === 'normal-bowel-count' ||
    id === 'sleep-and-gut' ||
    id === 'bristol-stool-chart' ||
    id === 'stress-and-gut' ||
    id === 'warning-signs';

  return (
    <Link
      to={id ? `/guide?id=${id}` : '/guide'}
      className="flex min-h-[4.5rem] items-center gap-3 rounded-lg bg-beige-1 px-4 py-3 shadow-sm"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBackgroundColor} ${iconColor}`}
      >
        <Icon className={hasFullIcon ? 'h-10 w-10' : 'h-5 w-5'} />
      </span>
      <span className="min-w-0 flex-1">
        <strong
          className={`caption-bold block ${
            isWarning ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        >
          {title}
        </strong>
        <span className="micro mt-1 line-clamp-2 block text-gray-7">
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-6" />
    </Link>
  );
};

export default GuideMainView;
