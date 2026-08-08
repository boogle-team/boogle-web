export interface PushTokenRequestTypes {
  token: string;
}

export interface PostPushTokenDataTypes {
  token: string;
}

export interface PostPushTokenResponseTypes {
  success: boolean;
  data: PostPushTokenDataTypes;
  message: string;
}

export interface DeletePushTokenDataTypes {
  deleted: boolean;
}

export interface DeletePushTokenResponseTypes {
  success: boolean;
  data: DeletePushTokenDataTypes;
  message: string;
}
