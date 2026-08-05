export type PushTokenRequestStatusTypes =
  | 'success'
  | 'unsupported'
  | 'permissionDenied'
  | 'permissionDismissed'
  | 'serviceWorkerUnavailable'
  | 'messagingUnavailable'
  | 'tokenUnavailable'
  | 'failed';

export interface PushTokenRequestResultTypes {
  status: PushTokenRequestStatusTypes;
  token: string | null;
}
