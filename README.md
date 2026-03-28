# Claude Helper

클로드 코드를 사용하는 **입문자·숙련자** 모두에게 도움이 되도록 만든 **가이드 웹앱**입니다. (Next.js)

## 로컬에서 실행하기

패키지 설치 후 개발 서버를 띄웁니다.

```bash
pnpm install
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 화면을 볼 수 있습니다.

다른 패키지 매니저를 쓰는 경우:

```bash
npm run dev
# 또는
yarn dev
# 또는
bun dev
```

## 폴더 안내

- **`src/app/`** — 페이지·라우트 (코스, 로드맵, 명령어 모음 등)
- **`src/data/`** — 학습·가이드용 데이터
- **`src/components/`** — 헤더·푸터·퀴즈·UI 컴포넌트
- **`sc/README.md`** — SuperClaude `sc` 슬래시 명령 설명 (한글)

## SuperClaude `sc` 명령어 문서

패키지 배포용 슬래시 명령(`~/.claude/commands/sc/`)에 대한 한글 정리는 다음 파일을 보세요.

- **[sc/README.md](./sc/README.md)**

## 배포

Next.js 앱은 [Vercel](https://vercel.com) 등에 올리기 쉽습니다. 자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.

## 라이선스·기여

저장소 정책에 맞게 이슈·PR을 남겨 주세요.
