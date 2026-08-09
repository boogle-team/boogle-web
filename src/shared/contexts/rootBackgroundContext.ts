import { createContext } from 'react';

export interface RootBackgroundContextValueTypes {
  /**
   * 임시 배경색을 등록하고 해제 함수를 돌려준다.
   * 여러 컴포넌트가 동시에 등록하면 가장 마지막에 등록한 색이 적용된다.
   */
  registerRootBackgroundOverride: (backgroundColor: string) => () => void;
}

const RootBackgroundContext =
  createContext<RootBackgroundContextValueTypes | null>(null);

export default RootBackgroundContext;
