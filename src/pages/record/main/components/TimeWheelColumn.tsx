import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

interface TimeWheelColumnPropTypes<T> {
  items: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  formatItem?: (item: T) => string;
}

const ITEM_HEIGHT = 28;
const VISIBLE_ROWS = 7;
const PADDING_ROWS = Math.floor(VISIBLE_ROWS / 2);

const getRowStyle = (distance: number): CSSProperties => {
  const clampedDistance = Math.min(distance, PADDING_ROWS);
  const scaleY = 1 - clampedDistance * 0.15;
  const opacity = Math.max(0, 1 - clampedDistance * 0.28);

  return { transform: `scaleY(${scaleY})`, opacity };
};

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
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
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

  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
      clearTimeout(resetTimeoutRef.current);
    };
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
    isProgrammaticScroll.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    listRef.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'auto' });
    onSelect(index);

    resetTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 50);
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="h-49 snap-y snap-mandatory overflow-y-auto scrollbar-none [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [&::-webkit-scrollbar]:hidden"
    >
      <div style={{ height: PADDING_ROWS * ITEM_HEIGHT }} />

      {items.map((item, index) => {
        const isSelected = index === selectedIndex;
        const distance = Math.abs(index - selectedIndex);

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleItemClick(index)}
            className="flex h-7 w-full snap-center items-center justify-center"
          >
            <span
              style={getRowStyle(distance)}
              className={`transition-[transform,opacity] duration-200 ${
                isSelected
                  ? 'body-lg tracking-[-0.0225rem] text-gray-10'
                  : 'body-m text-gray-5'
              }`}
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
