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
