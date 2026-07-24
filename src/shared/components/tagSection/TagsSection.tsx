import type { ReactNode } from 'react';
import SectionTitle from '@/shared/components/tagSection/SectionTitle';
import Tag from '@/shared/components/tagSection/Tag';

export interface TagItemTypes {
  id: number | string;
  label: string;
}

export interface TagsSectionPropTypes {
  tags: TagItemTypes[];
  title: string;
  description?: string;
  icon: ReactNode;
  className?: string;
}

const TagsSection = ({
  tags,
  title,
  description,
  icon,
  className = '',
}: TagsSectionPropTypes) => {
  if (tags.length === 0) {
    return null;
  }

  const sectionClassName = ['px-layout', className].filter(Boolean).join(' ');

  return (
    <section className={sectionClassName}>
      <SectionTitle icon={icon} title={title} description={description} />
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map(({ id, label }) => (
          <Tag key={id} label={label} />
        ))}
      </div>
    </section>
  );
};

export default TagsSection;
