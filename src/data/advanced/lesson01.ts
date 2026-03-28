import type { Lesson } from "../types";

export const lesson01: Lesson = {
  id: "advanced-01",
  title: "MCP 서버 이해와 설정",
  objectives: [
    "MCP(Model Context Protocol)의 핵심 개념과 아키텍처를 이해한다",
    "settings.json에서 MCP 서버를 설정하고 관리하는 방법을 익힌다",
    "Figma, 데이터베이스 등 외부 도구를 Claude에 연결하는 실습을 수행한다",
    "/mcp 명령어를 활용하여 서버 상태를 점검하고 디버깅한다",
  ],
  sections: [
    {
      type: "text",
      title: "MCP란 무엇인가",
      content:
        "MCP(Model Context Protocol)는 Claude가 외부 도구 및 데이터 소스와 통신할 수 있게 해주는 개방형 프로토콜입니다. 기존에는 AI 모델이 외부 시스템과 상호작용하려면 각각의 API에 맞춘 별도의 통합 코드가 필요했습니다. MCP는 이 문제를 해결하기 위해 표준화된 인터페이스를 제공합니다. MCP 서버는 도구(Tools), 리소스(Resources), 프롬프트(Prompts)라는 세 가지 핵심 프리미티브를 노출하며, Claude는 이를 통해 파일 시스템 접근, 데이터베이스 쿼리, 외부 API 호출 등 다양한 작업을 수행할 수 있습니다. MCP는 JSON-RPC 2.0 기반으로 동작하며, stdio 또는 HTTP(SSE) 전송 방식을 지원합니다.",
    },
    {
      type: "code",
      title: "settings.json에서 MCP 서버 설정하기",
      language: "json",
      content: `// ~/.claude/settings.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/me/projects"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp"],
      "env": {
        "FIGMA_API_KEY": "your-api-key-here"
      }
    }
  }
}`,
    },
    {
      type: "tip",
      title: "/mcp 명령어로 서버 관리하기",
      content:
        "Claude Code에서 /mcp 명령어를 입력하면 현재 연결된 모든 MCP 서버의 상태를 확인할 수 있습니다. 각 서버의 연결 상태, 사용 가능한 도구 목록, 마지막 응답 시간 등을 한눈에 볼 수 있으며, 서버를 재시작하거나 특정 서버의 도구를 비활성화할 수도 있습니다. 문제가 발생했을 때 /mcp 명령어는 가장 먼저 확인해야 할 디버깅 도구입니다.",
    },
    {
      type: "warning",
      title: "MCP 서버 보안 주의사항",
      content:
        "MCP 서버는 로컬 시스템에서 실행되므로 보안에 각별히 주의해야 합니다. 신뢰할 수 없는 MCP 서버를 설치하면 파일 시스템 접근, 네트워크 요청 등의 권한이 악용될 수 있습니다. 항상 공식 또는 검증된 MCP 서버만 사용하고, env에 민감한 정보를 직접 기입하는 대신 환경 변수 참조를 활용하세요. 또한 프로젝트별 .mcp.json 파일을 팀원과 공유할 때는 API 키가 포함되어 있지 않은지 반드시 확인하세요.",
    },
    {
      type: "text",
      title: "프로젝트별 MCP 설정 (.mcp.json)",
      content:
        "글로벌 설정 외에도 프로젝트 루트에 .mcp.json 파일을 만들어 프로젝트별 MCP 서버를 설정할 수 있습니다. 이 파일은 Git으로 버전 관리할 수 있어 팀 전체가 동일한 도구 환경을 공유하는 데 유용합니다. .mcp.json의 형식은 settings.json의 mcpServers 섹션과 동일합니다. Claude Code는 세션 시작 시 프로젝트 루트의 .mcp.json을 자동으로 감지하여 해당 서버들을 시작합니다. 글로벌 설정과 프로젝트 설정이 충돌하는 경우 프로젝트 설정이 우선합니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv01-q1",
        text: "MCP 서버가 노출하는 세 가지 핵심 프리미티브가 아닌 것은?",
        choices: ["Tools", "Resources", "Prompts", "Schemas"],
        correctIndex: 3,
        isRecommended: true,
        explanation:
          "MCP 서버는 Tools(도구), Resources(리소스), Prompts(프롬프트)라는 세 가지 프리미티브를 노출합니다. Schemas는 MCP의 핵심 프리미티브가 아닙니다.",
      },
      {
        id: "adv01-q2",
        text: "MCP 서버의 전송 방식으로 지원되는 것을 모두 고르면?",
        choices: [
          "stdio와 HTTP(SSE)",
          "WebSocket과 gRPC",
          "TCP와 UDP",
          "MQTT와 AMQP",
        ],
        correctIndex: 0,
        isRecommended: false,
        explanation:
          "MCP는 stdio(표준 입출력)와 HTTP(SSE, Server-Sent Events) 두 가지 전송 방식을 지원합니다.",
      },
      {
        id: "adv01-q3",
        text: "프로젝트별 MCP 설정 파일의 이름은 무엇인가?",
        choices: [
          "mcp-config.json",
          ".mcp.json",
          "mcp.settings.json",
          ".mcprc",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "프로젝트 루트에 .mcp.json 파일을 생성하여 프로젝트별 MCP 서버를 설정할 수 있습니다.",
      },
      {
        id: "adv01-q4",
        text: "Claude Code에서 MCP 서버 상태를 확인하는 명령어는?",
        choices: ["/status mcp", "/mcp", "/server list", "/tools"],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "/mcp 명령어를 사용하면 현재 연결된 모든 MCP 서버의 상태, 도구 목록, 응답 시간 등을 확인할 수 있습니다.",
      },
      {
        id: "adv01-q5",
        text: "글로벌 설정과 프로젝트 MCP 설정이 충돌할 경우 어느 것이 우선하는가?",
        choices: [
          "글로벌 설정이 항상 우선한다",
          "프로젝트 설정이 우선한다",
          "마지막으로 수정된 설정이 우선한다",
          "충돌 시 오류가 발생한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "글로벌 설정과 프로젝트 설정이 충돌하는 경우 프로젝트 설정(.mcp.json)이 우선 적용됩니다.",
      },
    ],
  },
};
