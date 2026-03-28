# Project Context - Session 1

**Saved Date**: 2026-03-28
**Session File**: context_1.md

---

## 대화 요약 (Conversation Summary)

Claude Code(CLI)와 Claude Desktop의 전체 기능을 정리하는 한국어 학습 웹사이트를 Next.js 15 + Tailwind CSS v4 + shadcn/ui 스택으로 구축하였다. 초급/고급 코스 각 10레슨, 총 100+ 퀴즈 문항, 기능 카탈로그(30+ 항목), 학습 로드맵을 포함하는 풀 스택 정적 사이트를 빌드 성공 상태까지 완성하였다.

---

## 주요 작업 내역 (Key Tasks & Decisions)

- Next.js 15 (App Router, TypeScript) 프로젝트 초기화
- Tailwind CSS v4 및 shadcn/ui (base-ui 기반 최신 버전) 설정
- 6개 페이지 구현: 랜딩(`/`), 기능 카탈로그(`/features`), 코스 개요(`/course/[track]`), 레슨 상세(`/course/[track]/[lessonId]`), 학습 로드맵(`/roadmap`)
- 초급 레슨 10개 + 고급 레슨 10개, 각 레슨에 5문항 퀴즈 (추천 문항 ★ 표시 포함)
- localStorage 기반 학습 진행 상황 저장 (`src/lib/progress.ts`)
- 반응형 네비게이션 헤더 (모바일 메뉴는 순수 HTML/React state 기반으로 재작성)
- 기술 스택을 Vite + Vanilla JS에서 Next.js로 사용자 요청에 따라 변경
- 디스크 공간 부족(ENOSPC) 이슈 → 사용자가 40GB 확보 후 재설치

---

## 코드 및 파일 변경사항 (Code & File Changes)

### 생성된 주요 파일 구조

```
/Users/developerpeace/Desktop/claudepractice/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # 랜딩 페이지 (히어로, 코스 카드, 통계)
│   │   ├── layout.tsx                        # 루트 레이아웃
│   │   ├── features/page.tsx                 # 기능 카탈로그 (검색/필터)
│   │   ├── course/[track]/page.tsx           # 코스 개요 + 진행률
│   │   ├── course/[track]/[lessonId]/page.tsx # 레슨 상세 + 퀴즈
│   │   └── roadmap/page.tsx                  # 학습 로드맵 타임라인
│   ├── components/
│   │   ├── header.tsx                        # 네비게이션 (모바일 반응형)
│   │   ├── footer.tsx
│   │   ├── quiz.tsx                          # 퀴즈 컴포넌트
│   │   └── ui/                              # shadcn/ui 컴포넌트들
│   ├── data/
│   │   ├── features.ts                       # 30+ 기능 카탈로그 데이터
│   │   ├── courses.ts                        # 코스 메타데이터
│   │   ├── roadmap.ts                        # 로드맵 데이터
│   │   ├── types.ts                          # TypeScript 인터페이스
│   │   ├── beginner/                         # lesson01~10.ts + index.ts
│   │   └── advanced/                         # lesson01~10.ts + index.ts
│   └── lib/
│       ├── progress.ts                       # localStorage 진행률 관리
│       └── utils.ts                          # shadcn 유틸
├── components.json                           # shadcn/ui 설정
├── next.config.ts
├── tailwind.config (v4 inline)
└── tsconfig.json
```

### 주요 이슈 해결

| 이슈 | 해결 방법 |
|------|----------|
| `ENOSPC` (디스크 공간 부족) | 사용자가 직접 40GB 확보 후 `npm install` 재실행 |
| `shadcn/ui Button`의 `asChild` 미지원 | `buttonVariants()` + `<Link>` 직접 스타일링으로 대체 |
| 레슨 데이터 import 경로 오류 | `@/types/lesson` → `../types` 일괄 수정 |
| `Sheet` 컴포넌트 `asChild` 미지원 | Header를 순수 HTML + React `useState` 기반 모바일 메뉴로 재작성 |

---

## 현재 상태 (Current State)

- 빌드 성공 (Next.js 빌드 완료)
- 개발 서버 실행 중: http://localhost:3000
- 초급 레슨 10개 + 고급 레슨 10개 모두 완성
- 퀴즈 100+ 문항 생성 완료 (각 레슨당 5문항, 추천 문항 ★ 표시)
- 반응형 디자인 적용 완료

---

## 다음 단계 (Next Steps)

- 실제 서비스 배포 (Vercel 등) 검토
- 퀴즈 결과 통계/리포트 기능 추가 검토
- SEO 메타데이터 보강
- 다크 모드 지원 검토
- 추가 레슨 콘텐츠 심화 작업

---

## 전체 대화 내용 (Full Conversation Log)

### 초기 요청
사용자가 Claude Code(CLI)와 Claude Desktop의 기능을 학습할 수 있는 웹사이트 제작을 요청하였다. 초급/고급 코스 분리, 객관식 퀴즈(추천 문항 포함), 학습 로드맵, 기능 카탈로그를 핵심 기능으로 요구하였다.

### 기술 스택 결정
초기에 Vite + Vanilla JS를 제안하였으나 사용자가 Next.js + Tailwind CSS + shadcn/ui로 변경 요청하였다. 이에 따라 Next.js 15 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui 구성으로 진행하였다.

### 개발 과정
1. 프로젝트 초기화 및 의존성 설치 중 ENOSPC 오류 발생 → 사용자 디스크 정리 후 재설치
2. 페이지 구조 설계 및 데이터 타입 정의 (`types.ts`)
3. 기능 카탈로그 데이터 30+ 항목 작성 (`features.ts`)
4. 초급/고급 각 10개 레슨 데이터 작성 (레슨 내용 + 퀴즈 5문항)
5. 모든 페이지 컴포넌트 구현
6. shadcn/ui 컴포넌트 호환성 이슈 수정 (asChild, Sheet 등)
7. Header 모바일 메뉴 재작성 (순수 React state 기반)
8. 빌드 성공 확인

### 코스 구성 상세

**초급 코스 (10레슨)**
1. Claude Code 소개 및 설치
2. 기본 채팅과 파일 읽기
3. 파일 편집과 코드 생성
4. 슬래시 명령어 마스터하기
5. CLAUDE.md로 프로젝트 설정
6. Git 기본 작업 자동화
7. VS Code 확장 프로그램 활용
8. 권한 모드와 보안 이해
9. 웹 검색과 세션 관리
10. Desktop 앱 기본 기능

**고급 코스 (10레슨)**
1. MCP 서버 이해와 설정
2. Hooks 시스템 심화
3. 커스텀 에이전트와 팀
4. Skills와 플러그인 생태계
5. Plan 모드와 Headless 모드
6. Git 워크트리와 배치 작업
7. 브라우저 자동화와 스케줄링
8. 엔터프라이즈와 원격 제어
9. Extended Thinking과 모델 설정
10. Desktop 고급: 컴퓨터 사용과 커넥터
