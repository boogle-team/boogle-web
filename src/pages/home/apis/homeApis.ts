import { api } from '@/shared/apis/axiosInstance';
import type { HomeResponseTypes } from '@/pages/home/types/homeTypes';

export const getHome = async () => {
  const { data } = await api.get<HomeResponseTypes>('/api/v1/home');

  return data;
};
