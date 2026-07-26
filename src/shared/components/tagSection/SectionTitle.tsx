import type { ReactNode } from 'react';

export interface SectionTitlePropTypes {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const SectionTitle = ({
  icon,
  title,
  description,
  className = '',
}: SectionTitlePropTypes) => {
  const sectionTitleClassName = ['flex min-w-0 items-center gap-2', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={sectionTitleClassName}>
      <span
        aria-hidden="true"
        className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-[6.6px] bg-orange-5 text-beige-1"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        <h2 className="body-m-bold text-gray-9">{title}</h2>
        {description ? (
          <p className="label-semi text-orange-5">{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionTitle;
