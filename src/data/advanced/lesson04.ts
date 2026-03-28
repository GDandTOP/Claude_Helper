import type { Lesson } from "../types";

export const lesson04: Lesson = {
  id: "advanced-04",
  title: "Skills와 플러그인 생태계",
  objectives: [
    "SKILL.md 형식을 이해하고 커스텀 스킬을 작성한다",
    "플러그인 마켓플레이스를 탐색하고 플러그인을 설치한다",
    "나만의 플러그인을 개발하고 배포하는 방법을 익힌다",
    "스킬과 플러그인의 차이점과 적절한 활용 시점을 판단한다",
  ],
  sections: [
    {
      type: "text",
      title: "스킬(Skills)의 개념",
      content:
        "스킬은 Claude Code가 특정 작업을 수행할 때 참조하는 재사용 가능한 지침 세트입니다. SKILL.md 파일로 정의되며, 프로젝트의 .claude/ 디렉토리 또는 글로벌 설정에 배치할 수 있습니다. 스킬은 Claude에게 특정 작업의 수행 방법, 규칙, 패턴을 가르치는 역할을 합니다. 예를 들어 'React 컴포넌트 생성 스킬'은 컴포넌트를 만들 때 따라야 할 파일 구조, 네이밍 컨벤션, 상태 관리 패턴 등을 정의합니다. 슬래시 명령(/command)으로 스킬을 호출할 수 있어 반복적인 워크플로우를 표준화하는 데 매우 유용합니다.",
    },
    {
      type: "code",
      title: "SKILL.md 작성 예시",
      language: "markdown",
      content: `# .claude/skills/create-api-endpoint.md
---
name: create-api-endpoint
description: RESTful API 엔드포인트를 표준 패턴으로 생성합니다
command: /create-endpoint
arguments:
  - name: resource
    description: 리소스 이름 (예: users, products)
    required: true
  - name: methods
    description: HTTP 메서드 목록 (예: GET,POST,PUT,DELETE)
    required: false
    default: "GET,POST"
---

## Instructions
다음 규칙에 따라 API 엔드포인트를 생성하세요:

1. **라우트 파일**: \`src/routes/{resource}.ts\`에 생성
2. **컨트롤러**: \`src/controllers/{resource}Controller.ts\`에 생성
3. **검증**: zod 스키마를 \`src/validators/{resource}.ts\`에 정의
4. **타입**: \`src/types/{resource}.ts\`에 인터페이스 정의
5. **테스트**: \`src/__tests__/{resource}.test.ts\`에 테스트 작성

## Patterns
- 에러 핸들링은 프로젝트의 AppError 클래스를 사용
- 응답 형식은 \`{ success: boolean, data: T, message: string }\`
- 페이지네이션은 cursor 기반으로 구현`,
    },
    {
      type: "text",
      title: "플러그인 마켓플레이스와 설치",
      content:
        "Claude Code 플러그인 생태계는 커뮤니티가 만든 다양한 확장 기능을 제공합니다. 플러그인은 새로운 도구, 스킬, 또는 통합 기능을 패키지로 묶어 배포한 것입니다. /install 명령어를 사용하여 공식 레지스트리에서 플러그인을 검색하고 설치할 수 있습니다. 설치된 플러그인은 자동으로 활성화되며, /plugins 명령어로 관리할 수 있습니다. 인기 있는 플러그인으로는 데이터베이스 마이그레이션 자동화, API 문서 생성, 성능 프로파일링 도구 등이 있습니다.",
    },
    {
      type: "tip",
      title: "스킬 vs 플러그인: 언제 무엇을 사용할까",
      content:
        "스킬은 가볍고 텍스트 기반이며, 주로 Claude의 행동 패턴을 정의하는 데 사용합니다. SKILL.md 파일 하나로 충분한 경우 스킬이 적합합니다. 반면 플러그인은 실행 가능한 코드, 외부 의존성, 복잡한 로직이 필요한 경우에 사용합니다. 예를 들어 '코드 리뷰 체크리스트'는 스킬로, 'Jira 티켓 자동 생성 및 동기화'는 플러그인으로 구현하는 것이 적합합니다. 프로젝트에 특화된 단순 워크플로우는 스킬로 시작하고, 범용적이고 복잡한 기능은 플러그인으로 발전시키세요.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv04-q1",
        text: "스킬(Skill)을 정의하는 파일 형식은?",
        choices: ["SKILL.json", "SKILL.yaml", "SKILL.md", "skill.config.ts"],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "스킬은 SKILL.md 마크다운 파일로 정의되며, front-matter 메타데이터와 지침을 포함합니다.",
      },
      {
        id: "adv04-q2",
        text: "스킬 파일에서 슬래시 명령을 지정하는 front-matter 필드는?",
        choices: ["trigger", "command", "invoke", "shortcut"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "SKILL.md의 front-matter에서 command 필드를 사용하여 슬래시 명령(예: /create-endpoint)을 지정합니다.",
      },
      {
        id: "adv04-q3",
        text: "설치된 플러그인을 관리하는 명령어는?",
        choices: ["/extensions", "/plugins", "/packages", "/addons"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/plugins 명령어를 사용하면 설치된 플러그인의 목록 확인, 활성화/비활성화, 업데이트, 제거 등을 관리할 수 있습니다.",
      },
      {
        id: "adv04-q4",
        text: "다음 중 플러그인보다 스킬로 구현하기에 더 적합한 것은?",
        choices: [
          "Jira 티켓 자동 생성 및 동기화",
          "외부 API 성능 프로파일링",
          "코드 리뷰 체크리스트 및 패턴 가이드",
          "데이터베이스 마이그레이션 자동화",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "코드 리뷰 체크리스트처럼 텍스트 기반의 행동 패턴 정의는 스킬이 적합합니다. 외부 시스템 연동이나 복잡한 로직이 필요한 경우 플러그인을 사용합니다.",
      },
      {
        id: "adv04-q5",
        text: "스킬의 주요 장점이 아닌 것은?",
        choices: [
          "마크다운 파일 하나로 간단히 정의 가능",
          "반복적인 워크플로우를 표준화",
          "외부 런타임 의존성 없이 동작",
          "복잡한 외부 API 통합에 최적화",
        ],
        correctIndex: 3,
        isRecommended: true,
        explanation:
          "복잡한 외부 API 통합은 플러그인의 영역입니다. 스킬은 가볍고 텍스트 기반으로 Claude의 행동 패턴을 정의하는 데 최적화되어 있습니다.",
      },
    ],
  },
};
