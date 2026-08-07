type LiteralUnionTypes<T extends string> = T | (string & {});

// TOKEN_REQUIRED는 스펙 문서에 없지만 실제 서버가 내려주는 401 코드다.
export type ApiErrorCodeTypes = LiteralUnionTypes<
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'TOKEN_REQUIRED'
  | 'INTERNAL_SERVER_ERROR'
  | 'SOCIAL_ACCOUNT_LINK_REQUIRED'
  | 'AUTH_ACCOUNT_LINK_TOKEN_REQUIRED'
  | 'AUTH_INVALID_ACCOUNT_LINK_TOKEN'
  | 'AUTH_ACCOUNT_LINK_TOKEN_EXPIRED'
  | 'AUTH_WITHDRAWN_USER'
  | 'SOCIAL_LOGIN_FAILED'
>;

export interface ApiResponseTypes<T> {
  success: true;
  data: T;
  message: string;
}

export interface ApiErrorResponseTypes<T = unknown> {
  success: false;
  code: ApiErrorCodeTypes;
  message: string;
  data?: T;
}
