import type { Lesson } from "../types";

export const lesson05: Lesson = {
  id: "advanced-05",
  title: "Plan 모드와 Headless 모드",
  objectives: [
    "Plan 모드를 활용하여 코드 변경 없이 분석과 계획을 수립한다",
    "-p 플래그를 사용한 비대화형(Headless) 모드를 이해한다",
    "JSON 출력을 활용한 파이프라인 연동을 구현한다",
    "예산 제한과 CI/CD 통합 패턴을 적용한다",
  ],
  sections: [
    {
      type: "text",
      title: "Plan 모드의 개념과 활용",
      content:
        "Plan 모드는 Claude Code가 실제 파일을 수정하지 않고 읽기 전용으로 코드를 분석하는 모드입니다. Shift+Tab 키로 Plan 모드와 Act 모드를 전환할 수 있습니다. Plan 모드에서 Claude는 코드베이스를 탐색하고, 변경 계획을 세우며, 잠재적 문제를 식별하지만 실제로 파일을 수정하거나 명령을 실행하지는 않습니다. 이는 대규모 리팩토링 전 영향 분석, 버그의 근본 원인 추적, 아키텍처 리뷰 등에 매우 유용합니다. Plan 모드에서 충분한 분석이 끝나면 Act 모드로 전환하여 실제 변경을 수행할 수 있습니다.",
    },
    {
      type: "code",
      title: "Headless 모드와 -p 플래그",
      language: "bash",
      content: `# -p 플래그: 비대화형 모드로 실행 (결과를 stdout에 출력)
claude -p "이 프로젝트의 사용되지 않는 의존성을 찾아줘"

# JSON 출력 형식 지정
claude -p --output-format json "package.json의 보안 취약점을 분석해줘"

# 파이프라인에서 활용
cat error.log | claude -p "이 에러 로그를 분석하고 원인을 요약해줘"

# 예산 제한 설정 (최대 토큰 사용량 지정)
claude -p --max-turns 5 "src/ 디렉토리의 코드 품질을 평가해줘"

# stdin으로 컨텍스트 전달
git diff HEAD~3 | claude -p "이 변경사항을 리뷰하고 개선점을 제안해줘"`,
    },
    {
      type: "code",
      title: "CI/CD 파이프라인 통합 예시",
      language: "yaml",
      content: `# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Claude Code Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # PR의 변경사항을 Claude로 리뷰
          git diff origin/main...HEAD | claude -p \\
            --output-format json \\
            --max-turns 3 \\
            "이 PR의 변경사항을 리뷰해줘. 버그, 보안 이슈, 성능 문제를 중점으로." \\
            > review-result.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const review = require('./review-result.json');
            // PR에 리뷰 코멘트 작성`,
    },
    {
      type: "tip",
      title: "예산 관리와 비용 최적화",
      content:
        "Headless 모드에서 --max-turns 옵션을 설정하면 Claude가 사용할 수 있는 최대 대화 턴 수를 제한할 수 있습니다. CI/CD 환경에서는 예상치 못한 비용 증가를 방지하기 위해 항상 이 제한을 설정하는 것이 좋습니다. 또한 --model 옵션으로 작업 복잡도에 맞는 모델을 선택하여 비용을 최적화할 수 있습니다. 간단한 코드 포맷팅 검사는 가벼운 모델로, 복잡한 아키텍처 리뷰는 고성능 모델로 실행하세요.",
    },
    {
      type: "warning",
      title: "Headless 모드의 보안 고려사항",
      content:
        "CI/CD 환경에서 Claude Code를 실행할 때는 --allowedTools 플래그로 사용 가능한 도구를 명시적으로 제한해야 합니다. 기본적으로 모든 도구가 활성화되면 의도치 않은 파일 수정이나 네트워크 요청이 발생할 수 있습니다. 또한 ANTHROPIC_API_KEY는 반드시 시크릿으로 관리하고, 로그에 노출되지 않도록 주의하세요. CI 환경에서는 읽기 전용 도구만 허용하는 것을 기본 원칙으로 삼으세요.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv05-q1",
        text: "Plan 모드와 Act 모드를 전환하는 단축키는?",
        choices: ["Ctrl+Tab", "Shift+Tab", "Alt+Tab", "Ctrl+Shift+P"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Shift+Tab 키를 눌러 Plan 모드(읽기 전용 분석)와 Act 모드(실제 실행) 사이를 전환할 수 있습니다.",
      },
      {
        id: "adv05-q2",
        text: "-p 플래그의 역할은?",
        choices: [
          "Plan 모드를 활성화한다",
          "비대화형 모드로 결과를 stdout에 출력한다",
          "플러그인 모드를 활성화한다",
          "프로파일링 모드를 실행한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "-p 플래그는 비대화형(Headless) 모드로 Claude Code를 실행하며, 결과를 표준 출력(stdout)에 출력합니다.",
      },
      {
        id: "adv05-q3",
        text: "Headless 모드에서 최대 대화 턴 수를 제한하는 옵션은?",
        choices: [
          "--budget",
          "--max-turns",
          "--limit",
          "--max-tokens",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "--max-turns 옵션을 사용하면 Claude가 사용할 수 있는 최대 대화 턴 수를 제한하여 비용을 관리할 수 있습니다.",
      },
      {
        id: "adv05-q4",
        text: "CI/CD에서 Claude Code 사용 시 보안 모범 사례가 아닌 것은?",
        choices: [
          "--allowedTools로 사용 가능한 도구를 제한한다",
          "API 키를 시크릿으로 관리한다",
          "모든 도구를 활성화하여 최대 기능을 활용한다",
          "읽기 전용 도구만 허용하는 것을 기본 원칙으로 한다",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "CI/CD 환경에서 모든 도구를 활성화하면 의도치 않은 파일 수정이나 보안 문제가 발생할 수 있습니다. 필요한 도구만 명시적으로 허용해야 합니다.",
      },
      {
        id: "adv05-q5",
        text: "Plan 모드가 특히 유용한 상황이 아닌 것은?",
        choices: [
          "대규모 리팩토링 전 영향 분석",
          "버그의 근본 원인 추적",
          "파일을 빠르게 일괄 수정할 때",
          "아키텍처 리뷰와 설계 검토",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "파일을 실제로 수정하려면 Act 모드가 필요합니다. Plan 모드는 읽기 전용으로 분석과 계획 수립에 특화되어 있습니다.",
      },
    ],
  },
};
