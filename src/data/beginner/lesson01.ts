import type { Lesson } from "../types";

export const lesson01: Lesson = {
  id: "beginner-01",
  title: "Claude Code 소개 및 설치",
  objectives: [
    "Claude Code가 무엇인지 이해한다",
    "Claude Code를 설치하고 첫 실행을 수행한다",
    "터미널에서 Claude Code의 기본 사용법을 익힌다",
  ],
  sections: [
    {
      type: "text",
      title: "Claude Code란 무엇인가?",
      content:
        "Claude Code는 Anthropic에서 만든 AI 기반 터미널 코딩 도구입니다. 터미널에서 직접 실행되며, 코드를 읽고, 편집하고, 생성하는 작업을 자연어 대화로 수행할 수 있습니다. 기존 IDE 확장 프로그램과 달리, Claude Code는 여러분의 전체 프로젝트 구조를 이해하고 파일 시스템을 직접 탐색하면서 작업합니다. 코드 작성, 버그 수정, 리팩토링, 테스트 작성, Git 작업 등 개발 워크플로우의 거의 모든 부분을 도와줄 수 있습니다.",
    },
    {
      type: "code",
      title: "설치 방법",
      language: "bash",
      content: `# Node.js 18 이상이 필요합니다
node --version

# npm을 사용하여 전역 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version`,
    },
    {
      type: "text",
      title: "필수 요구사항",
      content:
        "Claude Code를 사용하려면 몇 가지 요구사항이 있습니다. 첫째, Node.js 18 이상이 설치되어 있어야 합니다. 둘째, Anthropic API 키 또는 Claude 구독(Max 플랜 이상)이 필요합니다. 셋째, macOS 또는 Linux 환경이 권장됩니다(Windows는 WSL을 통해 사용 가능). 설치 후 처음 실행하면 인증 과정을 안내받게 됩니다.",
    },
    {
      type: "code",
      title: "첫 실행과 기본 사용",
      language: "bash",
      content: `# 프로젝트 디렉토리에서 Claude Code 시작
cd my-project
claude

# 대화형 모드에서 질문하기
# > 이 프로젝트의 구조를 설명해줘
# > src 폴더에 있는 파일 목록을 보여줘

# 한 줄 명령어로 실행하기 (비대화형)
claude "이 프로젝트의 README를 요약해줘"`,
    },
    {
      type: "tip",
      title: "시작 팁",
      content:
        "Claude Code를 처음 사용할 때는 프로젝트의 루트 디렉토리에서 시작하는 것이 좋습니다. Claude는 현재 디렉토리를 기준으로 프로젝트를 탐색하므로, 루트에서 시작하면 전체 프로젝트 구조를 더 잘 파악할 수 있습니다. 또한 처음에는 '이 프로젝트의 구조를 설명해줘'와 같은 질문으로 시작하면 Claude가 프로젝트를 이해하는 데 도움이 됩니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b01-q1",
        text: "Claude Code를 설치하는 올바른 명령어는 무엇인가요?",
        choices: [
          "npm install claude-code",
          "npm install -g @anthropic-ai/claude-code",
          "pip install claude-code",
          "brew install claude-code",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Claude Code는 npm 패키지로 제공되며, 'npm install -g @anthropic-ai/claude-code' 명령어로 전역 설치합니다. -g 플래그는 전역 설치를 의미합니다.",
      },
      {
        id: "b01-q2",
        text: "Claude Code를 사용하기 위한 최소 Node.js 버전은?",
        choices: [
          "Node.js 14 이상",
          "Node.js 16 이상",
          "Node.js 18 이상",
          "Node.js 20 이상",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Claude Code는 Node.js 18 이상을 요구합니다. 설치 전에 'node --version' 명령어로 현재 버전을 확인하세요.",
      },
      {
        id: "b01-q3",
        text: "Claude Code를 프로젝트에서 시작하는 가장 좋은 방법은?",
        choices: [
          "아무 디렉토리에서 claude 명령어 실행",
          "프로젝트 루트 디렉토리에서 claude 명령어 실행",
          "홈 디렉토리에서 claude 명령어 실행",
          "시스템 루트에서 claude 명령어 실행",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "프로젝트 루트 디렉토리에서 시작하면 Claude가 전체 프로젝트 구조를 더 잘 파악할 수 있어 정확한 도움을 받을 수 있습니다.",
      },
      {
        id: "b01-q4",
        text: "Claude Code는 어떤 환경에서 실행되나요?",
        choices: [
          "웹 브라우저에서만 실행",
          "터미널(CLI)에서 실행",
          "별도의 데스크톱 앱으로만 실행",
          "IDE 플러그인으로만 실행",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "Claude Code는 터미널 기반 도구입니다. 명령줄에서 직접 실행하며, 파일 시스템에 직접 접근하여 작업합니다.",
      },
      {
        id: "b01-q5",
        text: "비대화형 모드로 Claude Code를 사용하는 방법은?",
        choices: [
          "claude --run '명령어'",
          "claude -e '명령어'",
          "claude \"질문 내용\"",
          "claude --exec '명령어'",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "claude 뒤에 따옴표로 감싼 질문을 바로 전달하면 비대화형 모드로 실행됩니다. 예: claude \"이 파일의 버그를 찾아줘\"",
      },
    ],
  },
};
