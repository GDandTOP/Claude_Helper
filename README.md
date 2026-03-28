# Claude Helper

> Claude Code **CLI**와 **Desktop**을 주제로 한 학습용 웹 가이드입니다.  
> 초급·고급 코스, 강의별 퀴즈, 로드맵, 명령·기능 모음을 한 사이트에서 다룹니다.

**저장소:** [github.com/GDandTOP/Claude_Helper](https://github.com/GDandTOP/Claude_Helper)

---

## 목차

1. [누구를 위한 프로젝트인가](#누구를-위한-프로젝트인가)  
2. [제공 기능](#제공-기능)  
3. [페이지와 URL](#페이지와-url)  
4. [기술 스택](#기술-스택)  
5. [시작하기](#시작하기)  
6. [스크립트](#스크립트)  
7. [소스 구조](#소스-구조)  
8. [학습 진행 데이터](#학습-진행-데이터)  
9. [배포](#배포)  
10. [추가 문서](#추가-문서)

---

## 누구를 위한 프로젝트인가

- Claude Code를 **처음 설치·실행**하는 사람  
- 슬래시 명령, MCP, Hooks 등 **고급 주제**까지 정리해서 보고 싶은 사람  
- 문서만 읽기보다 **강·퀴즈 순서**로 따라가는 쪽을 선호하는 사람  

웹 앱이므로 별도 백엔드 계정 없이 브라우저만으로 둘러볼 수 있습니다.

---

## 제공 기능

- **초급·고급 코스** 각 10강(예상 시간·주제는 `src/data/courses.ts` 기준)  
- **강의 페이지**에서 본문과 함께 **퀴즈**로 이해도 확인  
- **홈**에서 코스별 완료율 등 진행 상황 요약  
- **로드맵**으로 학습 흐름을 한 번에 조망  
- **명령어 모음·기능 소개** 전용 페이지로 빠른 참조  

---

## 페이지와 URL

| 경로 | 역할 |
|------|------|
| `/` | 메인: 코스 카드, 진행률, 주요 섹션 안내 |
| `/course/beginner` · `/course/advanced` | 트랙별 강 목록 |
| `/course/beginner/01` 등 | 강의 상세·퀴즈 (`[track]` / `[lessonId]`) |
| `/roadmap` | 로드맵 |
| `/commands` | 명령어 참고 |
| `/features` | 기능 소개 |

---

## 기술 스택

- **프레임워크:** Next.js 16 (App Router)  
- **UI:** React 19, Tailwind CSS 4  
- **컴포넌트:** Base UI, shadcn/ui 유틸(`shadcn` 패키지, `class-variance-authority`, `clsx`, `tailwind-merge`)  
- **아이콘:** lucide-react  
- **타입:** TypeScript 5  
- **품질:** ESLint (`eslint-config-next`)

---

## 시작하기

**필요:** Node.js(Next 16과 호환되는 버전, LTS 권장)

```bash
git clone https://github.com/GDandTOP/Claude_Helper.git
cd Claude_Helper
pnpm install
pnpm dev
```

브라우저에서 **http://localhost:3000** 을 엽니다.

`pnpm` 대신 아래도 가능합니다.

```bash
npm install && npm run dev
```

---

## 스크립트

| 명령 | 설명 |
|------|------|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드(배포 전 확인용으로 권장) |
| `pnpm start` | 빌드 결과 실행 |
| `pnpm lint` | ESLint |

---

## 소스 구조

```
├── public/                 # 정적 파일
├── sc/
│   └── README.md           # SuperClaude 슬래시 명령 설명(한글)
├── src/
│   ├── app/                # App Router 페이지
│   │   ├── page.tsx        # 홈
│   │   ├── course/[track]/ # 트랙·강 ID
│   │   ├── roadmap/
│   │   ├── commands/
│   │   └── features/
│   ├── components/         # 레이아웃·퀴즈·UI
│   ├── data/               # 코스·강 콘텐츠·로드맵·명령·기능 데이터
│   └── lib/                # 진행률·유틸
├── package.json
├── pnpm-lock.yaml
└── next.config.ts
```

---

## 학습 진행 데이터

강 완료·퀴즈 점수 등은 브라우저 **localStorage**에 저장됩니다.  
같은 기기·같은 브라우저에서 이어서 학습할 때 유지되며, 시크릿 모드나 다른 기기로는 공유되지 않습니다.

---

## 배포

정적 호스팅이 아니라 **Next.js 서버**가 필요합니다.  
[Vercel](https://vercel.com) 등에 Git 연동으로 올리는 방식이 일반적입니다.  
자세한 절차는 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.

---

## 추가 문서

- **[sc/README.md](./sc/README.md)** — SuperClaude `sc` 슬래시 명령 묶음(한글)

---

## 기여

버그 제보·문서 수정·콘텐츠 보완은 이슈와 PR로 환영합니다.  
변경은 가능한 한 작은 단위로 나누고, 기존 스타일·데이터 구조를 맞춰 주시면 리뷰가 수월합니다.

---

## 라이선스

이 저장소에 `LICENSE` 파일이 없다면, 사용·재배포 조건은 저장소 소유자에게 문의하거나 필요 시 `LICENSE`를 추가하세요.
