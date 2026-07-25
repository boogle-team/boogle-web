import { MOCK_HOME_RESPONSE } from '../constants/mockHomeData';
import type { HomeResponseTypes } from '../types/homeTypes';

export const getMockHome = async (): Promise<HomeResponseTypes> =>
  Promise.resolve(MOCK_HOME_RESPONSE);
