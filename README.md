# BOOGLE-FE

## 📌 프로젝트 소개

부글은

## 👥 팀원 및 프론트엔드 역할 분담

| 이름        | GitHub                                     | 역할                                         |
| ----------- | ------------------------------------------ | -------------------------------------------- |
| 시연 (팀장) | [@username1](https://github.com/username1) | 팀 리딩, 공통 레이아웃 / 상태관리 / API 연동 |
| 팀원 2      | [@username2](https://github.com/username2) | 화면 A, 화면 B 퍼블리싱 및 기능 구현         |
| 팀원 3      | [@username3](https://github.com/username3) | 화면 C, 화면 D 퍼블리싱 및 기능 구현         |
| 팀원 4      | [@username4](https://github.com/username4) | WebSocket 연동, 공용 컴포넌트 설계           |

| 리치/김시연 (팀장)                           | 지오/김지오                            | 곤/유민형                            | 호수/이수호                              |
| -------------------------------------------- | -------------------------------------- | ------------------------------------ | ---------------------------------------- |
| [@lycheelove](https://github.com/lycheelove) | [@zio0225](https://github.com/zio0225) | [@yuuumh](https://github.com/yuuumh) | [@Sohoo122](https://github.com/Sohoo122) |

## 🛠 기술 스택

| 분류            | 기술           |
| --------------- | -------------- |
| Framework       | React          |
| Build Tool      | Vite           |
| Package Manager | pnpm           |
| HTTP Client     | Axios          |
| Styling         | Tailwind CSS   |
| 전역 상태관리   | Zustand        |
| 서버 상태관리   | TanStack Query |
| 배포            | Vercel         |

## 📁 폴더 구조

추후 업데이트 예정입니다.

## 🌿 Git 컨벤션

### 브랜치 전략 (`main`, `develop`, `feat`)

1️⃣ **`main`(=`master`)** : 오직 배포를 위한 브랜치
2️⃣ **`develop`** : 팀원끼리 작업한 내용(feature)를 합치는 곳
3️⃣ **`feat`** : 각 작업에 따라 새로 파고 사용할 브랜치

> 하나의 `feat` 브랜치는 하나의 Issue와 연결됩니다.

### 브랜치 네이밍 컨벤션

```
커밋컨벤션/페이지 or 기능 이름
```

- 페이지 or 기능 이름은 기능 중심 명사로 작성하며, 너무 길어지지 않도록 합니다.
- 여러 단어가 연결될 경우 `-`로 연결합니다.

**예시**

- `setting/router-setting`
- `feat/login`
- `fix/register-form-bug-fix`

**브랜치 생성 방법**

```bash
# 브랜치 생성 + 이동 🚨 develop에서 만들었는지 무조건 확인하기 👀
$ git checkout -b feat/{기능명}
```

### 커밋 컨벤션

**기본 양식**

```
커밋컨벤션: 커밋 메시지 (#이슈번호)
```

> 이슈 번호를 매번 작성하는 게 번거롭다는 의견이 있어 선택 사항으로 합니다.

**예시**

- `setting: eslint 설치 (#10)`
- `feat: login form 구현 (#4)`
- `api: 소리 필터링 api 연결 (#1)`
- `refactor: image upload 로직 커스텀훅으로 분리 (#12)`

| 머릿말             | 설명                                                            |
| ------------------ | --------------------------------------------------------------- |
| `setting`          | 패키지 설치, 개발 설정                                          |
| `feat`             | 새로운 기능 추가 / 퍼블리싱                                     |
| `fix`              | 버그 수정                                                       |
| `style`            | CSS 등 사용자 UI 디자인 변경                                    |
| `api`              | api 연결 로직 작성                                              |
| `refactor`         | 프로덕션 코드 리팩토링, QA 반영                                 |
| `chore`            | 빌드 테스트 업데이트, 패키지 매니저 설정 (프로덕션 코드 변경 X) |
| `deploy`           | 배포 작업                                                       |
| `comment`          | 필요한 주석 추가 및 변경                                        |
| `test`             | 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)             |
| `rename`           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우              |
| `remove`           | 파일을 삭제하는 작업만 수행한 경우                              |
| `docs`             | 문서 수정                                                       |
| `!HOTFIX`          | 코드 포맷 변경, 세미콜론 누락 등 코드 수정이 없는 경우          |
| `!BREAKING CHANGE` | 커다란 API 변경의 경우                                          |

### 브랜치 병합(Merge) & 기본 규칙

1. 메인 브랜치(`main`, `develop`)에는 직접 커밋하지 않습니다.
2. 모든 커밋은 작업 브랜치(`feat`)에서만 진행하며, 브랜치 병합(merge)은 PR(Pull Request)을 통해서만 가능합니다.
3. 작업 전에는 항상 `git pull origin develop`을 통해 각 feature 브랜치를 최신화해서 관리합니다.
4. 팀원들의 리뷰 이후 최소 1명 이상의 approve를 받아야 merge할 수 있습니다.

## 🚀 실행 방법

```bash
# 저장소 클론
$ git clone https://github.com/{organization}/HEARING-FE.git
$ cd HEARING-FE

# 패키지 설치
$ pnpm install

# 개발 서버 실행
$ pnpm dev

# 빌드
$ pnpm build
```

## 🖥 화면 목록 및 플로우

추후 업데이트 예정입니다.
