import { useRef } from 'react';
import { useDragControls, type PanInfo } from 'motion/react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const DRAG_CLOSE_DISTANCE_RATIO = 0.25;
const DRAG_CLOSE_VELOCITY = 800;

interface UseBottomSheetDragParamTypes {
  onClose: () => void;
}

const useBottomSheetDrag = ({ onClose }: UseBottomSheetDragParamTypes) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handleDragHandlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    dragControls.start(event);
  };

  const handleSheetDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    dragInfo: PanInfo,
  ) => {
    const sheetHeight = sheetRef.current?.getBoundingClientRect().height ?? 0;
    const dragCloseDistance = sheetHeight * DRAG_CLOSE_DISTANCE_RATIO;
    const shouldClose =
      dragInfo.offset.y >= dragCloseDistance ||
      dragInfo.velocity.y >= DRAG_CLOSE_VELOCITY;

    if (shouldClose) {
      onClose();
    }
  };

  return {
    sheetRef,
    dragControls,
    handleDragHandlePointerDown,
    handleSheetDragEnd,
  };
};

export default useBottomSheetDrag;
