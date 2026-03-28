import type { Lesson } from "../types";

export const lesson03: Lesson = {
  id: "advanced-03",
  title: "커스텀 에이전트와 팀",
  objectives: [
    ".claude/agents/ 디렉토리 구조와 에이전트 파일 형식을 이해한다",
    "특정 역할에 최적화된 커스텀 서브에이전트를 작성한다",
    "AGENTS.md를 활용한 프로젝트 수준의 에이전트 가이드라인을 설정한다",
    "에이전트 팀을 구성하고 에이전트 간 메시징을 구현한다",
  ],
  sections: [
    {
      type: "text",
      title: "커스텀 에이전트란",
      content:
        "커스텀 에이전트는 Claude Code 내에서 특정 역할이나 전문 분야에 맞게 구성된 서브에이전트입니다. .claude/agents/ 디렉토리에 마크다운(.md) 파일로 정의하며, 각 에이전트는 고유한 시스템 프롬프트, 사용 가능한 도구 목록, 행동 지침을 가집니다. 예를 들어 코드 리뷰 전문 에이전트, 테스트 작성 에이전트, 보안 감사 에이전트 등을 만들 수 있습니다. Claude Code에서 /agents 명령으로 사용 가능한 에이전트 목록을 확인하고, 대화 중에 특정 에이전트를 호출할 수 있습니다.",
    },
    {
      type: "code",
      title: "커스텀 에이전트 파일 작성 예시",
      language: "markdown",
      content: `# .claude/agents/code-reviewer.md

You are a senior code reviewer specializing in TypeScript and React.

## Role
- 코드 품질, 성능, 보안 관점에서 리뷰를 수행합니다.
- 모든 피드백은 구체적인 개선 제안과 함께 제공합니다.

## Guidelines
- SOLID 원칙 준수 여부를 확인합니다.
- 타입 안전성이 올바르게 보장되는지 검토합니다.
- 잠재적인 메모리 누수나 성능 병목을 식별합니다.
- XSS, CSRF 등 보안 취약점을 점검합니다.

## Allowed Tools
- Read
- Glob
- Grep
- Bash (read-only commands only)

## Output Format
각 이슈를 [심각도: 높음/중간/낮음] 형태로 분류하여 보고합니다.`,
    },
    {
      type: "text",
      title: "AGENTS.md로 프로젝트 가이드라인 설정",
      content:
        "AGENTS.md는 프로젝트 루트 또는 특정 디렉토리에 배치하여 해당 범위에서 Claude와 에이전트들이 따라야 할 가이드라인을 정의하는 파일입니다. CLAUDE.md가 일반적인 프로젝트 컨텍스트를 제공한다면, AGENTS.md는 에이전트의 행동 방식, 역할 분담, 코드 컨벤션 등을 더 세밀하게 지정합니다. 하위 디렉토리의 AGENTS.md는 상위 디렉토리의 설정을 상속하면서 오버라이드할 수 있어, 모듈별로 다른 에이전트 지침을 적용할 수 있습니다.",
    },
    {
      type: "tip",
      title: "에이전트 팀 구성 전략",
      content:
        "복잡한 작업에는 여러 에이전트를 팀으로 구성하면 효과적입니다. 예를 들어 대규모 리팩토링 시 분석 에이전트가 코드 구조를 파악하고, 구현 에이전트가 변경을 수행하며, 리뷰 에이전트가 결과를 검증하는 파이프라인을 구성할 수 있습니다. Claude Code의 서브에이전트 기능을 활용하면 메인 에이전트가 작업을 분할하여 각 서브에이전트에게 위임하고, 결과를 종합하여 최종 응답을 생성합니다. 각 에이전트에 명확한 역할과 책임을 부여하는 것이 핵심입니다.",
    },
    {
      type: "code",
      title: "에이전트 호출 및 팀 워크플로우",
      language: "bash",
      content: `# 사용 가능한 에이전트 목록 확인
# Claude Code에서 /agents 입력

# 특정 에이전트를 직접 호출
claude --agent code-reviewer "src/components/ 디렉토리의 코드를 리뷰해줘"

# 여러 에이전트를 순차적으로 활용하는 워크플로우 예시
# 1단계: 분석 에이전트로 현재 코드 구조 파악
claude --agent analyzer "현재 인증 모듈의 의존성 구조를 분석해줘"

# 2단계: 구현 에이전트로 리팩토링 수행
claude --agent implementer "분석 결과를 바탕으로 인증 모듈을 리팩토링해줘"

# 3단계: 리뷰 에이전트로 변경사항 검증
claude --agent code-reviewer "리팩토링된 인증 모듈의 변경사항을 리뷰해줘"`,
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv03-q1",
        text: "커스텀 에이전트 파일은 어느 디렉토리에 저장하는가?",
        choices: [
          ".claude/plugins/",
          ".claude/agents/",
          ".claude/custom/",
          ".claude/bots/",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "커스텀 에이전트는 .claude/agents/ 디렉토리에 마크다운(.md) 파일로 정의합니다.",
      },
      {
        id: "adv03-q2",
        text: "AGENTS.md의 역할로 가장 적절한 것은?",
        choices: [
          "에이전트의 API 키를 저장한다",
          "에이전트의 행동 방식과 가이드라인을 정의한다",
          "에이전트의 실행 로그를 기록한다",
          "에이전트의 버전을 관리한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "AGENTS.md는 프로젝트 범위에서 에이전트들이 따라야 할 행동 방식, 역할 분담, 코드 컨벤션 등의 가이드라인을 정의하는 파일입니다.",
      },
      {
        id: "adv03-q3",
        text: "하위 디렉토리의 AGENTS.md는 상위 설정과 어떤 관계인가?",
        choices: [
          "상위 설정을 완전히 대체한다",
          "상위 설정을 상속하면서 오버라이드할 수 있다",
          "상위 설정과 독립적으로 동작한다",
          "상위 설정이 항상 우선한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "하위 디렉토리의 AGENTS.md는 상위 디렉토리의 설정을 상속하면서 필요한 부분만 오버라이드할 수 있습니다.",
      },
      {
        id: "adv03-q4",
        text: "에이전트 팀 구성 시 가장 중요한 원칙은?",
        choices: [
          "에이전트 수를 최대한 많이 만든다",
          "모든 에이전트가 동일한 도구를 사용한다",
          "각 에이전트에 명확한 역할과 책임을 부여한다",
          "에이전트 간 통신을 최소화한다",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "에이전트 팀의 효과를 극대화하려면 각 에이전트에 명확한 역할과 책임을 부여하고, 작업을 적절히 분할하는 것이 핵심입니다.",
      },
      {
        id: "adv03-q5",
        text: "CLI에서 특정 에이전트를 직접 호출하는 플래그는?",
        choices: [
          "--bot",
          "--agent",
          "--role",
          "--persona",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "claude --agent <에이전트명> 명령으로 특정 커스텀 에이전트를 직접 호출할 수 있습니다.",
      },
    ],
  },
};
