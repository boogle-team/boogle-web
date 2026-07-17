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

[]

- 엔드포인트:
- http 메소드:

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
