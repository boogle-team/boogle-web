# BOOGLE-FE

## 📌 프로젝트 소개

추후 추가 예정

<br/>

## 👥 팀원

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/lycheelove">@lycheelove</a></td>
      <td align="center"><a href="https://github.com/zio0225">@zio0225</a></td>
      <td align="center"><a href="https://github.com/yuuumh">@yuuumh</a></td>
      <td align="center"><a href="https://github.com/Sohoo122">@Sohoo122</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/lycheelove"><img src="https://github.com/lycheelove.png" width="150px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/zio0225"><img src="https://github.com/zio0225.png" width="150px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/yuuumh"><img src="https://github.com/yuuumh.png" width="150px;" alt=""/></a></td>
      <td align="center"><a href="https://github.com/Sohoo122"><img src="https://github.com/Sohoo122.png" width="150px;" alt=""/></a></td>
    </tr>
    <tr>
      <th align="center">리치/김시연 (FE 팀장)</th>
      <th align="center">지오/김지오 (FE 팀원)</th>
      <th align="center">곤/유민형 (FE 팀원)</th>
      <th align="center">호수/이수호 (FE 팀원)</th>
    </tr>
  </tbody>
</table>



<br/>

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)



<br/>

## 📁 폴더 구조

추후 업데이트 예정입니다.

<br/>

## 🌿 Git 컨벤션

### 브랜치 전략 (`main`, `develop`, `feat`)

1️⃣ **`main`(=`master`)** : 오직 배포를 위한 브랜치
2️⃣ **`develop`** : 팀원끼리 작업한 내용(feature)를 합치는 곳
3️⃣ **`feat`** : 각 작업에 따라 새로 파고 사용할 브랜치


<br/>

### 브랜치 네이밍 컨벤션

```
커밋컨벤션/페이지 or 기능 이름
```

- 페이지 or 기능 이름은 기능 중심 명사로 작성하며, 너무 길어지지 않도록 한다.
- 여러 단어가 연결될 경우 `-`로 연결한다.

**예시**

- `setting/router-setting`
- `feat/login`

<br/>

### 커밋 컨벤션

**기본 양식**

```
커밋컨벤션: 커밋 메시지 (#이슈번호)
```

> 이슈 번호를 매번 작성하는 게 번거롭다는 의견이 있어 선택 사항으로 함

**예시**

- `setting: eslint 설치 (#10)`
- `feat: login form 구현 (#4)`
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

<br/>

### 브랜치 병합(Merge) & 기본 규칙

1. 메인 브랜치(`main`, `develop`)에는 직접 커밋하지 않는다.
2. 모든 커밋은 작업 브랜치(`feat`)에서만 진행하며, 브랜치 병합(merge)은 PR(Pull Request)을 통해서만 가능하다.
3. 작업 전에는 항상 `git pull origin develop`을 통해 각 feature 브랜치를 최신화해서 관리한다.
4. 최소 1명 이상의 코드 리뷰 및 approve를 받아야 merge할 수 있다.

<br/>


## 🖥 화면 목록 및 플로우

추후 업데이트 예정입니다.
