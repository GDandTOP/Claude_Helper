import type { Lesson } from "../types";

export const lesson07: Lesson = {
  id: "advanced-07",
  title: "브라우저 자동화와 스케줄링",
  objectives: [
    "Claude Desktop의 Chrome 통합을 활용한 웹 테스트를 수행한다",
    "스크린샷 캡처를 활용한 시각적 검증 워크플로우를 구현한다",
    "스케줄링 기능을 설정하여 반복 작업을 자동화한다",
    "브라우저 자동화와 스케줄링을 결합한 모니터링 시스템을 구축한다",
  ],
  sections: [
    {
      type: "text",
      title: "Chrome 통합과 웹 테스트",
      content:
        "Claude Desktop은 Chrome 브라우저와 통합되어 웹 페이지를 직접 탐색하고 상호작용할 수 있습니다. 이를 통해 웹 애플리케이션의 UI 테스트, 접근성 검사, 성능 측정 등을 수행할 수 있습니다. Claude에게 특정 URL을 열고 요소를 클릭하거나 폼을 작성하도록 지시할 수 있으며, 페이지의 시각적 상태를 스크린샷으로 캡처하여 분석할 수 있습니다. MCP 기반 브라우저 도구(예: Puppeteer MCP 서버)를 추가하면 Claude Code에서도 프로그래밍 방식으로 브라우저를 제어할 수 있습니다.",
    },
    {
      type: "code",
      title: "브라우저 자동화 MCP 서버 설정",
      language: "json",
      content: `// ~/.claude/settings.json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "env": {
        "PUPPETEER_LAUNCH_OPTIONS": "{ \\"headless\\": false }",
        "ALLOW_DANGEROUS": "true"
      }
    }
  }
}

// 사용 예시 (Claude Code에서):
// "localhost:3000을 열고 로그인 폼에 테스트 계정으로 로그인한 후,
//  대시보드 페이지의 스크린샷을 캡처해줘"`,
    },
    {
      type: "text",
      title: "스케줄링을 통한 반복 작업 자동화",
      content:
        "Claude Code의 스케줄링 기능을 사용하면 정기적으로 실행되어야 하는 작업을 자동화할 수 있습니다. 예를 들어 매일 아침 의존성 보안 취약점 검사, 매주 코드 품질 리포트 생성, PR이 병합될 때마다 문서 업데이트 등을 예약할 수 있습니다. 내부적으로 cron 스케줄링과 연동되며, Headless 모드(-p)로 실행됩니다. 스케줄된 작업의 결과는 로그로 기록되고, 필요시 Slack이나 이메일로 알림을 받을 수 있습니다.",
    },
    {
      type: "code",
      title: "스케줄링 설정 및 활용",
      language: "bash",
      content: `# crontab과 Claude Code를 결합한 자동화 예시
# crontab -e로 편집

# 매일 오전 9시: 의존성 보안 검사
0 9 * * * cd /path/to/project && claude -p --max-turns 3 \
  "package.json의 의존성 보안 취약점을 검사하고 결과를 report.md에 저장해줘" \
  2>&1 >> /var/log/claude-security.log

# 매주 월요일: 코드 품질 리포트
0 10 * * 1 cd /path/to/project && claude -p --max-turns 5 \
  "src/ 디렉토리의 코드 품질을 분석하고 주간 리포트를 생성해줘" \
  2>&1 >> /var/log/claude-quality.log

# 스크린샷 기반 시각적 회귀 테스트 (매일 배포 후)
30 14 * * * cd /path/to/project && claude -p --max-turns 10 \
  "스테이징 환경(staging.example.com)의 주요 5개 페이지 스크린샷을 캡처하고 \
   이전 버전과 시각적 차이를 비교해줘"`,
    },
    {
      type: "tip",
      title: "시각적 회귀 테스트 워크플로우",
      content:
        "브라우저 자동화와 스크린샷 캡처를 결합하면 강력한 시각적 회귀 테스트 시스템을 구축할 수 있습니다. 기준(baseline) 스크린샷을 저장해두고, 배포 후 동일한 페이지의 스크린샷을 새로 캡처하여 Claude에게 시각적 차이를 분석하도록 요청합니다. Claude는 레이아웃 깨짐, 색상 변화, 요소 누락 등을 감지하고 리포트를 생성합니다. 이 방식은 전통적인 픽셀 비교 방식보다 문맥을 이해한 지능적인 비교가 가능합니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv07-q1",
        text: "Claude Code에서 프로그래밍 방식으로 브라우저를 제어하려면 무엇을 사용하는가?",
        choices: [
          "내장 브라우저 API",
          "MCP 기반 브라우저 도구 (예: Puppeteer MCP 서버)",
          "Chrome Extension",
          "Selenium WebDriver 직접 호출",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Claude Code에서는 Puppeteer MCP 서버와 같은 MCP 기반 브라우저 도구를 통해 프로그래밍 방식으로 브라우저를 제어할 수 있습니다.",
      },
      {
        id: "adv07-q2",
        text: "스케줄된 Claude Code 작업은 어떤 모드로 실행되는가?",
        choices: [
          "대화형(Interactive) 모드",
          "Plan 모드",
          "Headless 모드 (-p)",
          "Debug 모드",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "스케줄된 작업은 사용자 입력 없이 자동으로 실행되어야 하므로 Headless 모드(-p)로 실행됩니다.",
      },
      {
        id: "adv07-q3",
        text: "시각적 회귀 테스트에서 Claude를 활용하는 이점은?",
        choices: [
          "픽셀 단위로 정확한 비교가 가능하다",
          "테스트 실행 속도가 더 빠르다",
          "문맥을 이해한 지능적인 시각적 비교가 가능하다",
          "브라우저 없이 테스트할 수 있다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Claude는 단순 픽셀 비교가 아닌, 레이아웃 의미, UI 패턴, 사용자 경험 관점에서 문맥을 이해한 지능적인 시각적 비교가 가능합니다.",
      },
      {
        id: "adv07-q4",
        text: "cron 스케줄 표현식 '0 9 * * 1'의 의미는?",
        choices: [
          "매일 오전 9시",
          "매주 월요일 오전 9시",
          "매월 1일 오전 9시",
          "1월 매일 오전 9시",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "cron 표현식 '0 9 * * 1'에서 마지막 1은 요일(월요일)을 나타냅니다. 따라서 매주 월요일 오전 9시에 실행됩니다.",
      },
      {
        id: "adv07-q5",
        text: "스케줄된 작업의 결과를 확인하는 가장 좋은 방법은?",
        choices: [
          "매번 수동으로 터미널에서 확인한다",
          "로그 기록과 Slack/이메일 알림을 설정한다",
          "Claude Desktop을 항상 열어둔다",
          "작업 결과를 데이터베이스에 저장한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "스케줄된 작업의 결과는 로그 파일에 기록하고, Slack이나 이메일로 알림을 받는 것이 가장 효과적인 모니터링 방법입니다.",
      },
    ],
  },
};
