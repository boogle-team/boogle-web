import { useEffect, useState } from 'react';

const useLottieAnimationData = (animationPath: string) => {
  const [animationData, setAnimationData] = useState<unknown | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadAnimationData = async () => {
      try {
        const response = await fetch(animationPath, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load lottie animation: ${animationPath}`);
        }

        const fetchedAnimationData: unknown = await response.json();
        setAnimationData(fetchedAnimationData);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setAnimationData(null);
      }
    };

    void loadAnimationData();

    return () => {
      abortController.abort();
    };
  }, [animationPath]);

  return { animationData };
};

export default useLottieAnimationData;
