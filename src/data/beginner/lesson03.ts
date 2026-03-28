import type { Lesson } from "../types";

export const lesson03: Lesson = {
  id: "beginner-03",
  title: "파일 편집과 코드 생성",
  objectives: [
    "Edit 도구를 사용하여 기존 파일을 안전하게 수정한다",
    "Write 도구를 사용하여 새 파일을 생성한다",
    "코드 생성 시 모범 사례를 이해하고 적용한다",
  ],
  sections: [
    {
      type: "text",
      title: "Edit 도구 - 기존 파일 수정하기",
      content:
        "Edit 도구는 파일의 특정 부분을 정확하게 교체하는 도구입니다. old_string(기존 텍스트)과 new_string(새 텍스트)을 지정하여 변경합니다. 이 방식의 장점은 파일 전체를 다시 쓰지 않고 필요한 부분만 변경하므로, 다른 코드에 영향을 주지 않는 안전한 편집이 가능하다는 것입니다. Claude에게 '이 함수의 반환값을 변경해줘' 또는 '이 변수 이름을 바꿔줘'와 같이 요청하면 Edit 도구가 사용됩니다.",
    },
    {
      type: "code",
      title: "Edit 도구 동작 원리",
      language: "typescript",
      content: `// Edit 도구의 내부 동작 개념
// old_string: 파일에서 찾을 기존 텍스트
// new_string: 교체할 새 텍스트

// 예시: 함수 이름 변경
// old_string:
function getData() {
  return fetch("/api/data");
}

// new_string:
function fetchUserData() {
  return fetch("/api/users");
}`,
    },
    {
      type: "text",
      title: "Write 도구 - 새 파일 생성하기",
      content:
        "Write 도구는 새 파일을 생성하거나 기존 파일을 완전히 덮어쓸 때 사용합니다. 새로운 컴포넌트, 설정 파일, 테스트 파일 등을 처음부터 만들 때 적합합니다. 기존 파일을 수정할 때는 Edit 도구가 더 안전하므로, Write 도구는 주로 새 파일 생성에 사용하는 것이 좋습니다. Claude에게 '새로운 유틸리티 함수 파일을 만들어줘'라고 요청하면 Write 도구가 활용됩니다.",
    },
    {
      type: "warning",
      title: "안전한 편집을 위한 주의사항",
      content:
        "Edit 도구에서 old_string은 파일 내에서 고유해야 합니다. 동일한 텍스트가 여러 곳에 있으면 편집이 실패합니다. 이 경우 더 넓은 범위의 컨텍스트를 포함하여 고유하게 만들어야 합니다. 또한 Write 도구로 기존 파일을 덮어쓸 때는 원본 내용이 완전히 사라지므로, 기존 파일 수정에는 반드시 Edit 도구를 사용하세요. Claude는 보통 상황에 맞는 도구를 자동으로 선택하지만, 명시적으로 요청할 수도 있습니다.",
    },
    {
      type: "tip",
      title: "효과적인 코드 생성 요청 방법",
      content:
        "Claude에게 코드 생성을 요청할 때는 구체적으로 설명하는 것이 좋습니다. 단순히 '버튼 컴포넌트를 만들어줘'보다는 '접근성을 고려한 React 버튼 컴포넌트를 TypeScript로 만들어줘. variant, size, disabled 속성을 지원해야 해'와 같이 요구사항을 상세히 전달하면 더 좋은 결과를 얻을 수 있습니다. 또한 기존 프로젝트의 코딩 스타일과 패턴을 따르도록 요청하면 일관성을 유지할 수 있습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b03-q1",
        text: "기존 파일의 특정 부분만 수정할 때 사용하는 도구는?",
        choices: [
          "Write 도구",
          "Edit 도구",
          "Read 도구",
          "Patch 도구",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Edit 도구는 old_string과 new_string을 사용하여 파일의 특정 부분만 정확하게 교체합니다. 파일 전체를 다시 쓰지 않아 안전합니다.",
      },
      {
        id: "b03-q2",
        text: "Edit 도구에서 old_string이 파일 내에 여러 번 존재하면 어떻게 되나요?",
        choices: [
          "모든 위치가 동시에 변경된다",
          "첫 번째 위치만 변경된다",
          "편집이 실패한다",
          "마지막 위치만 변경된다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Edit 도구에서 old_string은 파일 내에서 고유해야 합니다. 여러 곳에 동일한 텍스트가 있으면 어느 것을 변경할지 특정할 수 없어 편집이 실패합니다.",
      },
      {
        id: "b03-q3",
        text: "새 파일을 처음부터 생성할 때 가장 적합한 도구는?",
        choices: [
          "Edit 도구",
          "Read 도구",
          "Write 도구",
          "Glob 도구",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "Write 도구는 새 파일을 생성하거나 기존 파일을 완전히 새로 작성할 때 사용합니다. 새 컴포넌트나 설정 파일 생성에 적합합니다.",
      },
      {
        id: "b03-q4",
        text: "기존 파일을 수정할 때 Write 도구 대신 Edit 도구를 사용해야 하는 이유는?",
        choices: [
          "Edit 도구가 더 빠르기 때문",
          "Write 도구는 파일을 완전히 덮어써서 다른 부분이 사라질 수 있기 때문",
          "Write 도구는 읽기 전용이기 때문",
          "Edit 도구가 더 많은 언어를 지원하기 때문",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "Write 도구는 파일 전체를 새 내용으로 덮어씁니다. 기존 코드 중 변경하지 않으려는 부분까지 사라질 수 있으므로, 부분 수정에는 Edit 도구가 안전합니다.",
      },
      {
        id: "b03-q5",
        text: "코드 생성을 요청할 때 가장 효과적인 방법은?",
        choices: [
          "최대한 짧게 요청한다",
          "코드를 직접 작성해서 붙여넣는다",
          "요구사항, 기술 스택, 지원할 기능을 구체적으로 설명한다",
          "영어로만 요청한다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "구체적인 요구사항(기술 스택, 지원 기능, 코딩 스타일 등)을 전달하면 Claude가 더 정확하고 유용한 코드를 생성할 수 있습니다.",
      },
    ],
  },
};
