import { useEffect } from 'react';

const ROOT_BACKGROUND_COLOR_PROPERTY = '--root-background-color';

const useRootBackgroundColor = (backgroundColor: string) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      ROOT_BACKGROUND_COLOR_PROPERTY,
      backgroundColor,
    );
  }, [backgroundColor]);
};

export default useRootBackgroundColor;
