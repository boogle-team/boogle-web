import { useEffect, useRef } from 'react';

interface TimeWheelColumnPropTypes<T> {
  items: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  formatItem?: (item: T) => string;
}

const ITEM_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const PADDING_ROWS = Math.floor(VISIBLE_ROWS / 2);

const TimeWheelColumn = <T,>({
  items,
  selectedIndex,
  onSelect,
  formatItem,
}: TimeWheelColumnPropTypes<T>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    isProgrammaticScroll.current = true;
    list.scrollTo({ top: selectedIndex * ITEM_HEIGHT, behavior: 'auto' });

    const resetTimeout = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 50);

    return () => clearTimeout(resetTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const list = listRef.current;
      if (!list) return;

      const nextIndex = Math.round(list.scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.min(Math.max(nextIndex, 0), items.length - 1);

      if (clampedIndex !== selectedIndex) {
        onSelect(clampedIndex);
      }
    }, 100);
  };

  const handleItemClick = (index: number) => {
    listRef.current?.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'smooth',
    });
    onSelect(index);
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="h-50 snap-y snap-mandatory overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div style={{ height: PADDING_ROWS * ITEM_HEIGHT }} />

      {items.map((item, index) => {
        const isSelected = index === selectedIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleItemClick(index)}
            className="flex h-10 w-full snap-center items-center justify-center"
          >
            <span
              className={
                isSelected ? 'title text-orange-6' : 'body-m text-gray-5'
              }
            >
              {formatItem ? formatItem(item) : String(item)}
            </span>
          </button>
        );
      })}

      <div style={{ height: PADDING_ROWS * ITEM_HEIGHT }} />
    </div>
  );
};

export default TimeWheelColumn;
