import type { Lesson } from "../types";

export const lesson10: Lesson = {
  id: "beginner-10",
  title: "Desktop 앱 기본 기능",
  objectives: [
    "Claude Desktop 앱의 주요 기능과 인터페이스를 이해한다",
    "파일 업로드, 프로젝트, 시각적 diff 리뷰 기능을 활용한다",
    "CLI와 Desktop 앱의 차이점과 각각의 적합한 사용 시나리오를 파악한다",
  ],
  sections: [
    {
      type: "text",
      title: "Claude Desktop 앱 소개",
      content:
        "Claude Desktop은 Anthropic에서 제공하는 데스크톱 애플리케이션입니다. 웹 브라우저 없이 독립적으로 Claude를 사용할 수 있으며, 시스템 수준의 기능(파일 드래그 앤 드롭, 시스템 알림 등)을 활용할 수 있습니다. 채팅 인터페이스를 통해 대화하고, 파일을 직접 업로드하여 분석을 요청할 수 있습니다. macOS와 Windows에서 사용 가능하며, 별도의 설치 파일을 다운로드하여 설치합니다.",
    },
    {
      type: "text",
      title: "파일 업로드와 프로젝트 기능",
      content:
        "Desktop 앱에서는 파일을 드래그 앤 드롭으로 업로드할 수 있습니다. 이미지, 문서, 코드 파일 등 다양한 형식을 지원합니다. 프로젝트 기능을 사용하면 관련 파일과 대화를 하나의 프로젝트로 묶어 관리할 수 있습니다. 프로젝트에 컨텍스트 파일을 추가해두면 해당 프로젝트의 모든 대화에서 자동으로 참조됩니다. 이를 통해 반복적으로 같은 파일을 업로드할 필요 없이 효율적으로 작업할 수 있습니다.",
    },
    {
      type: "text",
      title: "시각적 diff 리뷰와 세션 관리",
      content:
        "Desktop 앱은 코드 변경 사항을 시각적으로 보여주는 diff 리뷰 기능을 제공합니다. 변경 전후를 색상으로 구분하여 표시하므로, 어떤 코드가 추가되고 삭제되었는지 한눈에 파악할 수 있습니다. 세션 관리 면에서는 여러 대화를 탭으로 관리할 수 있으며, 이전 대화 기록을 검색하고 다시 열 수 있습니다. 대화 내보내기 기능도 지원하여 작업 기록을 보존할 수 있습니다.",
    },
    {
      type: "text",
      title: "CLI vs Desktop 비교",
      content:
        "Claude Code CLI는 터미널에서 실행되며, 파일 시스템 직접 접근, Git 연동, 쉘 명령어 실행 등 개발 환경에 깊이 통합됩니다. 코드 작성과 편집에 최적화되어 있으며, 자동화 스크립트에서도 활용할 수 있습니다. 반면 Desktop 앱은 시각적 인터페이스를 제공하여 파일 업로드, 이미지 분석, 문서 작업 등에 편리합니다. 개발자라면 코딩 작업에는 CLI를, 문서 검토나 아이디어 논의에는 Desktop을 사용하는 것이 효율적입니다.",
    },
    {
      type: "tip",
      title: "Desktop과 CLI 함께 활용하기",
      content:
        "Desktop 앱과 CLI는 서로 보완적인 도구입니다. Desktop에서 프로젝트 설계와 아키텍처를 논의한 후, CLI에서 실제 구현 작업을 수행하는 워크플로우가 효과적입니다. Desktop에서 이미지나 디자인 파일을 업로드하여 분석하고, 그 결과를 바탕으로 CLI에서 코드를 작성할 수도 있습니다. 두 도구를 상황에 맞게 번갈아 사용하면 생산성을 극대화할 수 있습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b10-q1",
        text: "Claude Desktop 앱에서 파일을 업로드하는 방법은?",
        choices: [
          "터미널 명령어로만 가능",
          "드래그 앤 드롭으로 업로드 가능",
          "FTP로만 업로드 가능",
          "파일 업로드 기능이 없음",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Desktop 앱에서는 파일을 드래그 앤 드롭으로 간편하게 업로드할 수 있습니다. 이미지, 문서, 코드 파일 등 다양한 형식을 지원합니다.",
      },
      {
        id: "b10-q2",
        text: "코드 작성과 파일 편집에 가장 적합한 도구는?",
        choices: [
          "Claude Desktop 앱",
          "Claude Code CLI (터미널)",
          "Claude 웹 버전",
          "모두 동일함",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Claude Code CLI는 파일 시스템 직접 접근, Git 연동, 코드 편집 도구 등 개발 환경에 깊이 통합되어 있어 코드 작성과 편집에 가장 적합합니다.",
      },
      {
        id: "b10-q3",
        text: "Desktop 앱의 프로젝트 기능의 이점은?",
        choices: [
          "코드를 자동으로 컴파일해준다",
          "관련 파일과 대화를 묶어 관리하고 컨텍스트를 자동 참조한다",
          "프로젝트를 자동으로 배포한다",
          "테스트를 자동으로 실행한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "프로젝트 기능을 사용하면 관련 파일과 대화를 묶어 관리할 수 있고, 프로젝트에 추가된 컨텍스트 파일이 모든 대화에서 자동으로 참조됩니다.",
      },
      {
        id: "b10-q4",
        text: "Desktop 앱이 CLI보다 유리한 작업은?",
        choices: [
          "Git 커밋과 브랜치 관리",
          "쉘 명령어 자동화",
          "이미지 분석과 파일 드래그 앤 드롭",
          "코드 리팩토링",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "Desktop 앱은 시각적 인터페이스를 제공하여 이미지 분석, 파일 드래그 앤 드롭 등의 작업이 CLI보다 편리합니다.",
      },
      {
        id: "b10-q5",
        text: "Desktop과 CLI를 함께 활용하는 효과적인 워크플로우는?",
        choices: [
          "항상 Desktop만 사용한다",
          "항상 CLI만 사용한다",
          "Desktop에서 설계를 논의하고 CLI에서 구현 작업을 수행한다",
          "동시에 두 도구를 열면 안 된다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Desktop에서 프로젝트 설계와 아키텍처를 논의한 후 CLI에서 실제 구현 작업을 수행하는 것이 효율적인 워크플로우입니다.",
      },
    ],
  },
};
