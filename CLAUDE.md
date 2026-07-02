# Projct: Boogle (배변 트래킹 pwa 웹앱)

## Critical Rules (절대 규칙)

- .env 등 시크릿 파일 절대 커밋 금지
- main 브랜치에 직접 push 금지 - 반드시 PR을 통해 머지

## Architecture (아키 텍쳐)

```
project-root
├── public
│   └── icons
└── src
    ├── layout # 🧱 공통 레이아웃 컴포넌트 (Header, Footer 등)
    │   └── 📄 Navigation.tsx
    ├── pages # 📄 라우팅 페이지 디렉토리
    │   ├── calender # 캘린더 페이지
    │   ├── guide # 가이드 페이지
    │   ├── home # 🏠 기본 홈페이지
    │   │   ├── apis
    │   │   ├── components
    │   │   ├── constants
    │   │   ├── hooks
    │   │   ├── types
    │   │   └── utils
    │   ├── login # 로그인 페이지
    │   └── report # 리포트 페이지
    ├── routes # 🗺️ 라우팅 설정
    └── shared # ♻️ 전역 공통 코드
        ├── apis # 공통 API 함수
        ├── assets # 정적 리소스 (이미지, 아이콘 등)
        ├── components # 재사용 가능한 공통 컴포넌트
        ├── constants # 공통 상수
        ├── hooks # 공통 커스텀 훅
        ├── styles # 전역 스타일 및 테마
        ├── types # 공통 타입 정의
        └── utils # 공통 유틸 함수
```

## Tech Stack (기술 스택)

- Frontend: React + Vite + TypeScript + pnpm + Tailwind CSS + TanStack Query + zustand

## Build & Test Commands (빌드 / 테스트)

```bash
pnpm install # 의존성 설치
pnpm run dev # start web
```

## Domain Context (도메인 컨텍스트)

## 프로젝트 문서

- 코딩 컨벤션: @docs/conventions.md
- API 문서: @docs/api-spec.md
- mermaid architecture: @docs/architecture.md
