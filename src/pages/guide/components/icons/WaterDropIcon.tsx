import type { SVGProps } from 'react';

const WaterDropIcon = ({ className }: SVGProps<SVGSVGElement>) => (
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

export default WaterDropIcon;
