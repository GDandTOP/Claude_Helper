# Claude Helper

**Claude Code**를 처음 쓰는 사람부터 고급 기능까지, 한 화면에서 **학습·복습**할 수 있도록 만든 **Next.js** 기반 가이드 웹앱입니다.

저장소: [github.com/GDandTOP/Claude_Helper](https://github.com/GDandTOP/Claude_Helper)

---

## 이 프로젝트로 할 수 있는 일

| 영역 | 설명 |
|------|------|
| **코스** | **초급·고급** 두 트랙, 각 **10강** 단위로 Claude Code CLI·Desktop·워크플로를 단계별로 안내합니다. |
| **강의 페이지** | 트랙·강 ID 기반 라우트(`/course/...`)에서 본문·퀴즈를 함께 제공합니다. |
| **진행률** | 브라우저 **localStorage**에 완료·퀴즈 점수 등을 저장해 이어서 학습할 수 있습니다. |
| **로드맵** | 학습 순서와 큰 그림을 한눈에 볼 수 있는 화면입니다. |
| **명령어·기능** | 자주 쓰는 명령·기능을 모아 둔 전용 페이지(`/commands`, `/features`)가 있습니다. |

---

## 기술 스택

| 구분 | 사용 |
|------|------|
| 프레임워크 | **Next.js 16** (App Router) |
| UI | **React 19**, **Tailwind CSS 4** |
| 컴포넌트 | **Base UI**, **shadcn/ui** 스타일 유틸(`class-variance-authority`, `clsx`, `tailwind-merge`) |
| 아이콘 | **lucide-react** |
| 언어 | **TypeScript 5** |

---

## 사전 요구 사항

- **Node.js** — Next 16과 호환되는 버전(권장: 현재 LTS)
- 패키지 매니저: **`pnpm`** 권장(저장소에 `pnpm-lock.yaml` 포함). `npm` / `yarn` / `bun`도 사용 가능합니다.

---

## 설치와 실행

저장소를 받은 뒤 프로젝트 루트에서:

```bash
pnpm install
pnpm dev
```

개발 서버가 뜨면 브라우저에서 **http://localhost:3000** 으로 접속합니다.

다른 패키지 매니저 예시:

```bash
npm install && npm run dev
# 또는
yarn && yarn dev
```

---

## npm 스크립트

| 명령 | 설명 |
|------|------|
| `pnpm dev` | 개발 서버 (핫 리로드) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint 검사 |

---

## 디렉터리 구조 (요약)

```
src/
├── app/                 # 라우트·페이지 (홈, 코스, 로드맵, commands, features 등)
├── components/          # 헤더·푸터·퀴즈·UI 컴포넌트
├── data/                # 코스 메타·강별 콘텐츠·로드맵·명령어 데이터
└── lib/                 # 진행률(localStorage) 등 유틸
sc/
└── README.md            # SuperClaude `sc` 슬래시 명령 설명 (한글)
public/                  # 정적 자산
```

---

## 환경 변수

로컬 가이드 앱만 실행하는 경우 **별도 `.env` 없이** 동작하도록 구성되어 있습니다.  
배포 시 외부 API를 붙인다면 `.env*` 규칙에 맞춰 추가하면 됩니다(`.gitignore`에 기본적으로 제외됨).

---

## 배포

Next.js 앱이므로 **Vercel**, **Netlify**, 자체 Node 호스팅 등 일반적인 Next 배포 방식을 그대로 쓸 수 있습니다.  
공식 가이드: [Next.js — 배포](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 관련 문서

- **[SuperClaude `sc` 명령어 (한글)](./sc/README.md)** — Cursor `/sc/README`와 연결된 슬래시 명령 묶음 설명

---

## 기여와 라이선스

이슈·PR은 환영합니다. 브랜치 전략·코딩 스타일은 기존 코드와 맞춰 주시면 됩니다.  
라이선스는 저장소에 `LICENSE`가 추가되면 그에 따릅니다. (미설정 시 조직·개인 정책에 맞게 추가하세요.)

---

## 참고 링크

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev)
