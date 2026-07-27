type LiteralUnionTypes<T extends string> = T | (string & {});

export type ApiErrorCodeTypes = LiteralUnionTypes<
  'BAD_REQUEST' | 'UNAUTHORIZED' | 'INTERNAL_SERVER_ERROR'
>;

export interface ApiResponseTypes<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiErrorResponseTypes {
  success: false;
  code: ApiErrorCodeTypes;
  message: string;
}
