import { INSUFFICIENT_REPORT_BY_MODE } from '../constants/reportConstants';
import type { ReportModeTypes } from '../types/reportTypes';

interface InsufficientReportBodyPropTypes {
  selectedMode: ReportModeTypes;
}

const InsufficientReportBody = ({
  selectedMode,
}: InsufficientReportBodyPropTypes) => {
  const insufficientReport = INSUFFICIENT_REPORT_BY_MODE[selectedMode];
  const progressWidth = `${
    (insufficientReport.currentCount / insufficientReport.requiredCount) * 100
  }%`;
  const remainingCount = Math.max(
    insufficientReport.minimumRequiredCount - insufficientReport.currentCount,
    0,
  );

  return (
    <div className="mt-4 flex min-h-[31rem] flex-col gap-8">
      <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="caption text-gray-9">
            {insufficientReport.trackerLabel.replace(
              `${insufficientReport.currentCount}일째`,
              '',
            )}
            <span className="caption-bold text-orange-6">
              {insufficientReport.currentCount}일
            </span>
            째
          </p>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_2.5rem] items-center gap-3">
          <div className="h-2 overflow-hidden rounded-full bg-gray-4">
            <div
              className="h-full rounded-full bg-orange-6"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="micro text-right text-orange-6">
            {insufficientReport.currentCount}/{insufficientReport.requiredCount}
            일
          </p>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <InsufficientReportIcon />
        <h2 className="label-bold mt-6 whitespace-pre-line text-gray-10">
          아직 패턴을 보여드리기엔{'\n'}기록이 조금 부족해요
        </h2>
        <p className="micro mt-3 max-w-[14.5rem] whitespace-pre-line text-gray-7">
          {insufficientReport.description}
        </p>
        <button
          type="button"
          className="caption-bold mt-5 rounded-full border border-orange-6 bg-orange-1 px-5 py-2 text-orange-6"
        >
          앞으로 {remainingCount}일만 더!
        </button>
      </section>
    </div>
  );
};

const InsufficientReportIcon = () => (
  <svg
    width="96"
    height="92"
    viewBox="128.5 0 96 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <ellipse cx="174.729" cy="79.5" rx="30" ry="11.5" fill="#FFE3D9" />
    <circle
      cx="3.51467"
      cy="3.51467"
      r="3.51467"
      transform="matrix(-1 0 0 1 216.529 28)"
      fill="#FFCEBB"
    />
    <circle
      cx="5.6"
      cy="5.6"
      r="5.6"
      transform="matrix(-1 0 0 1 141.699 12)"
      fill="#FFCEBB"
    />
    <circle
      cx="7.5"
      cy="7.5"
      r="7.5"
      transform="matrix(-1 0 0 1 224.5 3)"
      fill="#FFCEBB"
    />
    <path
      d="M177.147 15.0742C185.12 15.0742 191.923 20.3032 194.594 27.6592C202.615 29.8336 208.524 37.2748 208.524 46.1211C208.524 52.0429 205.876 57.3346 201.719 60.8389C201.856 61.7191 201.929 62.6215 201.929 63.541C201.929 73.0018 194.39 80.6719 185.092 80.6719C181.083 80.6718 177.402 79.2446 174.511 76.8643C171.724 79.3987 168.133 80.9258 164.211 80.9258C155.823 80.9257 148.94 73.9442 148.235 65.0488C142.775 62.4804 138.986 56.8587 138.986 50.3359C138.986 43.6576 142.958 37.9236 148.629 35.4443C148.336 34.424 148.176 33.3453 148.176 32.2285C148.176 25.9127 153.208 20.7931 159.415 20.793C160.784 20.793 162.095 21.0422 163.309 21.498C166.722 17.5529 171.658 15.0742 177.147 15.0742ZM176.397 55.8906C174.977 55.8906 173.825 56.5822 173.825 57.4346C173.825 58.2869 174.977 58.9775 176.397 58.9775C177.818 58.9775 178.97 58.2869 178.97 57.4346C178.97 56.5822 177.818 55.8906 176.397 55.8906ZM167.99 47.5762C166.568 47.5762 165.415 48.7493 165.415 50.1963C165.415 51.6432 166.568 52.8164 167.99 52.8164C169.412 52.8163 170.565 51.6431 170.565 50.1963C170.565 48.7493 169.412 47.5763 167.99 47.5762ZM182.939 47.5762C181.517 47.5764 180.365 48.7494 180.365 50.1963C180.365 51.6431 181.518 52.8162 182.939 52.8164C184.362 52.8164 185.515 51.6432 185.515 50.1963C185.515 48.7493 184.362 47.5762 182.939 47.5762Z"
      fill="#FFA17D"
    />
    <path
      d="M166.75 55.4823C166.75 56.49 165.388 57.3069 163.709 57.3069C162.029 57.3069 160.668 56.49 160.668 55.4823C160.668 54.4746 162.029 53.6577 163.709 53.6577C165.388 53.6577 166.75 54.4746 166.75 55.4823Z"
      fill="#FF8C61"
    />
    <path
      d="M191.762 55.5841C191.849 56.5879 190.293 57.5442 188.285 57.7199C186.278 57.8956 184.579 57.2243 184.491 56.2205C184.403 55.2166 185.96 54.2604 187.967 54.0846C189.975 53.9089 191.674 54.5802 191.762 55.5841Z"
      fill="#FF8C61"
    />
  </svg>
);

export default InsufficientReportBody;
