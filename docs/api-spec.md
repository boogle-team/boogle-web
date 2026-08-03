## 홈

[홈 화면 메인]
: 오늘의 기록 요약과 사용자 정보를 조회

- 엔드포인트: /api/v1/home
- http 메소드: GET
- Success Status: 200 okay

## 회원가입, 로그인

[소셜 로그인 시작]
: Google 또는 Kakao OAuth 인증 페이지로 사용자를 리다이렉트

- 엔드포인트:/api/v1/auth/oauth/{provider}
- http 메소드:GET

[개인정보 동의 후 회원가입 완료]
: 개인정보 동의 내역을 저장한 후 신규 회원을 생성하고 로그인 토큰 발급

- 엔드포인트:/api/v1/auth/signup
- http 메소드:POST

[동일 이메일 소셜 계정 연동]
: 동일 이메일 기존 회원에게 새로운 소셜 계정을 연결하고 로그인 토큰 발급

- 엔드포인트:/api/v1/auth/social-link
- http 메소드:POST

[온보딩 정보 저장]
: 닉네임, 프로필 이미지, 성별, 나이대, 평소 배변 타입 저장

- 엔드포인트:/api/v1/users/me/onboarding
- http 메소드:POST

[회원탈퇴]
: 회원과 연결된 개인정보 및 서비스 데이터 전체 삭제

- 엔드포인트:/api/v1/users/me
- http 메소드:DELETE

[로그아웃]

- 엔드포인트:/api/v1/auth/logout
- http 메소드:POST

[토큰 재발급]

- 엔드포인트:/api/v1/auth/refresh
- http 메소드:POST

[온보딩 정보 조회]

- 엔드포인트:/api/v1/users/me/onboarding
- http 메소드: GET

[내 정보 조회]

- 엔드포인트:/api/v1/users/me
- http 메소드:GET

[내 정보 수정]

- 엔드포인트:/api/v1/users/me
- http 메소드:PATCH

[민감정보 수집 동의 조회]

- 엔드포인트:/api/v1/users/me/sensitive-info-consent
- http 메소드:GET

[민감정보 수집 동의 변경]

- 엔드포인트:/api/v1/users/me/sensitive-info-consent
- http 메소드:PATCH

[소셜 로그인 OAuth 콜백]

- 엔드포인트:/api/v1/auth/oauth/{provider}/callback
- http 메소드:GET

[소셜 로그인 결과 교환]

- 엔드포인트:/api/v1/auth/oauth/exchange
- http 메소드:POST

## 캘린더

[]

- 엔드포인트:
- http 메소드:

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
- 주의 신호 섹션(W): 사용자 기록과 무관하게 활성 가이드 전체가 반환된다.
- guide_rules는 조회하지 않는다. 상세 조회(G102)에는 여전히 `feedbackStatus`가 없다.
- 주간 패턴은 R101과 동일한 detector 결과를 사용한다.
- 에러 코드: 401 `TOKEN_REQUIRED` / `TOKEN_INVALID` / `TOKEN_EXPIRED`, 500 `GUIDE_FETCH_FAILED`

[가이드 상세 조회]
: 가이드 본문, 조언, 추천 가이드, 패턴 근거를 조회

- 엔드포인트: /api/v1/guides/{guideContentId}
- http 메소드: GET
- Success Status: 200 OK
- 응답 data: `guideId`, `category`, `categoryLabel`, `title`, `summary`, `source`, `contents[]`, `advices[]`, `recommendedGuides[]`, `patternReason`
- `source`는 항상 포함되며 DB 값이 없으면 `null`
- `patternReason`과 `feedbackStatus`는 P 가이드에만 포함된다. H / W는 `patternReason`이 `null`이고 `feedbackStatus` 필드 자체가 없다.
- `feedbackStatus`: `G` / `A` / `N` / `null`
  - `period`(주간), `recordStatus`(`dataStatus` `ENOUGH` 등, `recordedDays`, `requiredDays`, `completionScore`), `matched`, `matchedRuleCodes`, `matchedPatterns[]`(`evidence[]` 포함)
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
- 에러 코드: 400 `GUIDE_INVALID_ID` / `GUIDE_INVALID_FEEDBACK`, 401 `TOKEN_REQUIRED` / `TOKEN_INVALID` / `TOKEN_EXPIRED`, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE`, 409 `GUIDE_FEEDBACK_ALREADY_EXISTS`, 500 `GUIDE_FEEDBACK_CREATE_FAILED`

[가이드 피드백 수정]
: 이미 등록된 피드백의 값을 변경

- 엔드포인트: /api/v1/guides/{guideId}/feedback
- http 메소드: PATCH
- Success Status: 200 OK
- 요청 body: 등록과 동일 (`{ "feedback": "A" }`)
- 응답 data: 등록 응답 + `updatedAt`
- 에러 코드: 400 `GUIDE_INVALID_ID` / `GUIDE_INVALID_FEEDBACK`, 401 토큰 3종, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE` / `GUIDE_FEEDBACK_NOT_FOUND`, 500 `GUIDE_FEEDBACK_UPDATE_FAILED`
- 등록은 409(이미 존재), 수정은 404 `GUIDE_FEEDBACK_NOT_FOUND`(아직 없음)로 서로 대칭이다.

[가이드 피드백 삭제]
: 등록된 피드백을 삭제

- 엔드포인트: /api/v1/guides/{guideId}/feedback
- http 메소드: DELETE
- Success Status: 200 OK (body 있음)
- 응답 data: `guideFeedbackId`(string), `guideId`, `deleted`
- 이미 삭제되었거나 등록되지 않은 피드백이면 404 `GUIDE_FEEDBACK_NOT_FOUND`
- 에러 코드: 400 `GUIDE_INVALID_ID`, 401 토큰 3종, 404 `GUIDE_CONTENT_NOT_FOUND` / `GUIDE_CONTENT_INACTIVE` / `GUIDE_FEEDBACK_NOT_FOUND`, 500 `GUIDE_FEEDBACK_DELETE_FAILED`

> `guideFeedbackId`는 JavaScript 정밀도 손실 방지를 위해 bigint → string으로 반환된다. 숫자로 변환해 쓰지 말 것.

## 리포트

[]

- 엔드포인트:
- http 메소드:

## 알림

[]

- 엔드포인트:
- http 메소드:

## 생활기록

[]

- 엔드포인트:
- http 메소드:

## 부글 기록

[]

- 엔드포인트:
- http 메소드:
