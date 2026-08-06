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

[]

- 엔드포인트:
- http 메소드:

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

[]

- 엔드포인트:
- http 메소드:
