type LiteralUnionTypes<T extends string> = T | (string & {});

// TOKEN_REQUIRED는 스펙 문서에 없지만 실제 서버가 내려주는 401 코드다.
export type ApiErrorCodeTypes = LiteralUnionTypes<
  'BAD_REQUEST' | 'UNAUTHORIZED' | 'TOKEN_REQUIRED' | 'INTERNAL_SERVER_ERROR'
>;

export interface ApiResponseTypes<T> {
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponseTypes {
  success: false;
  code: ApiErrorCodeTypes;
  message: string;
}
