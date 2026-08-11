## 홈

[홈 화면 메인]
: 오늘의 기록 요약과 사용자 정보를 조회

- 엔드포인트: /api/v1/home
- http 메소드: GET
- Success Status: 200 okay
- response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 10,
      "nickname": "ㄹㅊㄹㅊ",
      "userType": null,
      "userTypeLabel": null,
      "joinedDays": 1
    },
    "today": {
      "date": "2026-08-04",
      "greeting": "오늘의 첫 기록을 남겨보세요"
    },
    "streak": 0,
    "weekStrip": [
      {
        "date": "2026-08-02",
        "hasRecord": false
      },
      {
        "date": "2026-08-03",
        "hasRecord": false
      },
      {
        "date": "2026-08-04",
        "hasRecord": false
      },
      {
        "date": "2026-08-05",
        "hasRecord": false
      },
      {
        "date": "2026-08-06",
        "hasRecord": false
      },
      {
        "date": "2026-08-07",
        "hasRecord": false
      },
      {
        "date": "2026-08-08",
        "hasRecord": false
      }
    ],
    "boogleCount": 0,
    "boogleRecords": [],
    "lifeRecord": null,
    "weeklyPattern": null
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

[홈 날짜별 상태 요약]
: 홈 캘린더 스트립/날짜 모달용 날짜별 상태 요약 (baseDate ±30일)

- 엔드포인트: /api/v1/home/summary
- http 메소드: GET
- 요청 파라미터 (query)
  - `baseDate`: 조회 기준일 (`YYYY-MM-DD`)
  - `range`: 기준일 전후 조회 일수 (number, 프론트는 항상 `30`을 함께 전송)
- 응답 범위: `baseDate` 기준 전후 `range`일 (기본 ±30일)
- Success Status: 200 okay
- response:

