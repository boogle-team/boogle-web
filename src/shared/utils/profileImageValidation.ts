import { PROFILE_IMAGE_MAX_SIZE } from '@/shared/constants/profileImageConstants';

const SUPPORTED_PROFILE_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const isValidProfileImage = (imageFile: File) =>
  SUPPORTED_PROFILE_IMAGE_TYPES.has(imageFile.type) &&
  imageFile.size <= PROFILE_IMAGE_MAX_SIZE;
