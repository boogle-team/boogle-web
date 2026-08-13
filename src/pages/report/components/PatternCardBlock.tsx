import PatternCardItem from '@/pages/report/components/PatternCardItem';
import type {
  PatternCardItemTypes,
  PatternCardVariantTypes,
} from '@/pages/report/types/reportTypes';

interface PatternCardBlockPropTypes {
  items: PatternCardItemTypes[];
  title: string;
  variant: PatternCardVariantTypes;
}

const PatternCardBlock = ({
  items,
  title,
  variant,
}: PatternCardBlockPropTypes) => {
  const isImprovement = variant === 'improvement';

  return (
    <section
      className={`rounded-xl px-4 py-4 ${
        isImprovement
          ? 'border border-orange-4 bg-orange-1'
          : 'bg-beige-1 shadow-sm'
      }`}
    >
      <h2 className="body-m tracking-[-0.02rem] text-gray-9">{title}</h2>
      <div className={`${isImprovement ? 'mt-4' : 'mt-3'} flex flex-col`}>
        {items.map((item, index) => (
          <PatternCardItem
            key={
              item.icon === 'guide'
                ? `guide-${item.guideId}`
                : `${item.icon}-${item.title}-${index}`
            }
            isFirstItem={index === 0}
            item={item}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
};

export default PatternCardBlock;
