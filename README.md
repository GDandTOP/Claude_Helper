# Claude Helper

Claude Code **CLI**와 **Desktop**의 기능을 문서만 보지 않고, **코스·퀴즈·진행률**으로 익히도록 만든 웹 가이드입니다.  
Next.js(App Router) 기반이며 UI는 한국어(`lang="ko"`)로 제공됩니다.

**저장소:** [github.com/GDandTOP/Claude_Helper](https://github.com/GDandTOP/Claude_Helper)

---

## 목표

- 입문자: 설치부터 채팅·파일 편집·슬래시 명령·`CLAUDE.md`·Git·권한·세션까지 **초급 10강**으로 정리합니다.  
- 숙련자: MCP, Hooks, 에이전트, Plan/Headless, 워크트리, 엔터프라이즈 등 **고급 10강**으로 확장합니다.  
- 홈에서는 코스 카드와 **완료 진행률**을 보여 주고, 강마다 **퀴즈**와 **localStorage** 기반 학습 기록을 남깁니다.

---

## 제공 화면

| 경로 | 역할 |
|------|------|
| `/` | 대시보드: 초급·고급 코스 소개, 트랙별 진행률 |
| `/course/[track]` | `beginner` \| `advanced` — 강 목록 |
| `/course/[track]/[lessonId]` | 강의 본문 + 퀴즈 |
| `/roadmap` | 학습 로드맵 |
| `/commands` | 명령어 모음 |
| `/features` | 기능 하이라이트 |

---

## 스택

| 영역 | 선택 |
|------|------|
| 런타임 | React 19, Next.js 16 |
| 스타일 | Tailwind CSS 4, `tw-animate-css` |
| UI | shadcn 스키마(`components.json`, 스타일 `base-nova`), Base UI, CVA·clsx·tailwind-merge |
| 아이콘 | Lucide |
| 폰트 | Geist / Geist Mono (`next/font`) |
| 언어 | TypeScript 5 |
| 검사 | ESLint 9 + `eslint-config-next` |

---

## 요구 사항

- **Node.js** — Next 16과 호환되는 버전(권장: 최신 LTS)  
- 패키지 잠금: **`pnpm-lock.yaml`** 기준으로 **`pnpm`** 사용을 권장합니다.

---

## 클론 후 실행

```bash
git clone https://github.com/GDandTOP/Claude_Helper.git
cd Claude_Helper
pnpm install
pnpm dev
```

브라우저에서 **http://localhost:3000** 을 엽니다.

`npm` / `yarn` / `bun` 사용자는 각각 `install` 후 `npm run dev` 등으로 동일하게 실행할 수 있습니다.

---

## npm 스크립트

| 명령 | 설명 |
|------|------|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | `build` 산출물 실행 |
| `pnpm lint` | ESLint |

배포 전에는 `pnpm build`로 로컬에서 빌드가 통과하는지 확인하는 것을 권장합니다.

---

## 디렉터리 구조

```
├── public/                 # 정적 파일
├── sc/
│   └── README.md           # SuperClaude `sc` 슬래시 명령 설명(한글)
├── src/
│   ├── app/                # App Router 페이지·레이아웃·전역 CSS
│   ├── components/         # Header, Footer, Quiz, UI primitives
│   ├── data/               # 코스 메타, beginner/advanced 강별 데이터, roadmap, commands, features
│   └── lib/                # utils, progress(localStorage)
├── components.json         # shadcn/ui 설정
├── next.config.ts
├── package.json
└── tsconfig.json
```

**진행률:** `src/lib/progress.ts`에서 `localStorage` 키 `claude-learning-progress`로 초급·고급 트랙별 완료·퀴즈 점수를 저장합니다.

---

## 환경 변수

기본 로컬 실행에는 **필수 `.env`가 없습니다.**  
배포 시 API 키 등을 붙인다면 `.gitignore`에 맞춰 `.env.local` 등을 사용하면 됩니다.

---

## 배포

Next.js 표준 방식으로 **Vercel** 등에 연결하거나, `pnpm build` 후 `pnpm start`로 Node 서버에 올리면 됩니다.  
공식 문서: [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 관련 문서

- [SuperClaude `sc` 명령 (한글)](./sc/README.md)

---

## 기여

이슈·PR 환영합니다. 변경은 가능하면 **타입·기존 컴포넌트 패턴**을 유지해 주세요.

---

## 라이선스

저장소 루트에 `LICENSE` 파일이 있으면 그 조건을 따릅니다. 없다면 조직/개인 정책에 맞게 추가하면 됩니다.
