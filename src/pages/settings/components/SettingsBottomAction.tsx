import { useEffect, useState } from 'react';

import type { ReactNode } from 'react';

interface SettingsBottomActionPropTypes {
  children: ReactNode;
}

const SettingsBottomAction = ({ children }: SettingsBottomActionPropTypes) => {
  const [keyboardInset, setKeyboardInset] = useState(0);

  useEffect(() => {
    const visualViewport = window.visualViewport;

    if (!visualViewport) return;

    const handleViewportChange = () => {
      const viewportBottom = visualViewport.offsetTop + visualViewport.height;
      setKeyboardInset(Math.max(0, window.innerHeight - viewportBottom));
    };

    handleViewportChange();
    visualViewport.addEventListener('resize', handleViewportChange);
    visualViewport.addEventListener('scroll', handleViewportChange);

    return () => {
      visualViewport.removeEventListener('resize', handleViewportChange);
      visualViewport.removeEventListener('scroll', handleViewportChange);
    };
  }, []);

  return (
    <div
      className="fixed left-1/2 z-40 w-full max-w-[26.875rem] -translate-x-1/2 bg-beige-1 px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      style={{ bottom: keyboardInset }}
    >
      {children}
    </div>
  );
};

export default SettingsBottomAction;
