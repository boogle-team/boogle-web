import type { SVGProps } from 'react';

const NormalBowelCountIcon = ({ className }: SVGProps<SVGSVGElement>) => (
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

export default NormalBowelCountIcon;
