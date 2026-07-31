import { api } from '@/shared/apis/axiosInstance';

import type {
  GetMedicinesRequestTypes,
  GetMedicinesResponseTypes,
  LifeRecordApiSuccessResponseTypes,
} from '../types/lifeRecordApiTypes';

export const getMedicines = async (
  params: GetMedicinesRequestTypes = {},
) => {
  const { data } = await api.get<
    LifeRecordApiSuccessResponseTypes<GetMedicinesResponseTypes>
  >('/api/v1/medicines', { params });

  return data.data;
};
