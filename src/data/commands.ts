export interface Command {
  command: string;
  description: string;
  example?: string;
  tip?: string;
}

export interface CommandCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // SVG path key
  commands: Command[];
}

export const commandCategories: CommandCategory[] = [
  {
    id: "essential",
    title: "Essential Commands",
    subtitle: "매일 사용하는 필수 명령어",
    icon: "star",
    commands: [
      {
        command: "/help",
        description: "도움말 표시. 사용 가능한 모든 명령어 목록 확인",
        tip: "처음 시작할 때 한 번 훑어보면 좋아요",
      },
      {
        command: "/clear",
        description: "대화 기록을 모두 지우고 새로 시작",
        tip: "컨텍스트가 꼬였을 때 리셋 용도로 최고",
      },
      {
        command: "/compact",
        description: "이전 대화를 요약하여 컨텍스트 윈도우 절약",
        example: "/compact [요약 지시사항]",
        tip: "긴 작업 중간에 주기적으로 사용하면 토큰 절약",
      },
      {
        command: "/cost",
        description: "현재 세션의 토큰 사용량과 비용 확인",
        tip: "비용 관리에 필수! 세션 끝나기 전에 확인하세요",
      },
      {
        command: "/model",
        description: "사용할 AI 모델 변경 (Opus, Sonnet, Haiku)",
        example: "/model claude-sonnet-4-6",
        tip: "간단한 작업은 Haiku로 전환하면 비용 절감",
      },
    ],
  },
  {
    id: "session",
    title: "Session Management",
    subtitle: "세션 및 대화 관리",
    icon: "layers",
    commands: [
      {
        command: "/resume",
        description: "이전 세션 목록에서 선택하여 대화 재개",
        tip: "퇴근 후 다음날 이어서 작업할 때 필수",
      },
      {
        command: "/resume [session-id]",
        description: "특정 세션 ID로 바로 이어서 대화",
        example: "/resume abc123",
      },
      {
        command: "/branch",
        description: "현재 대화를 분기하여 다른 방향 탐색",
        tip: "A안 vs B안 비교할 때 유용",
      },
      {
        command: "/status",
        description: "현재 세션 상태와 컨텍스트 사용량 확인",
      },
    ],
  },
  {
    id: "code-ops",
    title: "Code Operations",
    subtitle: "코드 작업 및 편집 관련",
    icon: "code",
    commands: [
      {
        command: "/commit",
        description: "변경사항을 분석하여 커밋 메시지 자동 생성 + 커밋",
        tip: "가장 많이 쓰는 명령어! 커밋 메시지 고민 끝",
      },
      {
        command: "/review",
        description: "현재 변경사항 코드 리뷰 요청",
        tip: "PR 올리기 전에 셀프 리뷰로 활용",
      },
      {
        command: "/pr",
        description: "현재 브랜치의 변경사항으로 PR 생성",
        example: "/pr",
        tip: "커밋, 리뷰, PR까지 Claude 하나로 완성",
      },
      {
        command: "/diff",
        description: "현재 변경사항의 diff를 보여줌",
      },
      {
        command: "/bug",
        description: "코드에서 잠재적 버그를 찾아 분석",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation & Search",
    subtitle: "코드베이스 탐색 및 검색",
    icon: "search",
    commands: [
      {
        command: "@파일경로",
        description: "특정 파일을 컨텍스트에 추가",
        example: "@src/app/page.tsx 이 파일 리팩토링해줘",
        tip: "파일 경로를 정확히 지정하면 더 정확한 결과",
      },
      {
        command: "!명령어",
        description: "대화 중 셸 명령어 직접 실행",
        example: "!npm run build",
        tip: "빌드 에러 확인할 때 편리",
      },
      {
        command: "/find",
        description: "코드베이스에서 패턴 또는 파일 검색",
        example: "/find TODO 주석이 있는 파일들",
      },
    ],
  },
  {
    id: "config",
    title: "Configuration",
    subtitle: "설정 및 환경 관리",
    icon: "settings",
    commands: [
      {
        command: "/config",
        description: "현재 설정 확인 및 변경",
      },
      {
        command: "/permissions",
        description: "현재 권한 모드 확인 및 관리",
        tip: "보안이 중요한 프로젝트에서는 꼭 확인",
      },
      {
        command: "/fast",
        description: "Fast 모드 토글 (같은 모델, 빠른 출력)",
        tip: "같은 Opus 4.6 모델인데 출력이 빨라짐!",
      },
      {
        command: "/verbose",
        description: "상세 출력 모드 토글",
      },
      {
        command: "/theme",
        description: "에디터 테마 변경",
      },
    ],
  },
  {
    id: "advanced",
    title: "Power User Commands",
    subtitle: "고급 사용자를 위한 명령어",
    icon: "zap",
    commands: [
      {
        command: "/plan",
        description: "Plan 모드 진입 - 코드 변경 없이 분석만",
        tip: "큰 리팩토링 전에 전략부터 세울 때 필수",
      },
      {
        command: "/batch",
        description: "여러 파일에 대한 대규모 병렬 변경 수행",
        example: "/batch 모든 console.log를 로거로 교체",
        tip: "대규모 마이그레이션/리팩토링에 최적",
      },
      {
        command: "/agent",
        description: "커스텀 에이전트 실행",
        example: "/agent test-runner",
      },
      {
        command: "/mcp",
        description: "MCP 서버 상태 확인 및 관리",
      },
      {
        command: "/schedule",
        description: "반복 작업 예약 (크론 기반)",
        example: "/schedule 매일 9시에 의존성 업데이트 체크",
      },
      {
        command: "/loop",
        description: "명령어를 주기적으로 반복 실행",
        example: "/loop 5m /review",
        tip: "배포 모니터링할 때 유용",
      },
    ],
  },
  {
    id: "keyboard",
    title: "Keyboard Shortcuts",
    subtitle: "키보드 단축키로 생산성 UP",
    icon: "keyboard",
    commands: [
      {
        command: "Ctrl + C",
        description: "현재 생성 중인 응답 중단",
        tip: "잘못된 방향으로 갈 때 빠르게 멈추기",
      },
      {
        command: "Ctrl + L",
        description: "터미널 화면 클리어 (대화 유지)",
      },
      {
        command: "Up Arrow",
        description: "이전 입력 히스토리 탐색",
      },
      {
        command: "Tab",
        description: "파일 경로 자동완성",
        tip: "@와 함께 사용하면 파일 탐색이 빨라짐",
      },
      {
        command: "Esc",
        description: "현재 입력 취소 / 메뉴 닫기",
      },
      {
        command: "Shift + Tab",
        description: "여러 줄 입력 모드로 전환",
        tip: "긴 프롬프트 작성할 때 편리",
      },
    ],
  },
  {
    id: "cli-flags",
    title: "CLI Flags & Options",
    subtitle: "커맨드라인 실행 옵션",
    icon: "terminal",
    commands: [
      {
        command: "claude -p \"프롬프트\"",
        description: "Headless 모드 - 비대화형 한 번 실행",
        example: "claude -p \"이 코드의 버그를 찾아줘\"",
        tip: "CI/CD 파이프라인 연동의 핵심",
      },
      {
        command: "claude --model [모델]",
        description: "특정 모델로 실행",
        example: "claude --model claude-haiku-4-5-20251001",
      },
      {
        command: "claude --output-format json",
        description: "JSON 형식으로 결과 출력",
        tip: "스크립트에서 결과를 파싱할 때 필수",
      },
      {
        command: "claude --max-cost [금액]",
        description: "최대 비용 한도 설정 (달러)",
        example: "claude --max-cost 5",
        tip: "예산 관리에 필수! 넘으면 자동 중단",
      },
      {
        command: "claude --allowedTools [도구들]",
        description: "사용 가능한 도구를 제한",
        example: "claude --allowedTools Read,Grep,Glob",
      },
      {
        command: "claude --verbose",
        description: "도구 호출 등 상세 과정 출력",
      },
    ],
  },
  {
    id: "tips",
    title: "Pro Tips",
    subtitle: "실무에서 바로 쓰는 꿀팁 모음",
    icon: "bulb",
    commands: [
      {
        command: "CLAUDE.md 활용",
        description: "프로젝트 루트에 CLAUDE.md를 두면 매 세션마다 자동으로 읽어서 컨텍스트로 활용",
        tip: "코딩 컨벤션, 프로젝트 구조, 주의사항 등을 적어두면 일관된 결과 획득",
      },
      {
        command: "파이프 입력",
        description: "cat file.txt | claude -p \"요약해줘\" 처럼 파이프로 데이터 전달",
        tip: "로그 분석, 에러 해석 등에 활용",
      },
      {
        command: "Git Worktree + Claude",
        description: "별도 워크트리에서 Claude를 실행하면 메인 브랜치에 영향 없이 실험 가능",
        tip: "대규모 리팩토링의 안전망",
      },
      {
        command: "비용 최적화 전략",
        description: "간단한 작업은 Haiku, 복잡한 분석은 Opus, 일반 코딩은 Sonnet 사용",
        tip: "/model로 수시로 전환하면 비용 50% 이상 절감 가능",
      },
      {
        command: "컨텍스트 관리",
        description: "/compact를 주기적으로 사용하고, 주제가 바뀌면 /clear로 리셋",
        tip: "컨텍스트가 깨끗할수록 응답 품질이 좋아짐",
      },
      {
        command: "Hooks로 자동화",
        description: "settings.json에 hooks를 설정하면 특정 이벤트마다 자동 실행",
        example: "커밋 전 자동 린트, 파일 저장 후 자동 포맷 등",
        tip: "반복 작업을 완전 자동화할 수 있음",
      },
    ],
  },
];