```json
{
  "success": true,
  "data": {
    "baseDate": "2026-08-04",
    "days": [
      {
        "date": "2026-07-05",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-06",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-07",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-08",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-09",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-10",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-11",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-12",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-13",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-14",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-15",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-16",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-17",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-18",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-19",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-20",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-21",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-22",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-23",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-24",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-25",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-26",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-27",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-28",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-29",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-30",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-07-31",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-01",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-02",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-03",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-04",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-05",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-06",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-07",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-08",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-09",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-10",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-11",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-12",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-13",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-14",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-15",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-16",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-17",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-18",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-19",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-20",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-21",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-22",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-23",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-24",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-25",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-26",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-27",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-28",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-29",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-30",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-08-31",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-09-01",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-09-02",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      },
      {
        "date": "2026-09-03",
        "boogleStatus": "NONE",
        "hasLifeRecord": false
      }
    ]
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

## 회원가입, 로그인

[소셜 로그인 시작]
: Google 또는 Kakao OAuth 인증 페이지로 사용자를 리다이렉트

- 엔드포인트:/api/v1/auth/oauth/{provider}
- http 메소드:GET
- provider는 google, kakao 중 하나
- code 302: Google 또는 Kakao OAuth 인증 페이지로 이동
- code 400: 지원하지 않는 OAuth 제공자
- code 500: OAuth 요청 생성 실패

[소셜 로그인 OAuth 콜백]
: authorization code를 처리하고 일회용 oauthResultCode를 프론트 콜백으로 전달

- 엔드포인트:/api/v1/auth/oauth/{provider}/callback
- http 메소드:GET
- provider는 string - google, kakao 중 하나 *required
- code (string): 소셜 제공자가 발급한 인증 코드
- state (string): 로그인 요청의 CSRF 방지 값
- error (string): 소셜 제공자가 전달한 오류 코드
- errorDescription (string): 소셜 제공자의 오류 설명
- code 302: 일회용 OAuth 결과 코드 또는 오류 코드와 함께 프론트로 이동

[소셜 로그인 결과 교환]

- 엔드포인트:/api/v1/auth/oauth/exchange
- http 메소드:POST
- request body: *required `{
"oauthResultCode": "oauth-result-code-value"
}`
- code 200: 로그인 성공 및 HOME 또는 ONBOARDING_REQUIRED 이동 정보
- response body:

```json
{
  "success": true,
  "data": {
    "accessToken": "",
    "refreshToken": "",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 1209600,
    "isNewUser": false,
    "user": {
      "id": 3,
      "email": "siyeon9302@gmail.com",
      "nickname": "김시연",
      "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocIqzqzHUd9md4zb8sktXbh3TwlZrgOaWn1N917CPwc6Csu3_Yw=s96-c",
      "profileImageSource": "SOCIAL",
      "gender": null,
      "ageGroup": null,
      "baselineType": null,
      "sensitiveInfoAgreed": false
    },
    "nextAction": "ONBOARDING_REQUIRED",
    "onboardingCompleted": false
  },
  "message": "로그인했습니다. 프로필을 입력해주세요."
}
```

409 response body:

```json
{
  "success": false,
  "code": "SOCIAL_ACCOUNT_LINK_REQUIRED",
  "data": {
    "accountLinkToken": "account-link-token-value",
    "existingProvider": "google",
    "requestedProvider": "kakao",
    "maskedEmail": "m****r@example.com",
    "expiresAt": "2026-08-07T12:00:00Z"
  },
  "message": "동일 이메일로 가입된 계정이 있습니다. 소셜 계정 연동이 필요합니다."
}
```

- code 400: OAuth 결과 코드 누락
- code 401: 유효하지 않거나 만료된 결과 코드 또는 미검증 이메일
- code 403: 탈퇴한 회원
- code 409 `SOCIAL_ACCOUNT_LINK_REQUIRED`: 동일 이메일의 다른 소셜 계정 연동 필요

[동일 이메일 소셜 계정 연동]
: 동일 이메일 기존 회원에게 새로운 소셜 계정을 연결하고 로그인 토큰 발급

- 엔드포인트:/api/v1/auth/oauth/link
- http 메소드:POST
- request body:

```json
{
  "accountLinkToken": "account-link-token-value"
}
```

200 response body:

```json
{
  "success": true,
  "data": {
    "accessToken": "access-token-value",
    "refreshToken": "refresh-token-value",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 1209600,
    "isNewUser": false,
    "nextAction": "HOME",
    "onboardingCompleted": true,
    "user": {
      "id": 1,
      "email": "member@example.com",
      "nickname": "부글이",
      "profileImage": null,
      "profileImageSource": null,
      "gender": "N",
      "ageGroup": 20,
      "baselineType": "R",
      "sensitiveInfoAgreed": false
    }
  },
  "message": "소셜 계정이 연동되었습니다."
}
```

error response body:

```json
{
  "success": false,
  "code": "AUTH_INVALID_ACCOUNT_LINK_TOKEN",
  "message": "유효하지 않거나 이미 사용된 계정 연동 토큰입니다."
}
```

- code 200: 계정 연동 및 로그인 성공
- code 400 `AUTH_ACCOUNT_LINK_TOKEN_REQUIRED`: accountLinkToken은 필수입니다.
- code 401 `AUTH_INVALID_ACCOUNT_LINK_TOKEN`: 유효하지 않거나 이미 사용된 계정 연동 토큰입니다.
- code 401 `AUTH_ACCOUNT_LINK_TOKEN_EXPIRED`: 계정 연동 요청이 만료되었습니다. 소셜 로그인을 다시 진행해주세요.
- code 403 `AUTH_WITHDRAWN_USER`: 탈퇴한 사용자는 로그인할 수 없습니다.
- code 409 `SOCIAL_LOGIN_FAILED`: 소셜 계정을 연동할 수 없습니다.
- code 500 `SOCIAL_LOGIN_FAILED`: 소셜 계정 연동 중 오류가 발생했습니다.

[로그아웃]

- 엔드포인트:/api/v1/auth/logout
- http 메소드:POST
- request body: *required `{
"refreshToken": "refresh-token-value"
}`
- code 200: 로그아웃 성공
- code 401: 누락·유효하지 않음·만료된 토큰

[토큰 재발급]

- 엔드포인트:/api/v1/auth/refresh
- http 메소드:POST
- request body: *required `{
"refreshToken": "refresh-token-value"
}`
- response

```json
{
  "success": true,
  "data": {
    "accessToken": "new-access-token-value",
    "refreshToken": "new-refresh-token-value",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 1209600
  },
  "message": "토큰이 재발급되었습니다."
}
```

- code 200: 토큰 재발급 성공
- code 400: refreshToken 누락
- code 401: 유효하지 않거나 만료된 refreshToken

## 온보딩, 계정 관리

[온보딩 정보 저장]
: 닉네임, 프로필 이미지, 성별, 나이대, 평소 배변 타입 저장

- 엔드포인트:/api/v1/users/me/onboarding
- http 메소드:POST
- request body:
  nickname(string) *required
  profileImage (string($binary)) - 선택 이미지(JPEG, PNG, WebP), 최대 50MB
  gender (string) *required
  ageGroup (integer) *required
  baselineType (string) *required
  sensitiveInfoAgreed (boolean) *gender가 F 또는 N일 때 필수
  sensitiveInfoPolicyVersion (string) *gender가 F 또는 N일 때 필수

- code 200: 온보딩 정보 저장 성공
- code 401: 로그인이 필요함
- code 403: 탈퇴한 회원
- code 404: 사용자를 찾을 수 없음
- code 409: 이미 온보딩을 완료한 사용자
- code 413: PROFILE_IMAGE_TOO_LARGE: 프로필 이미지가 최대 허용 용량인 50MB를 초과했습니다.

[온보딩 정보 조회]
: 설정 화면용 사용자 정보·연결된 소셜 계정·가입일 조회

- 엔드포인트:/api/v1/users/me/onboarding
- http 메소드:GET
- 200 success response body:

```json
{
  "success": true,
  "data": {
    "id": 3,
    "nickname": "김시연",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocIqzqzHUd9md4zb8sktXbh3TwlZrgOaWn1N917CPwc6Csu3_Yw=s96-c",
    "profileImageSource": "SOCIAL",
    "gender": null,
    "ageGroup": null,
    "baselineType": null,
    "sensitiveInfoAgreed": false,
    "onboardingCompleted": false
  },
  "message": "온보딩 정보 조회에 성공했습니다."
}
```

- code 200: 온보딩 정보 조회 성공
- code 401: 로그인이 필요함
- code 403: 탈퇴한 회원
- code 404: 사용자를 찾을 수 없음

[내 정보 조회]

- 엔드포인트:/api/v1/users/me
- http 메소드:GET
- 200 success response body:

```json
{
  "success": true,
  "data": {
    "id": 3,
    "email": "siyeon9302@gmail.com",
    "nickname": "김시연",
    "profileImage": "https://lh3.googleusercontent.com/a/ACg8ocIqzqzHUd9md4zb8sktXbh3TwlZrgOaWn1N917CPwc6Csu3_Yw=s96-c",
    "profileImageSource": "SOCIAL",
    "gender": null,
    "ageGroup": null,
    "baselineType": null,
    "sensitiveInfoAgreed": false,
    "onboardingCompleted": false,
    "socialAccounts": [
      {
        "provider": "GOOGLE",
        "maskedEmail": "siye****@gmail.com",
        "linkedAt": "2026-07-20T10:51:05.535Z"
      }
    ],
    "regDate": "2026-07-20T10:51:05.526Z"
  },
  "message": "내 정보 조회에 성공했습니다."
}
```

- code 401: 로그인이 필요함
- code 403: 탈퇴한 회원
- code 404: 사용자를 찾을 수 없음

[내 정보 수정]

- 엔드포인트:/api/v1/users/me
- http 메소드:PATCH
- request body: nickname(string)
  profileImage (string($binary)) - 선택 이미지(JPEG, PNG, WebP), 최대 50MB
  gender (string)
  ageGroup (integer)
  baselineType (string)
- code 200: 내 정보 수정 성공
- code 401: 로그인이 필요함
- code 403: 탈퇴한 회원
- code 404: 사용자를 찾을 수 없음
- code 413: PROFILE_IMAGE_TOO_LARGE: 프로필 이미지가 최대 허용 용량인 50MB를 초과했습니다.

[회원탈퇴]
: 회원과 연결된 개인정보 및 서비스 데이터 전체 삭제

- 엔드포인트:/api/v1/users/me
- http 메소드:DELETE
- request body:

```json
{
  "reason": "RECORDING_INCONVENIENT",
  "confirmation": "탈퇴합니다"
}
```

- code 200: 회원탈퇴 성공
- code 401: 로그인이 필요함
- code 403: 탈퇴한 회원
- code 404: 사용자를 찾을 수 없음

[민감정보 수집 동의 조회]

- 엔드포인트:/api/v1/users/me/sensitive-info-consent
- http 메소드:GET
- code 200:민감정보 수집 동의 상태 조회 성공

```json
{
  "success": true,
  "data": {
    "agreed": true,
    "policyVersion": "2026.06.22",
    "agreedAt": "2026-06-20T10:30:00.000Z",
    "withdrawnAt": null
  },
  "message": "민감정보 수집 동의 상태 조회에 성공했습니다."
}
```

- code 401: 로그인이 필요함
- code 403: 민감정보 동의 기능 사용 불가
- code 404: 사용자를 찾을 수 없음

[민감정보 수집 동의 변경]

- 엔드포인트:/api/v1/users/me/sensitive-info-consent
- http 메소드:PATCH
- request body:

```json
{
  "agreed": true,
  "policyVersion": "2026.07.15"
}
```

- code 200: 민감정보 수집 동의 변경 성공

```json
{
  "success": true,
  "data": {
    "agreed": true,
    "policyVersion": "2026.06.22",
    "agreedAt": "2026-06-20T10:30:00.000Z",
    "withdrawnAt": null
  },
  "message": "민감정보 수집 동의 상태 조회에 성공했습니다."
}
```

- code 401: 로그인이 필요함
- code 403: 민감정보 동의 기능 사용 불가
- code 404: 사용자를 찾을 수 없음

[프로필 이미지 등록 또는 교체]

- 엔드포인트:/api/v1/users/me/profile-image
- http 메소드:PUT
- request body: image (string($binary)) : 필수 이미지(JPEG, PNG, WebP), 최대 50MB
- code 200: 프로필 이미지 등록 또는 교체 성공

```json
{
  "success": true,
  "data": {
    "profileImage": "https://cdn.example.com/profile-images/users/1/id.jpg",
    "profileImageSource": "CUSTOM"
  },
  "message": "프로필 이미지가 변경되었습니다."
}
```

- code 400:이미지 누락 또는 지원하지 않는 이미지 형식
- code 401: 로그인이 필요함
- code 413: PROFILE_IMAGE_TOO_LARGE - 프로필 이미지가 최대 허용 용량인 50MB를 초과했습니다.
- code 500: S3 이미지 저장 실패

[사용자 업로드 프로필 이미지 삭제]

- 엔드포인트:/api/v1/users/me/profile-image
- http 메소드:DELETE
- response body:

```json
{
  "success": true,
  "data": {
    "profileImage": "https://social.example.com/profile.png",
    "profileImageSource": "SOCIAL"
  },
  "message": "프로필 이미지가 삭제되었습니다."
}
```

- code 200: 사용자 업로드 프로필 이미지 삭제 성공
- code 401:로그인이 필요함
- code 500: 프로필 이미지 정보 변경 실패

## 캘린더

[월별 캘린더 조회]
: 해당 월의 날짜별 기록 여부와 월간 요약을 조회

- 엔드포인트: /api/v1/calendar?year={year}&month={month}
- http 메소드: GET
- Success Status: 200 okay
- month는 1~12 (dayjs의 0-based month가 아님)

응답 예시

```json
{
  "success": true,
  "data": {
    "year": 2026,
    "month": 6,
    "days": [
      {
        "date": "2026-06-01",
        "boogleStatus": "BOWEL",
        "hasLifeRecord": true,
        "stoolSimple": "M"
      },
      {
        "date": "2026-06-02",
        "boogleStatus": "NO_BOWEL",
        "hasLifeRecord": false,
        "stoolSimple": null
      },
      {
        "date": "2026-06-03",
        "boogleStatus": "NONE",
        "hasLifeRecord": false,
        "stoolSimple": null
      }
    ],
    "summary": {
      "recordedDays": 10,
      "noBowelDays": 3,
      "unrecordedDays": 17,
      "stoolDistribution": {
        "hard": { "count": 6, "percent": 30 },
        "normal": { "count": 10, "percent": 50 },
        "loose": { "count": 4, "percent": 20 }
      }
    }
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

- boogleStatus: `BOWEL` 배변 기록 있음 / `NO_BOWEL` 배변 없음으로 저장 / `NONE` 부글 기록 없음
- days는 해당 월 전체 날짜를 포함한다 (기록 없는 날은 `NONE`)
- 캘린더 점 마킹 규칙: `BOWEL` → 부글(주황), `hasLifeRecord` → 생활 기록(노랑), `NO_BOWEL` → 배변없음(연주황)
- summary, stoolSimple은 타입만 정의되어 있고 현재 화면에서 사용하지 않음 (리포트/월간 요약 UI 대비)

[일별 기록 조회]
: 선택한 날짜의 부글 기록 목록과 생활 기록을 조회

- 엔드포인트: /api/v1/calendar/daily?date={YYYY-MM-DD}
- http 메소드: GET
- Success Status: 200 okay

응답 예시

```json
{
  "success": true,
  "data": {
    "date": "2026-06-17",
    "boogleRecords": [
      {
        "id": 100,
        "regDate": "2026-06-17T08:30:00",
        "bowelMovementAt": "08:30",
        "hasBowel": true,
        "stoolBristol": 4,
        "stoolSimple": "M",
        "bowelFeeling": "C",
        "stomach": "N",
        "distension": "N",
        "remainingFeeling": "N",
        "urgency": "N",
        "takenTime": 2,
        "amount": "N",
        "color": "B",
        "memo": "어제 회식에서 술을 많이 마셨어요.",
        "autoTags": ["음주", "야식"],
        "tags": [{ "id": 3, "name": "회식" }],
        "updatedAt": null
      }
    ],
    "lifeRecord": {
      "id": 55,
      "regDate": "2026-06-17T21:00:00",
      "sleep": "N",
      "stress": "L",
      "water": "H",
      "waterIntake": 3,
      "mealRegular": "R",
      "sleepTime": 2,
      "exercise": "L",
      "caffeine": "O",
      "medicine": "L",
      "outing": "N",
      "hormone": "N",
      "memo": null,
      "autoTags": [],
      "tags": [{ "id": 7, "name": "야식" }],
      "foods": [{ "id": 2, "name": "기름진 음식" }],
      "updatedAt": null
    }
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

- boogleRecords는 하루 여러 건 가능, lifeRecord는 1건 또는 null
- 기록이 없는 날짜도 404가 아니라 200에 빈 값(`boogleRecords: []`, `lifeRecord: null`)으로 응답한다 (실제 호출로 확인)
- 코드값 라벨 매핑은 `src/shared/components/dailyRecord/constants/dailyRecordLabels.ts` 참고
- 미래 날짜는 프론트에서 호출하지 않는다 (화면이 클라이언트에서 future 상태로 그려짐)
- 부글 기록의 distension / remainingFeeling / urgency / takenTime / amount / color / memo / autoTags / tags는 응답에는 있으나 캘린더 요약 카드에서는 사용하지 않음 (상세 화면 대비)

## 가이드

[가이드 화면 조회]
: 패턴 기반 / 장 건강 / 주의 신호 3개 섹션과 섹션 노출 순서를 조회

- 엔드포인트: /api/v1/guides
- http 메소드: GET
- Success Status: 200 OK
- 응답 data: `sectionOrder`, `patternGuideSection`, `healthGuideSection`, `warningGuideSection`
- 패턴 섹션(P): 주간(`WEEKLY`) 기간, `dataStatus`(`AVAILABLE` / `INSUFFICIENT`), `recordedDays` / `requiredDays`, `notice`, `guides[].matchedRuleCodes`, `guides[].feedbackStatus`
  - 주간 기록이 `requiredDays` 미만이면 `dataStatus`가 `INSUFFICIENT`, `guides`는 빈 배열, `notice.code`는 `GUIDE_WEEKLY_RECORD_NOT_ENOUGH`로 내려온다.
  - `feedbackStatus`(`G` / `A` / `N` / `null`)는 **P 가이드에만** 포함된다. H / W 아이템에는 없다.
  - `feedbackStatus`는 **현재 주 기준**이라 주가 바뀌면 `null`로 돌아온다. 그래서 UI는 이 값만 보고 피드백 칩 노출을 결정한다.
- 주의 신호 섹션(W): 사용자 기록과 무관하게 활성 가이드 전체가 반환된다.
- guide_rules는 조회하지 않는다.
- 주간 패턴은 R101과 동일한 detector 결과를 사용한다.
- 에러 코드: 401 `TOKEN_REQUIRED` / `TOKEN_INVALID` / `TOKEN_EXPIRED`, 500 `GUIDE_FETCH_FAILED`

[가이드 상세 조회]
: 가이드 본문, 조언, 추천 가이드, 패턴 근거를 조회

- 엔드포인트: /api/v1/guides/{guideId}
- http 메소드: GET
- Success Status: 200 OK
- 응답 data: `guideId`, `category`, `categoryLabel`, `title`, `summary`, `source`, `contents[]`, `advices[]`, `recommendedGuides[]`, `patternReason`
- `source`는 항상 포함되며 DB 값이 없으면 `null`
- `patternReason`과 `feedbackStatus`는 P 가이드에만 포함된다. H / W는 `patternReason`이 `null`이고 `feedbackStatus` 필드 자체가 없다.
  - `patternReason`: `period`(주간), `recordStatus`(`dataStatus` `ENOUGH` 등, `recordedDays`, `requiredDays`, `completionScore`), `matched`, `matchedRuleCodes`, `matchedPatterns[]`(`evidence[]` 포함)
  - `feedbackStatus`: `G` / `A` / `N` / `null`. **현재 주에 남긴 피드백만** 반영되며, 주가 바뀌면 `null`로 초기화된다.
- `contents[]` / `advices[]`는 모두 `subtitle`(nullable) + `content` 구조다.
  - H / P: `contents`는 번호 섹션(소제목 + 본문), `advices`는 "이렇게 해보세요" 카드(제목 + 설명)
  - W: `contents[i]`와 `advices[i]`가 **같은 순서로 짝지어져** 증상 카드 한 장을 이룬다. `contents`가 증상 제목·설명, `advices`가 권장 문구·부연 설명
  - `advices[].subtitle`이 `null`이면 `content`가 제목(W에서는 권장 문구) 역할을 한다.
- W 가이드는 DB의 정적 본문, 조언, 출처를 반환한다.
- guide_rules는 조회하지 않는다.
- guideId 범위: 장 건강 1~3, 패턴 기반 101~114, 주의 신호 1001
- 에러 코드: 400 `GUIDE_INVALID_ID`, 401 `TOKEN_REQUIRED` / `TOKEN_INVALID` / `TOKEN_EXPIRED`, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE`, 500 `GUIDE_DETAIL_FETCH_FAILED`

[가이드 피드백 등록]
: 가이드에 대한 사용자 피드백을 최초 1회 등록

- 엔드포인트: /api/v1/guides/{guideId}/feedback
- http 메소드: POST
- Success Status: 201 Created
- 요청 body: `{ "feedback": "G" }` (G: 도움이 됨, A: 이미 알고 있음, N: 잘 모르겠음)
- 응답 data: `guideFeedbackId`(**string**), `guideId`, `feedback`, `regDate`
- 동일 사용자·가이드의 재등록 및 수정은 PATCH를 사용한다. 중복 등록 시 409.
- **피드백은 패턴 기반(P) 가이드에만 허용된다.** H / W에 요청하면 400 `GUIDE_FEEDBACK_NOT_ALLOWED`.
- **피드백은 주 단위로 관리된다.** 409 메시지가 "이번 주에 이미 등록했습니다"이므로, 다음 주에는 같은 가이드에 다시 등록할 수 있다.
- 에러 코드: 400 `GUIDE_INVALID_ID` / `GUIDE_INVALID_FEEDBACK` / `GUIDE_FEEDBACK_NOT_ALLOWED`, 401 토큰 3종, 404 `GUIDE_CONTENT_INACTIVE`, 409 `GUIDE_FEEDBACK_ALREADY_EXISTS`, 500 `GUIDE_FEEDBACK_CREATE_FAILED`

[가이드 피드백 수정]
: 이미 등록된 피드백의 값을 변경

- 엔드포인트: /api/v1/guides/{guideId}/feedback
- http 메소드: PATCH
- Success Status: 200 OK
- 요청 body: 등록과 동일 (`{ "feedback": "A" }`)
- 응답 data: 등록 응답 + `updatedAt`
- 에러 코드: 400 `GUIDE_INVALID_ID` / `GUIDE_INVALID_FEEDBACK` / `GUIDE_FEEDBACK_NOT_ALLOWED`, 401 토큰 3종, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE` / `GUIDE_FEEDBACK_NOT_FOUND`, 500 `GUIDE_FEEDBACK_UPDATE_FAILED`
- 등록은 409(이미 존재), 수정은 404 `GUIDE_FEEDBACK_NOT_FOUND`(아직 없음)로 서로 대칭이다. 판정 기준은 모두 **이번 주**다.

[가이드 피드백 삭제]
: 등록된 피드백을 삭제

- 엔드포인트: /api/v1/guides/{guideId}/feedback
- http 메소드: DELETE
- Success Status: 200 OK (body 있음)
- 응답 data: `guideFeedbackId`(string), `guideId`, `deleted`
- 이번 주에 등록된 피드백이 없거나 이미 삭제되었으면 404 `GUIDE_FEEDBACK_NOT_FOUND`
- 에러 코드: 400 `GUIDE_INVALID_ID` / `GUIDE_FEEDBACK_NOT_ALLOWED`, 401 토큰 3종, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE` / `GUIDE_FEEDBACK_NOT_FOUND`, 500 `GUIDE_FEEDBACK_DELETE_FAILED`

> `guideFeedbackId`는 JavaScript 정밀도 손실 방지를 위해 bigint → string으로 반환된다. 숫자로 변환해 쓰지 말 것.

## 리포트

[]

- 엔드포인트:
- http 메소드:

## 알림

[알림 목록 조회]
: 사용자의 알림 목록과 읽지 않은 알림 수를 조회

- 엔드포인트: /api/v1/notifications
- http 메소드: GET
- Success Status: 200 okay

응답 예시

```json
{
  "success": true,
  "data": {
    "unreadCount": 2,
    "notifications": [
      {
        "id": 101,
        "category": "W",
        "type": "WARNING",
        "title": "주의 신호가 감지되었어요",
        "content": "기록을 확인하고 가이드를 살펴보세요.",
        "linkTo": "GUIDE_WARNING",
        "regDate": "2026-08-06T09:30:00+09:00",
        "isRead": false
      }
    ]
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

- `category`: `W` 주의 알림 / `R` 기록 알림 / `P` 리포트 알림
- `type`: `WARNING` / `RECORD_REMINDER` / `REPORT_READY` / `PDF_SAVED` / `STREAK` / `null`
- `linkTo`: `GUIDE_WARNING` 주의 신호 가이드 / `HOME` 홈 / `REPORT` 리포트
- `unreadCount`는 알림 화면뿐 아니라 홈 상단 알림 뱃지 표시에도 사용한다.
- 프론트는 서버 응답 순서와 관계없이 `regDate` 내림차순으로 다시 정렬한다.
- 알 수 없는 `type` 값은 `category`에 맞는 기본 아이콘으로 표시하고, 알 수 없는 `linkTo` 값은 홈으로 이동한다.
- 현재 응답 구조에는 페이지네이션 필드가 없으므로 전체 알림 목록을 한 번에 받는 것으로 처리한다.

[알림 읽음 처리]
: 선택한 알림을 읽음 상태로 변경하고 갱신된 읽지 않은 알림 수를 조회

- 엔드포인트: /api/v1/notifications/{notificationId}/read
- http 메소드: PATCH
- Success Status: 200 okay

응답 예시

```json
{
  "success": true,
  "data": {
    "id": 101,
    "isRead": true,
    "unreadCount": 1
  },
  "message": "요청이 성공적으로 처리되었습니다."
}
```

- 프론트는 읽지 않은 알림을 누른 경우에만 읽음 처리 API를 호출한다.
- 읽음 처리는 낙관적 업데이트를 적용하고 요청 실패 시 이전 캐시로 롤백한다.
- 성공 응답의 `id`, `isRead`, `unreadCount`를 알림 캐시에 반영하므로 서버는 갱신된 `unreadCount`를 내려줘야 한다.
- 처리 완료 후 알림 목록을 다시 조회해 서버 상태와 동기화한다.

백엔드 확인 필요

- `regDate` 타임존 및 ISO 8601 형식 보장 여부
- `type` 전체 enum 목록과 `null`이 되는 조건
- 페이지네이션 도입 여부
- 이미 읽은 알림에 읽음 처리 API를 다시 호출했을 때의 동작
- 존재하지 않는 `notificationId` 요청의 상태 코드
- 인증 실패 시 오류 코드가 `UNAUTHORIZED`인지 `TOKEN_REQUIRED`인지 여부

## 생활기록

[]

- 엔드포인트:
- http 메소드:

## 부글 기록

- `POST /api/v1/records`, `PATCH /api/v1/records/{id}` 요청의 `regDate`는 기록 대상 날짜인 `YYYY-MM-DD` 형식이다.
- `GET /api/v1/records/{id}` 응답의 `regDate`는 `YYYY-MM-DD` 형식이다.
- `GET /api/v1/calendar/daily?date={YYYY-MM-DD}` 응답 안의 부글 기록 `regDate`는 `YYYY-MM-DDTHH:mm:ss` 형식이다. 프론트에서는 기록 초안에 저장하기 전에 `YYYY-MM-DD`로 정규화한다.
- 배변 시각 `bowelMovementAt`은 타임존 없는 `HH:mm` 형식이며 서버가 KST 시각으로 해석한다.
- `PATCH /api/v1/records/{id}`에서 필드를 생략하면 기존 값을 유지하고, nullable 필드에 `null`을 보내면 기존 값을 삭제한다.
- 배변 없음으로 수정할 때는 `hasBowel: false`와 함께 모든 배변 상세 필드를 `null`로 전송한다.

- 엔드포인트: /api/v1/records, /api/v1/records/{id}
- http 메소드: GET, POST, PATCH, DELETE
