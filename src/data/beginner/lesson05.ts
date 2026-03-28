import type { Lesson } from "../types";

export const lesson05: Lesson = {
  id: "beginner-05",
  title: "CLAUDE.md로 프로젝트 설정",
  objectives: [
    "CLAUDE.md 파일의 역할과 중요성을 이해한다",
    "프로젝트 수준과 개인 수준의 CLAUDE.md 차이를 구분한다",
    "효과적인 CLAUDE.md 파일을 작성할 수 있다",
  ],
  sections: [
    {
      type: "text",
      title: "CLAUDE.md란 무엇인가?",
      content:
        "CLAUDE.md는 Claude Code에게 프로젝트에 대한 정보를 제공하는 설정 파일입니다. 이 파일에 프로젝트의 기술 스택, 코딩 컨벤션, 아키텍처 결정 사항 등을 기록해두면, Claude가 매 세션마다 이 정보를 자동으로 읽어 프로젝트에 맞는 응답을 제공합니다. 반복적으로 같은 설명을 할 필요가 없어지므로 작업 효율이 크게 향상됩니다.",
    },
    {
      type: "code",
      title: "CLAUDE.md 작성 예시",
      language: "markdown",
      content: `# 프로젝트 개요
이 프로젝트는 Next.js 14 기반의 이커머스 웹 애플리케이션입니다.

# 기술 스택
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- State: Zustand
- Testing: Vitest + Testing Library

# 코딩 컨벤션
- 컴포넌트는 함수형 컴포넌트만 사용
- 파일명은 kebab-case 사용 (예: user-profile.tsx)
- API 호출은 src/lib/api/ 디렉토리에서 관리
- 에러 처리는 반드시 try-catch로 감싸기

# 중요 명령어
- 개발 서버: npm run dev
- 테스트 실행: npm run test
- 빌드: npm run build`,
    },
    {
      type: "text",
      title: "CLAUDE.md 파일 위치와 계층 구조",
      content:
        "CLAUDE.md는 여러 위치에 배치할 수 있으며, 각 위치에 따라 적용 범위가 다릅니다. 프로젝트 루트의 CLAUDE.md는 해당 프로젝트에서 작업하는 모든 사람에게 적용됩니다. 홈 디렉토리의 ~/.claude/CLAUDE.md는 모든 프로젝트에 걸쳐 적용되는 개인 설정입니다. 또한 .claude/rules/ 디렉토리에 여러 규칙 파일을 나누어 관리할 수도 있습니다. Claude는 이 모든 파일을 자동으로 읽어 종합적으로 적용합니다.",
    },
    {
      type: "text",
      title: "@path 임포트와 규칙 파일",
      content:
        "CLAUDE.md에서 @path 구문을 사용하면 다른 파일의 내용을 참조할 수 있습니다. 예를 들어 '@docs/architecture.md'라고 작성하면 해당 파일의 내용을 Claude가 함께 참고합니다. 또한 .claude/rules/ 디렉토리에 주제별로 규칙 파일을 분리하면 관리가 편리합니다. 예를 들어 .claude/rules/testing.md에는 테스트 관련 규칙을, .claude/rules/styling.md에는 스타일링 규칙을 작성할 수 있습니다.",
    },
    {
      type: "tip",
      title: "좋은 CLAUDE.md 작성 팁",
      content:
        "CLAUDE.md에는 Claude가 알아야 할 핵심 정보만 간결하게 작성하세요. 너무 길면 컨텍스트를 많이 차지하므로 불필요한 내용은 피합니다. 프로젝트 구조, 빌드 명령어, 코딩 컨벤션, 자주 하는 실수에 대한 주의사항 등을 포함하면 효과적입니다. /memory 명령어를 사용하면 대화 중에 발견한 정보를 바로 CLAUDE.md에 추가할 수 있습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b05-q1",
        text: "CLAUDE.md 파일의 주요 역할은 무엇인가요?",
        choices: [
          "프로젝트 빌드 설정을 정의",
          "Claude에게 프로젝트 정보와 규칙을 제공",
          "패키지 의존성을 관리",
          "배포 환경을 설정",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "CLAUDE.md는 Claude Code에게 프로젝트의 기술 스택, 코딩 컨벤션, 아키텍처 등 중요한 정보를 제공하여 프로젝트에 맞는 응답을 생성하도록 돕습니다.",
      },
      {
        id: "b05-q2",
        text: "모든 프로젝트에 공통으로 적용되는 개인 CLAUDE.md의 위치는?",
        choices: [
          "프로젝트 루트의 CLAUDE.md",
          "~/.claude/CLAUDE.md",
          "/etc/claude/CLAUDE.md",
          ".claude/rules/personal.md",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "홈 디렉토리의 ~/.claude/CLAUDE.md는 모든 프로젝트에 걸쳐 적용되는 개인 설정입니다. 개인적인 코딩 스타일이나 선호사항을 기록하기에 적합합니다.",
      },
      {
        id: "b05-q3",
        text: "주제별로 규칙을 분리하여 관리할 수 있는 디렉토리는?",
        choices: [
          ".claude/config/",
          ".claude/rules/",
          ".claude/settings/",
          ".claude/prompts/",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          ".claude/rules/ 디렉토리에 주제별 규칙 파일을 분리하여 관리할 수 있습니다. 예를 들어 testing.md, styling.md 등으로 나눌 수 있습니다.",
      },
      {
        id: "b05-q4",
        text: "대화 중 발견한 정보를 CLAUDE.md에 바로 추가할 수 있는 명령어는?",
        choices: ["/save", "/memory", "/note", "/add"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/memory 명령어를 사용하면 대화 중에 발견한 유용한 정보나 규칙을 CLAUDE.md에 바로 추가할 수 있습니다.",
      },
      {
        id: "b05-q5",
        text: "CLAUDE.md에 포함하면 좋은 내용이 아닌 것은?",
        choices: [
          "프로젝트의 기술 스택 정보",
          "코딩 컨벤션과 스타일 규칙",
          "API 키와 비밀번호 같은 민감 정보",
          "자주 사용하는 빌드 명령어",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "API 키, 비밀번호 등 민감한 정보는 절대 CLAUDE.md에 포함하면 안 됩니다. CLAUDE.md는 Git에 커밋될 수 있으므로 보안 정보는 환경 변수 등 안전한 방법으로 관리해야 합니다.",
      },
    ],
  },
};
