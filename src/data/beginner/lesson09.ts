import type { Lesson } from "../types";

export const lesson09: Lesson = {
  id: "beginner-09",
  title: "웹 검색과 세션 관리",
  objectives: [
    "WebSearch와 WebFetch 도구의 차이와 활용법을 이해한다",
    "세션을 재개하고 관리하는 방법을 익힌다",
    "/compact와 /resume 명령어를 효과적으로 사용한다",
  ],
  sections: [
    {
      type: "text",
      title: "WebSearch와 WebFetch 도구",
      content:
        "Claude Code는 웹에서 최신 정보를 가져올 수 있는 두 가지 도구를 제공합니다. WebSearch는 웹 검색을 수행하여 최신 라이브러리 문서, API 변경사항, 에러 해결법 등을 찾아줍니다. WebFetch는 특정 URL의 웹 페이지 내용을 직접 가져옵니다. 예를 들어 공식 문서 페이지나 GitHub 이슈의 내용을 읽어올 수 있습니다. 이 도구들 덕분에 Claude의 학습 데이터에 없는 최신 정보도 활용할 수 있습니다.",
    },
    {
      type: "code",
      title: "웹 도구 사용 예시",
      language: "plaintext",
      content: `# WebSearch 활용 예시
> Next.js 15의 새로운 기능을 검색해줘
> "TypeError: Cannot read properties of undefined" 에러 해결법을 찾아줘
> Tailwind CSS v4의 변경사항을 알려줘

# WebFetch 활용 예시
> https://docs.anthropic.com/en/docs/claude-code 페이지의 내용을 읽어줘
> 이 GitHub 이슈의 내용을 가져와줘: https://github.com/...

# 웹 정보를 활용한 작업
> React 19의 최신 패턴에 맞게 이 코드를 업데이트해줘
> 이 라이브러리의 공식 문서를 참고해서 설정을 수정해줘`,
    },
    {
      type: "text",
      title: "세션 관리와 /resume",
      content:
        "Claude Code에서 작업 중 터미널을 닫거나 세션이 종료되더라도, /resume 명령어로 이전 세션을 이어갈 수 있습니다. Claude는 이전 대화의 맥락을 복원하여 중단된 작업을 계속 진행할 수 있게 합니다. 또한 /branch 명령어를 사용하면 현재 대화에서 분기점을 만들어 다른 방향의 작업을 시도할 수 있습니다. 이는 여러 접근 방법을 비교해볼 때 유용합니다.",
    },
    {
      type: "text",
      title: "/compact로 컨텍스트 관리",
      content:
        "긴 대화 세션에서는 컨텍스트 창이 가득 찰 수 있습니다. 이때 /compact 명령어를 사용하면 이전 대화를 요약하여 핵심 정보만 유지합니다. 웹 검색 결과나 긴 파일 내용이 대화에 포함되면 컨텍스트를 빠르게 소모하므로, 필요한 정보를 얻은 후 /compact로 정리하는 것이 좋습니다. /compact 뒤에 커스텀 프롬프트를 추가하여 특정 정보를 우선적으로 보존하도록 지시할 수도 있습니다.",
    },
    {
      type: "tip",
      title: "세션 관리 모범 사례",
      content:
        "장시간 작업할 때는 주기적으로 /compact를 실행하여 컨텍스트를 관리하세요. 중요한 작업 중간에는 Git 커밋을 자주 하여 작업 이력을 남겨두면, 세션이 예기치 않게 종료되더라도 /resume으로 이어갈 수 있습니다. 웹 검색 결과를 프로젝트에 반영한 후에는 /compact로 대화를 정리하면 이후 작업이 더 원활합니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b09-q1",
        text: "최신 라이브러리 정보를 웹에서 검색할 때 사용하는 도구는?",
        choices: [
          "Read 도구",
          "Grep 도구",
          "WebSearch 도구",
          "Glob 도구",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "WebSearch 도구는 웹 검색을 수행하여 최신 라이브러리 문서, API 변경사항, 에러 해결법 등을 찾아줍니다.",
      },
      {
        id: "b09-q2",
        text: "특정 웹 페이지의 내용을 직접 가져오는 도구는?",
        choices: [
          "WebSearch 도구",
          "WebFetch 도구",
          "Read 도구",
          "Download 도구",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "WebFetch 도구는 특정 URL의 웹 페이지 내용을 직접 가져옵니다. 공식 문서나 GitHub 이슈 등의 구체적인 페이지를 읽을 때 사용합니다.",
      },
      {
        id: "b09-q3",
        text: "종료된 이전 세션을 이어서 작업하는 명령어는?",
        choices: ["/continue", "/resume", "/restore", "/reconnect"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/resume 명령어로 이전 세션의 맥락을 복원하여 중단된 작업을 이어갈 수 있습니다.",
      },
      {
        id: "b09-q4",
        text: "/compact 명령어의 주요 기능은?",
        choices: [
          "대화를 완전히 삭제한다",
          "대화를 요약하여 컨텍스트 공간을 확보한다",
          "파일을 압축한다",
          "코드를 최소화한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/compact는 이전 대화를 요약하여 핵심 정보만 유지하면서 컨텍스트 공간을 확보합니다. 대화를 완전히 삭제하는 /clear와는 다릅니다.",
      },
      {
        id: "b09-q5",
        text: "현재 대화에서 분기점을 만들어 다른 방향의 작업을 시도하는 명령어는?",
        choices: ["/fork", "/branch", "/split", "/diverge"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "/branch 명령어를 사용하면 현재 대화에서 분기점을 만들어 다른 접근 방법을 시도할 수 있습니다.",
      },
    ],
  },
};
