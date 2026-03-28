import type { Lesson } from "../types";

export const lesson10: Lesson = {
  id: "advanced-10",
  title: "Desktop 고급: 컴퓨터 사용과 커넥터",
  objectives: [
    "Claude Desktop의 Computer Use 기능을 이해하고 macOS에서 활용한다",
    "라이브 앱 프리뷰를 통해 실시간 개발 피드백을 받는다",
    "GitHub, Slack, Linear 커넥터를 설정하고 워크플로우에 통합한다",
    "Desktop 전용 고급 기능을 실무에 적용한다",
  ],
  sections: [
    {
      type: "text",
      title: "Computer Use (컴퓨터 사용) 기능",
      content:
        "Computer Use는 Claude Desktop이 사용자의 macOS 화면을 직접 보고 마우스/키보드를 제어할 수 있는 혁신적인 기능입니다. Claude가 화면의 스크린샷을 캡처하여 현재 상태를 파악하고, 마우스 클릭, 텍스트 입력, 키보드 단축키 등의 동작을 수행합니다. 이를 통해 GUI 기반 애플리케이션 조작, 웹사이트 탐색, 복잡한 설정 작업 등을 Claude에게 위임할 수 있습니다. 예를 들어 '시스템 환경설정에서 네트워크 DNS를 변경해줘'와 같은 요청을 처리할 수 있습니다. Computer Use는 현재 macOS에서 지원되며, 보안을 위해 접근성 권한 허가가 필요합니다.",
    },
    {
      type: "code",
      title: "Computer Use 활용 예시",
      language: "text",
      content: `# Claude Desktop에서 Computer Use 요청 예시

사용자: "Xcode를 열고 새 Swift 프로젝트를 생성해줘.
        이름은 MyApp, 인터페이스는 SwiftUI로 설정해줘."

Claude의 동작:
1. Spotlight (Cmd+Space)으로 Xcode 검색 및 실행
2. "Create a new Xcode project" 클릭
3. "App" 템플릿 선택 → Next
4. Product Name에 "MyApp" 입력
5. Interface를 "SwiftUI"로 선택
6. 저장 위치 선택 → Create

사용자: "브라우저에서 localhost:3000을 열고 로그인 페이지의
        반응형 디자인을 확인해줘. 모바일 크기로 리사이즈해서
        레이아웃이 깨지는 부분을 찾아줘."

Claude의 동작:
1. Chrome 실행 → localhost:3000 입력
2. 페이지 로딩 확인 및 스크린샷 분석
3. 개발자 도구 열기 (Cmd+Option+I)
4. 반응형 모드 활성화, 모바일 크기로 변경
5. 레이아웃 확인 후 문제점 보고`,
    },
    {
      type: "text",
      title: "라이브 앱 프리뷰",
      content:
        "Claude Desktop의 라이브 앱 프리뷰 기능은 개발 중인 웹 애플리케이션을 실시간으로 확인하면서 코드를 수정할 수 있게 해줍니다. Claude가 코드를 변경하면 로컬 개발 서버의 핫 리로드를 통해 변경 사항이 즉시 반영되고, Claude는 업데이트된 화면을 스크린샷으로 캡처하여 의도한 대로 변경이 적용되었는지 확인합니다. 이 피드백 루프를 통해 'UI를 수정하고, 확인하고, 다시 조정하는' 반복 과정이 크게 단축됩니다. 특히 CSS 스타일링, 레이아웃 조정, 반응형 디자인 작업에서 매우 생산적입니다.",
    },
    {
      type: "code",
      title: "커넥터 설정 및 활용",
      language: "json",
      content: `// Claude Desktop 커넥터 설정
// Settings > Connectors에서 구성

// GitHub 커넥터: PR 관리, 이슈 추적, 코드 리뷰
// - GitHub 계정 인증 후 저장소 접근 권한 부여
// - "GitHub에서 내 PR의 리뷰 코멘트를 확인해줘"
// - "이슈 #42를 수정하는 PR을 생성해줘"

// Slack 커넥터: 메시지 읽기/쓰기, 채널 모니터링
// - Slack 워크스페이스 연결 후 채널 선택
// - "#dev 채널에서 오늘 논의된 배포 이슈를 요약해줘"
// - "이 버그 수정 결과를 #releases 채널에 공유해줘"

// Linear 커넥터: 프로젝트 관리, 이슈 트래킹
// - Linear 워크스페이스 연결
// - "현재 스프린트의 미완료 이슈를 확인해줘"
// - "이 기능 구현을 Linear 이슈로 생성해줘"

// 커넥터 조합 워크플로우 예시:
// "Linear에서 우선순위 높은 버그 목록을 가져오고,
//  코드를 분석해서 수정한 다음,
//  GitHub에 PR을 생성하고,
//  Slack에 수정 내역을 공유해줘"`,
    },
    {
      type: "tip",
      title: "Desktop 전용 기능 활용 전략",
      content:
        "Claude Desktop은 CLI 버전에서 제공하지 않는 고유한 기능들이 있습니다. Computer Use를 통한 GUI 자동화, 드래그 앤 드롭으로 파일/이미지 공유, 커넥터를 통한 서드파티 서비스 통합, 라이브 프리뷰 등이 대표적입니다. 효과적인 활용 전략은 코딩 작업 자체는 Claude Code(CLI)로 수행하되, 시각적 확인이 필요한 UI 작업, 외부 서비스와의 연동, GUI 앱 조작 등은 Claude Desktop을 사용하는 것입니다. 두 도구를 상황에 맞게 병행하면 개발 생산성을 극대화할 수 있습니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv10-q1",
        text: "Computer Use 기능을 사용하기 위해 macOS에서 필요한 권한은?",
        choices: [
          "관리자 권한",
          "접근성(Accessibility) 권한",
          "화면 녹화 권한",
          "전체 디스크 접근 권한",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Computer Use는 마우스/키보드 제어를 위해 macOS의 접근성(Accessibility) 권한이 필요합니다.",
      },
      {
        id: "adv10-q2",
        text: "라이브 앱 프리뷰가 특히 유용한 작업 유형은?",
        choices: [
          "데이터베이스 마이그레이션",
          "CSS 스타일링 및 반응형 디자인 조정",
          "백엔드 API 로직 구현",
          "단위 테스트 작성",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "라이브 앱 프리뷰는 코드 변경의 시각적 결과를 즉시 확인할 수 있어, CSS 스타일링과 반응형 디자인 작업에 특히 유용합니다.",
      },
      {
        id: "adv10-q3",
        text: "Claude Desktop에서 지원하는 커넥터가 아닌 것은?",
        choices: ["GitHub", "Slack", "Linear", "Terraform"],
        correctIndex: 3,
        isRecommended: true,
        explanation:
          "Claude Desktop은 GitHub, Slack, Linear 등의 커넥터를 기본 지원합니다. Terraform은 별도의 MCP 서버로 연동해야 합니다.",
      },
      {
        id: "adv10-q4",
        text: "Computer Use에서 Claude가 화면 상태를 파악하는 방법은?",
        choices: [
          "DOM 트리를 직접 읽는다",
          "화면의 스크린샷을 캡처하여 분석한다",
          "OS의 접근성 API를 통해 UI 요소를 탐색한다",
          "화면 녹화 영상을 실시간 분석한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "Computer Use는 화면의 스크린샷을 캡처하여 시각적으로 분석하는 방식으로 현재 상태를 파악합니다.",
      },
      {
        id: "adv10-q5",
        text: "Claude Code(CLI)와 Claude Desktop을 효과적으로 병행하는 전략은?",
        choices: [
          "모든 작업을 Claude Desktop에서만 수행한다",
          "코딩은 CLI로, 시각적 확인과 외부 서비스 연동은 Desktop으로 수행한다",
          "단순 작업은 CLI, 복잡한 작업은 Desktop으로 수행한다",
          "두 도구를 동시에 사용하지 않는다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "코딩 작업은 CLI가 효율적이고, 시각적 확인(UI/UX), GUI 조작, 커넥터 연동 등은 Desktop이 유리합니다. 상황에 맞게 병행하는 것이 최선입니다.",
      },
    ],
  },
};
