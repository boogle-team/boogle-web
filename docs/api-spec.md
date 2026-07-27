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
- 에러 응답은 [공통 에러 응답](#공통-에러-응답)을 따른다 (400은 year/month 누락·형식 오류·범위(1~12) 초과)

[일별 기록 조회] (스펙 미확정 - 목데이터 사용 중)
: 선택한 날짜의 부글 기록 목록과 생활 기록을 조회

- 엔드포인트: 미정
- http 메소드: GET
- 프론트 기대 응답: `{ date, boogleRecords: BoogleRecord[], lifeRecord: LifeRecord | null }`

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
