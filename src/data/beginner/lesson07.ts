import type { Lesson } from "../types";

export const lesson07: Lesson = {
  id: "beginner-07",
  title: "VS Code 확장 프로그램 활용",
  objectives: [
    "Claude Code VS Code 확장 프로그램을 설치하고 설정한다",
    "채팅 패널과 파일 참조 기능을 활용한다",
    "터미널 모드와 확장 프로그램 모드를 상황에 맞게 전환한다",
  ],
  sections: [
    {
      type: "text",
      title: "VS Code 확장 프로그램 설치",
      content:
        "Claude Code VS Code 확장 프로그램은 VS Code 마켓플레이스에서 설치할 수 있습니다. 확장 프로그램 탭에서 'Claude Code'를 검색하거나, 'code --install-extension anthropic.claude-code' 명령어로 설치합니다. 설치 후 사이드바에 Claude 아이콘이 나타나며, 클릭하면 채팅 패널이 열립니다. 터미널에서 사용하던 Claude Code와 동일한 기능을 VS Code의 편리한 인터페이스에서 사용할 수 있습니다.",
    },
    {
      type: "text",
      title: "채팅 패널과 파일 참조",
      content:
        "채팅 패널에서는 일반 Claude Code와 동일하게 대화할 수 있습니다. 특별한 점은 현재 열려 있는 파일이나 선택한 코드를 자동으로 컨텍스트에 포함할 수 있다는 것입니다. 에디터에서 코드를 선택한 후 채팅 패널에서 질문하면 선택된 코드에 대해 바로 답변을 받을 수 있습니다. 또한 '@' 기호를 사용하여 특정 파일을 참조할 수도 있습니다. 이를 통해 '이 함수를 리팩토링해줘'와 같은 구체적인 요청이 훨씬 쉬워집니다.",
    },
    {
      type: "code",
      title: "확장 프로그램 활용 예시",
      language: "plaintext",
      content: `# 채팅 패널에서의 대화 예시

# 파일 참조
> @src/components/Button.tsx 이 컴포넌트에 loading 상태를 추가해줘

# 선택 코드 기반 질문
# (코드를 선택한 상태에서)
> 선택한 코드의 시간 복잡도를 분석해줘

# 터미널 모드 전환
# VS Code 터미널에서 직접 claude 명령어 실행도 가능
# 복잡한 작업은 터미널 모드가 더 적합할 수 있음`,
    },
    {
      type: "tip",
      title: "VS Code 확장 프로그램 활용 팁",
      content:
        "간단한 코드 수정이나 질문은 채팅 패널을 활용하고, 여러 파일에 걸친 대규모 작업이나 Git 관련 작업은 터미널 모드를 사용하는 것이 효율적입니다. 여러 대화를 동시에 관리할 수 있으므로, 작업별로 별도의 대화 세션을 유지하면 맥락이 혼합되지 않습니다. 키보드 단축키를 설정하면 채팅 패널을 빠르게 열고 닫을 수 있습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b07-q1",
        text: "VS Code에서 특정 파일을 Claude Code 채팅에 참조하는 방법은?",
        choices: [
          "#파일명으로 참조",
          "@파일경로로 참조",
          "!파일명으로 참조",
          "$파일명으로 참조",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "'@' 기호를 사용하여 특정 파일을 참조할 수 있습니다. 예: @src/components/Button.tsx",
      },
      {
        id: "b07-q2",
        text: "VS Code 확장 프로그램에서 채팅 패널을 여는 방법은?",
        choices: [
          "터미널에서 claude 명령어 입력",
          "사이드바의 Claude 아이콘 클릭",
          "파일 메뉴에서 Claude 선택",
          "F12 키를 누르기",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "설치 후 VS Code 사이드바에 Claude 아이콘이 나타나며, 클릭하면 채팅 패널이 열립니다.",
      },
      {
        id: "b07-q3",
        text: "에디터에서 코드를 선택한 후 채팅 패널을 사용하면 어떤 이점이 있나요?",
        choices: [
          "선택한 코드가 자동으로 컨텍스트에 포함된다",
          "코드가 자동으로 실행된다",
          "코드가 자동으로 커밋된다",
          "선택한 코드가 삭제된다",
        ],
        correctIndex: 0,
        isRecommended: true,
        explanation:
          "에디터에서 코드를 선택하면 해당 코드가 자동으로 채팅의 컨텍스트에 포함되어, 선택한 코드에 대해 구체적인 질문이나 수정 요청을 할 수 있습니다.",
      },
      {
        id: "b07-q4",
        text: "여러 파일에 걸친 대규모 리팩토링 작업에 더 적합한 모드는?",
        choices: [
          "채팅 패널 모드",
          "터미널 모드",
          "미리보기 모드",
          "읽기 전용 모드",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "여러 파일에 걸친 대규모 작업이나 Git 관련 작업은 터미널 모드가 더 적합합니다. 채팅 패널은 간단한 코드 수정이나 빠른 질문에 효율적입니다.",
      },
      {
        id: "b07-q5",
        text: "작업별로 별도의 대화 세션을 유지하는 이유는?",
        choices: [
          "비용을 절약하기 위해",
          "대화 맥락이 혼합되지 않도록 하기 위해",
          "속도를 높이기 위해",
          "보안을 강화하기 위해",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "작업별로 별도의 대화 세션을 유지하면 각 작업의 맥락이 혼합되지 않아 Claude가 더 정확하고 관련성 높은 응답을 제공할 수 있습니다.",
      },
    ],
  },
};
