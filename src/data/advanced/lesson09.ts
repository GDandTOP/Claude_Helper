import type { Lesson } from "../types";

export const lesson09: Lesson = {
  id: "advanced-09",
  title: "Extended Thinking과 모델 설정",
  objectives: [
    "Extended Thinking의 동작 원리와 활성화 방법을 이해한다",
    "effort 레벨(low/medium/high/max)에 따른 성능 차이를 파악한다",
    "작업 유형에 맞는 모델을 선택하고 전환하는 방법을 익힌다",
    "Bedrock, Vertex 등 다양한 프로바이더를 설정하고 활용한다",
  ],
  sections: [
    {
      type: "text",
      title: "Extended Thinking이란",
      content:
        "Extended Thinking은 Claude가 복잡한 문제를 해결할 때 내부적으로 더 깊은 추론 과정을 거치도록 하는 기능입니다. 일반 모드에서 Claude는 즉시 응답을 생성하지만, Extended Thinking이 활성화되면 먼저 문제를 분석하고, 여러 접근 방식을 탐색하며, 자체적으로 추론을 검증한 후 최종 응답을 생성합니다. 이 과정은 사용자에게 'thinking' 블록으로 표시됩니다. 복잡한 디버깅, 아키텍처 설계, 알고리즘 최적화 등 깊은 사고가 필요한 작업에서 특히 효과적입니다. Claude Code에서는 설정에서 Extended Thinking을 활성화하거나, 모델 선택 시 thinking 지원 모델을 선택하여 사용할 수 있습니다.",
    },
    {
      type: "code",
      title: "Effort 레벨 설정과 모델 선택",
      language: "bash",
      content: `# Claude Code에서 모델 변경
# /model 명령어로 대화 중 모델 전환
# 또는 CLI 플래그로 지정:

# 기본 모델로 실행
claude "이 함수를 리팩토링해줘"

# 특정 모델 지정
claude --model claude-opus-4-20250514 "복잡한 분산 시스템 아키텍처를 설계해줘"

# Extended Thinking 활용 (effort 레벨 조절)
# settings.json에서 설정:
# {
#   "thinking": {
#     "enabled": true,
#     "effort": "high"   // "low" | "medium" | "high" | "max"
#   }
# }

# effort 레벨별 특성:
# low    - 빠른 응답, 간단한 작업에 적합 (토큰 사용량 최소)
# medium - 일반적인 코딩 작업에 균형 잡힌 선택
# high   - 복잡한 디버깅, 리팩토링에 적합
# max    - 최대 추론 깊이, 아키텍처 설계/알고리즘 최적화에 사용`,
    },
    {
      type: "text",
      title: "다양한 프로바이더 설정",
      content:
        "Claude Code는 Anthropic 직접 API 외에도 Amazon Bedrock과 Google Vertex AI를 프로바이더로 지원합니다. 기업 환경에서는 기존 클라우드 인프라와의 통합, 비용 관리, 데이터 주권 요구사항 등의 이유로 Bedrock이나 Vertex를 선호하는 경우가 많습니다. Bedrock을 사용하면 AWS IAM 기반 인증과 VPC 내 프라이빗 통신이 가능하고, Vertex를 사용하면 Google Cloud의 보안 정책과 통합됩니다. 환경 변수를 통해 프로바이더를 설정하며, 프로바이더에 따라 사용 가능한 모델과 기능이 다를 수 있습니다.",
    },
    {
      type: "code",
      title: "프로바이더별 환경 변수 설정",
      language: "bash",
      content: `# 1. Anthropic 직접 API (기본값)
export ANTHROPIC_API_KEY="sk-ant-..."

# 2. Amazon Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION="us-east-1"
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
# 또는 AWS 프로필 사용
export AWS_PROFILE="claude-bedrock"

# 3. Google Vertex AI
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION="us-east5"
export ANTHROPIC_VERTEX_PROJECT_ID="my-gcp-project"

# 프로바이더 선택 후 Claude Code 실행
claude --model claude-sonnet-4-20250514 "프로젝트를 분석해줘"

# 폴백 모델 설정 (기본 모델 사용 불가 시 대체)
# settings.json:
# {
#   "model": "claude-opus-4-20250514",
#   "fallbackModels": [
#     "claude-sonnet-4-20250514",
#     "claude-haiku-4-20250514"
#   ]
# }`,
    },
    {
      type: "tip",
      title: "작업 유형별 최적 설정 가이드",
      content:
        "작업의 복잡도에 따라 모델과 effort 레벨을 적절히 조합하면 비용 대비 최대 효과를 얻을 수 있습니다. 간단한 코드 포맷팅이나 변수명 변경은 Sonnet + low effort로 충분합니다. 일반적인 기능 구현이나 버그 수정은 Sonnet + medium effort가 좋은 균형점입니다. 복잡한 시스템 디버깅이나 대규모 리팩토링은 Sonnet + high effort를 권장합니다. 아키텍처 설계, 보안 감사, 성능 최적화 등 최고 수준의 추론이 필요한 작업에는 Opus + max effort를 사용하세요. 폴백 모델을 설정해두면 API 장애 시에도 작업이 중단되지 않습니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv09-q1",
        text: "Extended Thinking의 추론 과정은 사용자에게 어떻게 표시되는가?",
        choices: [
          "별도의 로그 파일에 기록된다",
          "'thinking' 블록으로 표시된다",
          "응답에 포함되지 않고 숨겨진다",
          "디버그 모드에서만 확인 가능하다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Extended Thinking의 추론 과정은 사용자에게 'thinking' 블록으로 표시되어 Claude의 사고 과정을 투명하게 확인할 수 있습니다.",
      },
      {
        id: "adv09-q2",
        text: "effort 레벨 중 일반적인 코딩 작업에 가장 균형 잡힌 선택은?",
        choices: ["low", "medium", "high", "max"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "medium effort는 응답 속도와 추론 깊이의 균형이 좋아 일반적인 코딩 작업에 적합합니다.",
      },
      {
        id: "adv09-q3",
        text: "Amazon Bedrock을 프로바이더로 사용하기 위한 환경 변수는?",
        choices: [
          "ANTHROPIC_USE_BEDROCK=1",
          "CLAUDE_CODE_USE_BEDROCK=1",
          "AWS_BEDROCK_ENABLED=true",
          "USE_AWS_BEDROCK=1",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Amazon Bedrock을 프로바이더로 사용하려면 CLAUDE_CODE_USE_BEDROCK=1 환경 변수를 설정해야 합니다.",
      },
      {
        id: "adv09-q4",
        text: "폴백 모델(fallback model)의 역할은?",
        choices: [
          "Extended Thinking을 대체한다",
          "기본 모델 사용 불가 시 대체 모델로 작동한다",
          "여러 모델의 응답을 합산한다",
          "보안 검사를 수행하는 보조 모델이다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "폴백 모델은 기본 모델이 API 장애 등으로 사용 불가능할 때 자동으로 대체되어 작업의 연속성을 보장합니다.",
      },
      {
        id: "adv09-q5",
        text: "아키텍처 설계, 보안 감사 등 최고 수준의 추론이 필요한 작업에 권장되는 설정은?",
        choices: [
          "Haiku + low effort",
          "Sonnet + medium effort",
          "Sonnet + high effort",
          "Opus + max effort",
        ],
        correctIndex: 3,
        isRecommended: true,
        explanation:
          "아키텍처 설계, 보안 감사 등 최고 수준의 추론이 필요한 작업에는 가장 강력한 Opus 모델과 max effort 조합을 권장합니다.",
      },
    ],
  },
};
