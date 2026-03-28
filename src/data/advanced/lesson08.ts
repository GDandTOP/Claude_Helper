import type { Lesson } from "../types";

export const lesson08: Lesson = {
  id: "advanced-08",
  title: "엔터프라이즈와 원격 제어",
  objectives: [
    "엔터프라이즈 환경의 SSO, 관리형 설정, ZDR 기능을 이해한다",
    "조직 수준의 정책과 권한 관리를 설정한다",
    "/remote-control 기능을 활용한 외부 시스템 연동을 구현한다",
    "분석 대시보드를 통해 팀의 Claude 사용 패턴을 모니터링한다",
  ],
  sections: [
    {
      type: "text",
      title: "엔터프라이즈 핵심 기능",
      content:
        "Claude Code의 엔터프라이즈 플랜은 대규모 조직의 요구사항에 맞춘 고급 기능을 제공합니다. SSO(Single Sign-On)는 Okta, Azure AD 등 기업의 기존 인증 시스템과 통합되어 별도의 계정 관리 없이 조직 계정으로 로그인할 수 있습니다. 관리형 설정(Managed Settings)은 IT 관리자가 조직 전체의 Claude Code 설정을 중앙에서 관리할 수 있게 합니다. 허용된 도구, 모델 선택, 네트워크 정책 등을 조직 정책으로 강제할 수 있어 일관된 보안 수준을 유지합니다. ZDR(Zero Data Retention)은 대화 데이터가 Anthropic 서버에 저장되지 않도록 보장하여, 민감한 소스코드를 다루는 기업의 보안 요구사항을 충족합니다.",
    },
    {
      type: "code",
      title: "관리형 설정 구성 예시",
      language: "json",
      content: `// 조직 관리자가 배포하는 관리형 설정
// managed-settings.json (MDM을 통해 배포)
{
  "organizationId": "org-abc123",
  "policies": {
    "allowedModels": ["claude-sonnet-4-20250514", "claude-opus-4-20250514"],
    "allowedTools": {
      "Bash": {
        "enabled": true,
        "restrictions": ["no-network", "no-sudo"]
      },
      "Edit": { "enabled": true },
      "Read": { "enabled": true },
      "Write": {
        "enabled": true,
        "allowedPaths": ["src/**", "tests/**"]
      }
    },
    "maxSessionDuration": 3600,
    "requireApprovalFor": ["Bash", "Write"],
    "networkPolicy": {
      "allowedDomains": ["api.github.com", "registry.npmjs.org"],
      "blockExternalRequests": false
    }
  },
  "zdr": {
    "enabled": true,
    "dataRetentionDays": 0
  }
}`,
    },
    {
      type: "text",
      title: "원격 제어 (Remote Control)",
      content:
        "원격 제어 기능은 외부 애플리케이션이 실행 중인 Claude Code 세션과 프로그래밍 방식으로 상호작용할 수 있게 해주는 API입니다. 이를 통해 사내 도구, 대시보드, 또는 다른 자동화 시스템이 Claude Code에 작업을 요청하고 결과를 받을 수 있습니다. 예를 들어 사내 티켓 시스템에서 버그 티켓을 생성하면 자동으로 Claude Code가 해당 버그를 분석하고 수정 PR을 생성하는 워크플로우를 구축할 수 있습니다. 원격 제어는 WebSocket 기반으로 동작하며, 인증 토큰을 통한 보안 접근을 지원합니다.",
    },
    {
      type: "tip",
      title: "분석 대시보드 활용",
      content:
        "엔터프라이즈 분석 대시보드는 조직 전체의 Claude Code 사용 패턴을 시각화합니다. 팀별/개인별 사용량, 가장 많이 사용되는 도구와 기능, 비용 분석, 생산성 지표(작업 완료 시간, 코드 변경 규모) 등을 확인할 수 있습니다. 이 데이터를 활용하면 팀의 AI 활용 수준을 진단하고, 교육이 필요한 영역을 식별하며, 라이선스 최적화에 활용할 수 있습니다. 대시보드 데이터는 API로도 접근 가능하여 기존 BI 도구와 통합할 수 있습니다.",
    },
    {
      type: "warning",
      title: "엔터프라이즈 보안 체크리스트",
      content:
        "엔터프라이즈 환경에서 Claude Code를 도입할 때 반드시 확인해야 할 보안 사항들입니다. SSO 연동 시 MFA(Multi-Factor Authentication)를 필수로 설정하세요. 관리형 설정에서 Write, Bash 도구의 접근 경로와 권한을 명시적으로 제한하세요. ZDR이 활성화되어 있는지 확인하고, 정기적으로 감사 로그를 검토하세요. 네트워크 정책에서 허용된 외부 도메인만 접근 가능하도록 화이트리스트를 설정하세요. 이러한 조치들은 소스코드 유출과 무단 접근을 방지하는 데 필수적입니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv08-q1",
        text: "ZDR(Zero Data Retention)의 역할은?",
        choices: [
          "데이터를 암호화하여 저장한다",
          "대화 데이터가 Anthropic 서버에 저장되지 않도록 보장한다",
          "로컬 캐시를 자동으로 삭제한다",
          "네트워크 트래픽을 암호화한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "ZDR은 Claude와의 대화 데이터가 Anthropic 서버에 저장되지 않도록 보장하여, 민감한 소스코드를 다루는 기업의 보안 요구사항을 충족합니다.",
      },
      {
        id: "adv08-q2",
        text: "관리형 설정(Managed Settings)의 배포 방법은?",
        choices: [
          "각 개발자가 수동으로 설정한다",
          "Claude Desktop에서 자동 다운로드된다",
          "MDM(Mobile Device Management)을 통해 중앙에서 배포한다",
          "Git 저장소를 통해 동기화한다",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "관리형 설정은 IT 관리자가 MDM을 통해 조직 전체에 중앙 배포하여 일관된 정책을 강제합니다.",
      },
      {
        id: "adv08-q3",
        text: "원격 제어 기능이 사용하는 통신 프로토콜은?",
        choices: ["REST API", "WebSocket", "gRPC", "GraphQL"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "원격 제어는 WebSocket 기반으로 동작하여 실행 중인 Claude Code 세션과 실시간 양방향 통신을 지원합니다.",
      },
      {
        id: "adv08-q4",
        text: "엔터프라이즈 분석 대시보드에서 확인할 수 없는 것은?",
        choices: [
          "팀별 사용량 통계",
          "개발자의 개인 대화 내용 전문",
          "비용 분석 리포트",
          "가장 많이 사용되는 도구 통계",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "분석 대시보드는 사용 패턴과 통계를 제공하지만, 개발자의 개인 대화 내용 전문은 프라이버시 보호를 위해 노출되지 않습니다.",
      },
      {
        id: "adv08-q5",
        text: "엔터프라이즈 SSO 연동 시 반드시 설정해야 하는 보안 기능은?",
        choices: [
          "자동 로그아웃",
          "비밀번호 복잡도 규칙",
          "MFA(Multi-Factor Authentication)",
          "IP 화이트리스트",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "SSO 연동 시 MFA를 필수로 설정하여 계정 탈취 위험을 최소화해야 합니다. 이는 엔터프라이즈 보안의 기본 원칙입니다.",
      },
    ],
  },
};
