import { MOCK_HOME_RESPONSE } from '@/pages/home/constants/mockHomeData';
import type { HomeResponseTypes } from '@/pages/home/types/homeTypes';

export const getMockHome = async (): Promise<HomeResponseTypes> =>
  Promise.resolve(MOCK_HOME_RESPONSE);
