import type { Lesson } from "../types";

export const lesson02: Lesson = {
  id: "beginner-02",
  title: "기본 채팅과 파일 읽기",
  objectives: [
    "Claude Code에서 다중 턴 대화를 효과적으로 사용한다",
    "Read, Glob, Grep 도구의 차이점과 용도를 이해한다",
    "프로젝트 내 파일을 효율적으로 탐색하고 읽을 수 있다",
  ],
  sections: [
    {
      type: "text",
      title: "다중 턴 대화의 이해",
      content:
        "Claude Code는 대화형 인터페이스를 제공합니다. 한 세션 내에서 여러 차례 질문과 응답을 주고받을 수 있으며, Claude는 이전 대화 맥락을 기억합니다. 예를 들어, 먼저 '이 프로젝트의 구조를 보여줘'라고 요청한 후, 이어서 'src 폴더의 컴포넌트를 더 자세히 설명해줘'라고 하면 Claude는 이전 맥락을 바탕으로 답변합니다. 이러한 문맥 유지 기능 덕분에 복잡한 작업도 단계적으로 진행할 수 있습니다.",
    },
    {
      type: "text",
      title: "Read 도구 - 파일 내용 읽기",
      content:
        "Read 도구는 파일의 내용을 직접 읽어오는 기본 도구입니다. Claude에게 특정 파일을 읽어달라고 요청하면, Read 도구를 사용하여 파일 내용을 가져옵니다. 줄 번호와 함께 내용을 표시하므로 코드 리뷰나 디버깅에 유용합니다. '파일의 50번째 줄부터 100번째 줄까지 보여줘'와 같이 특정 범위를 지정할 수도 있습니다. 큰 파일의 경우 부분적으로 읽는 것이 효율적입니다.",
    },
    {
      type: "code",
      title: "파일 탐색 요청 예시",
      language: "plaintext",
      content: `# Read 도구 사용 예시
> src/App.tsx 파일의 내용을 보여줘
> package.json에서 dependencies 부분만 보여줘

# Glob 도구 사용 예시 - 파일 패턴 검색
> src 폴더에서 모든 .tsx 파일을 찾아줘
> **/*.test.ts 패턴에 맞는 테스트 파일을 찾아줘

# Grep 도구 사용 예시 - 내용 검색
> "useState"를 사용하는 모든 파일을 찾아줘
> TODO 주석이 있는 파일을 모두 보여줘`,
    },
    {
      type: "text",
      title: "Glob 도구와 Grep 도구의 차이",
      content:
        "Glob 도구는 파일 이름 패턴을 기반으로 파일을 검색합니다. '**/*.ts'와 같은 글로브 패턴을 사용하여 특정 확장자나 이름 패턴에 맞는 파일을 찾습니다. 반면 Grep 도구는 파일 내용을 검색합니다. 정규 표현식을 지원하며, 특정 문자열이나 패턴이 포함된 파일과 해당 줄을 찾아줍니다. Glob은 '어떤 파일이 있는지' 찾을 때, Grep은 '어떤 내용이 어디에 있는지' 찾을 때 사용합니다.",
    },
    {
      type: "tip",
      title: "효율적인 파일 탐색 전략",
      content:
        "프로젝트를 처음 탐색할 때는 먼저 Glob으로 전체 파일 구조를 파악한 후, 관심 있는 파일을 Read로 읽어보세요. 특정 함수나 변수를 찾을 때는 Grep을 활용하면 빠르게 위치를 특정할 수 있습니다. Claude에게 자연어로 요청하면 적절한 도구를 자동으로 선택하여 사용합니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b02-q1",
        text: "파일의 내용을 직접 읽어서 보여주는 Claude Code 도구는?",
        choices: ["Glob 도구", "Grep 도구", "Read 도구", "Search 도구"],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Read 도구는 파일의 내용을 직접 읽어오는 도구입니다. 줄 번호와 함께 내용을 표시하며, 특정 범위를 지정하여 읽을 수도 있습니다.",
      },
      {
        id: "b02-q2",
        text: "'src 폴더에서 모든 TypeScript 파일 찾기'에 가장 적합한 Glob 패턴은?",
        choices: [
          "src/*.ts",
          "src/**/*.ts",
          "src/?.ts",
          "src/[all].ts",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "'src/**/*.ts'에서 **는 모든 하위 디렉토리를 재귀적으로 포함하고, *.ts는 .ts 확장자를 가진 모든 파일을 의미합니다. src/*.ts는 src 바로 아래의 파일만 검색합니다.",
      },
      {
        id: "b02-q3",
        text: "Grep 도구의 주요 용도는 무엇인가요?",
        choices: [
          "파일 이름으로 파일을 검색",
          "파일 내용에서 특정 텍스트나 패턴을 검색",
          "파일을 삭제하는 명령",
          "파일의 권한을 변경",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "Grep 도구는 파일 내용에서 특정 텍스트나 정규 표현식 패턴을 검색합니다. 파일 이름 패턴 검색은 Glob 도구의 역할입니다.",
      },
      {
        id: "b02-q4",
        text: "Claude Code의 다중 턴 대화에서 올바른 설명은?",
        choices: [
          "매번 새로운 대화를 시작해야 한다",
          "이전 대화 맥락을 기억하고 이어서 대화할 수 있다",
          "최대 3번까지만 대화를 이어갈 수 있다",
          "파일을 읽은 후에는 대화를 이어갈 수 없다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "Claude Code는 세션 내에서 이전 대화의 맥락을 유지합니다. 따라서 이전 질문과 답변을 바탕으로 후속 질문을 자연스럽게 이어갈 수 있습니다.",
      },
      {
        id: "b02-q5",
        text: "큰 파일을 효율적으로 읽는 방법은?",
        choices: [
          "항상 전체 파일을 읽어야 한다",
          "파일을 삭제하고 다시 만든다",
          "필요한 줄 범위를 지정하여 부분적으로 읽는다",
          "파일을 여러 개로 분할한다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Read 도구에서 offset과 limit을 지정하면 파일의 특정 부분만 읽을 수 있습니다. 이렇게 하면 큰 파일도 효율적으로 탐색할 수 있습니다.",
      },
    ],
  },
};
