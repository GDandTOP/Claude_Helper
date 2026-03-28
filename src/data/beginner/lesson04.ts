import type { Lesson } from "../types";

export const lesson04: Lesson = {
  id: "beginner-04",
  title: "슬래시 명령어 마스터하기",
  objectives: [
    "주요 슬래시 명령어의 종류와 용도를 파악한다",
    "상황에 맞는 슬래시 명령어를 선택하여 사용할 수 있다",
    "슬래시 명령어로 작업 효율을 높이는 방법을 익힌다",
  ],
  sections: [
    {
      type: "text",
      title: "슬래시 명령어란?",
      content:
        "슬래시 명령어는 Claude Code 대화 중에 '/' 기호로 시작하는 특수 명령어입니다. 일반 대화와 달리, 슬래시 명령어는 Claude Code의 기능을 직접 제어합니다. 대화 초기화, 모델 변경, 비용 확인 등 다양한 작업을 빠르게 수행할 수 있습니다. 슬래시를 입력하면 사용 가능한 명령어 목록이 자동완성으로 표시됩니다.",
    },
    {
      type: "code",
      title: "핵심 슬래시 명령어 목록",
      language: "plaintext",
      content: `/help     - 사용 가능한 모든 명령어와 도움말 표시
/clear    - 현재 대화 내역을 모두 지우고 새로 시작
/model    - 사용할 AI 모델을 변경 (예: claude-sonnet-4-20250514)
/compact  - 대화 내역을 요약하여 컨텍스트 공간 확보
/cost     - 현재 세션의 토큰 사용량과 비용 확인
/status   - Claude Code의 현재 상태 정보 표시
/context  - 현재 대화의 컨텍스트 정보 확인
/memory   - CLAUDE.md 메모리 파일 관리
/diff     - 변경된 파일의 차이점(diff) 표시
/theme    - 터미널 테마 변경`,
    },
    {
      type: "text",
      title: "자주 사용하는 명령어 상세 설명",
      content:
        "/compact는 대화가 길어져 컨텍스트 창이 가득 찰 때 매우 유용합니다. 이전 대화를 요약하여 핵심 정보만 유지하면서 컨텍스트 공간을 확보합니다. /cost로는 현재 세션에서 사용한 토큰 수와 예상 비용을 확인할 수 있어 비용 관리에 도움이 됩니다. /model은 작업 복잡도에 따라 모델을 전환할 때 사용합니다. 간단한 작업에는 가벼운 모델을, 복잡한 작업에는 강력한 모델을 선택할 수 있습니다.",
    },
    {
      type: "tip",
      title: "효율적인 명령어 활용 팁",
      content:
        "작업을 시작할 때 /clear로 이전 맥락을 정리하면 깔끔하게 새 작업을 시작할 수 있습니다. 긴 대화 중에 응답 속도가 느려지면 /compact로 대화를 압축해보세요. 코드 변경 작업 후에는 /diff로 변경 사항을 한눈에 확인할 수 있습니다. /memory를 활용하면 프로젝트별 설정이나 코딩 규칙을 CLAUDE.md에 저장하여 매 세션마다 반복 설명할 필요가 없습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b04-q1",
        text: "대화 내역을 모두 지우고 새로 시작하는 슬래시 명령어는?",
        choices: ["/reset", "/clear", "/new", "/restart"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "/clear 명령어는 현재 대화 내역을 모두 지우고 새로운 대화를 시작합니다. 새 작업을 시작할 때 유용합니다.",
      },
      {
        id: "b04-q2",
        text: "대화가 길어져 컨텍스트 창이 부족할 때 사용하는 명령어는?",
        choices: ["/clear", "/compact", "/reduce", "/shrink"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "/compact 명령어는 이전 대화를 요약하여 핵심 정보만 유지하면서 컨텍스트 공간을 확보합니다. 대화를 완전히 지우지 않고 맥락을 보존합니다.",
      },
      {
        id: "b04-q3",
        text: "현재 세션의 토큰 사용량과 비용을 확인하는 명령어는?",
        choices: ["/usage", "/cost", "/billing", "/tokens"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/cost 명령어로 현재 세션에서 사용한 토큰 수와 예상 비용을 확인할 수 있습니다. API 사용 비용을 관리하는 데 도움이 됩니다.",
      },
      {
        id: "b04-q4",
        text: "Claude Code에서 사용할 AI 모델을 변경하는 명령어는?",
        choices: ["/switch", "/engine", "/model", "/ai"],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "/model 명령어로 사용할 AI 모델을 변경할 수 있습니다. 작업의 복잡도에 따라 적절한 모델을 선택하면 비용과 품질을 최적화할 수 있습니다.",
      },
      {
        id: "b04-q5",
        text: "코드 변경 후 변경사항을 확인하는 슬래시 명령어는?",
        choices: ["/changes", "/diff", "/review", "/compare"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "/diff 명령어는 현재 세션에서 변경된 파일의 차이점을 표시합니다. 코드 리뷰나 변경 확인에 유용합니다.",
      },
    ],
  },
};
