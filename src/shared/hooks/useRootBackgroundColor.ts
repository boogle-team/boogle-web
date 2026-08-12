import { useLayoutEffect } from 'react';

const ROOT_BACKGROUND_COLOR_PROPERTY = '--root-background-color';
const THEME_COLOR_META_SELECTOR = 'meta[name="theme-color"]';
const CSS_VARIABLE_PATTERN = /^var\((--[\w-]+)\)$/;

/**
 * `var(--token)` 형태면 해당 커스텀 속성 값을 직접 읽어 실제 색으로 바꾼다.
 * html의 computed backgroundColor를 읽으면 CSS 캐스케이드 결과에 의존하게 되므로 사용하지 않는다.
 */
const resolveBackgroundColor = (backgroundColor: string) => {
  const matchedVariable = backgroundColor.trim().match(CSS_VARIABLE_PATTERN);

  if (!matchedVariable) {
    return backgroundColor;
  }

  const [, variableName] = matchedVariable;
  const resolvedColor = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  return resolvedColor || backgroundColor;
};

const useRootBackgroundColor = (backgroundColor: string) => {
  useLayoutEffect(() => {
    const rootElement = document.documentElement;

    rootElement.style.setProperty(
      ROOT_BACKGROUND_COLOR_PROPERTY,
      backgroundColor,
    );

    const themeColorMetaElement = document.querySelector<HTMLMetaElement>(
      THEME_COLOR_META_SELECTOR,
    );

    if (!themeColorMetaElement) {
      return;
    }

    themeColorMetaElement.setAttribute(
      'content',
      resolveBackgroundColor(backgroundColor),
    );
  }, [backgroundColor]);
};

export default useRootBackgroundColor;
