import type { Lesson } from "../types";

export const lesson02: Lesson = {
  id: "advanced-02",
  title: "Hooks 시스템 심화",
  objectives: [
    "Claude Code의 Hook 이벤트 유형과 실행 시점을 정확히 이해한다",
    "Command Hook과 HTTP Hook의 차이점과 사용 사례를 파악한다",
    "Matcher를 활용한 조건부 Hook 실행을 설정한다",
    "실무에서 활용할 수 있는 Hook 패턴을 구현한다",
  ],
  sections: [
    {
      type: "text",
      title: "Hook 이벤트의 종류와 실행 시점",
      content:
        "Hooks는 Claude Code의 특정 동작 전후에 사용자 정의 코드를 실행할 수 있는 시스템입니다. 주요 이벤트로는 SessionStart(세션 시작 시), PreToolUse(도구 실행 전), PostToolUse(도구 실행 후), Stop(Claude 응답 완료 시), SubagentStop(서브에이전트 응답 완료 시) 등이 있습니다. PreToolUse Hook은 Claude가 특정 도구를 호출하기 직전에 실행되어 입력을 검증하거나 변환할 수 있고, PostToolUse Hook은 도구 실행 결과를 가공하거나 로깅하는 데 사용됩니다. Stop Hook은 Claude의 최종 응답 직후에 실행되어 결과를 후처리하거나 외부 시스템에 알림을 보내는 데 활용됩니다.",
    },
    {
      type: "code",
      title: "settings.json에서 Hook 설정하기",
      language: "json",
      content: `// ~/.claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '파일 수정 감지: $TOOL_INPUT' >> ~/.claude/edit-log.txt"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/local/bin/check-security.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/scripts/notify-slack.py '$STOP_REASON'"
          }
        ]
      }
    ]
  }
}`,
    },
    {
      type: "tip",
      title: "Matcher 패턴 활용법",
      content:
        "Matcher는 Hook이 특정 도구에서만 실행되도록 필터링하는 정규식 기반 패턴입니다. 예를 들어 'Edit|Write'는 Edit 또는 Write 도구가 호출될 때만 Hook을 실행합니다. 'Bash'는 Bash 도구에만 반응하며, matcher를 생략하면 해당 이벤트의 모든 도구 호출에 대해 Hook이 실행됩니다. 복잡한 필터링이 필요할 때는 Hook 스크립트 내부에서 환경 변수를 검사하여 조건부 로직을 구현할 수 있습니다.",
    },
    {
      type: "warning",
      title: "Hook 실행 시 주의사항",
      content:
        "Hook 스크립트가 실패(비정상 종료 코드 반환)하면 Claude의 해당 작업이 중단될 수 있습니다. 특히 PreToolUse Hook이 실패하면 도구 실행 자체가 차단됩니다. 따라서 Hook 스크립트는 항상 적절한 에러 핸들링을 포함해야 하며, 타임아웃이 길어지지 않도록 주의해야 합니다. Hook의 실행 시간이 길어지면 전체 워크플로우가 느려질 수 있으므로, 무거운 작업은 비동기적으로 처리하는 것을 권장합니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv02-q1",
        text: "Claude가 도구를 실행하기 직전에 발생하는 Hook 이벤트는?",
        choices: ["SessionStart", "PreToolUse", "PostToolUse", "Stop"],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "PreToolUse 이벤트는 Claude가 특정 도구를 호출하기 직전에 발생하며, 입력 검증이나 변환에 사용됩니다.",
      },
      {
        id: "adv02-q2",
        text: "Hook의 matcher에서 'Edit|Write' 패턴의 의미는?",
        choices: [
          "Edit 다음에 Write가 호출될 때만 실행",
          "Edit 또는 Write 도구 호출 시 실행",
          "Edit과 Write가 동시에 호출될 때 실행",
          "Edit과 Write를 제외한 모든 도구에서 실행",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "matcher는 정규식 기반으로, 파이프(|)는 OR 연산자입니다. 'Edit|Write'는 Edit 또는 Write 도구가 호출될 때 Hook을 실행합니다.",
      },
      {
        id: "adv02-q3",
        text: "PreToolUse Hook 스크립트가 비정상 종료 코드를 반환하면 어떻게 되는가?",
        choices: [
          "무시하고 도구가 정상 실행된다",
          "경고 메시지만 표시된다",
          "해당 도구 실행이 차단된다",
          "전체 세션이 종료된다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "PreToolUse Hook이 실패하면 해당 도구 실행 자체가 차단됩니다. 이를 활용하면 특정 조건에서 도구 실행을 의도적으로 막을 수 있습니다.",
      },
      {
        id: "adv02-q4",
        text: "matcher를 생략한 Hook은 어떻게 동작하는가?",
        choices: [
          "어떤 도구에서도 실행되지 않는다",
          "해당 이벤트의 모든 도구 호출에 대해 실행된다",
          "기본 도구(Bash, Edit)에서만 실행된다",
          "설정 오류가 발생한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "matcher를 생략하면 해당 이벤트 유형의 모든 도구 호출에 대해 Hook이 실행됩니다.",
      },
      {
        id: "adv02-q5",
        text: "Stop Hook의 주된 활용 사례가 아닌 것은?",
        choices: [
          "외부 시스템에 알림 전송",
          "Claude 응답 결과 후처리",
          "도구 실행 입력 변환",
          "작업 완료 로깅",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "도구 실행 입력 변환은 PreToolUse Hook의 역할입니다. Stop Hook은 Claude의 최종 응답 후에 실행되므로 알림, 후처리, 로깅 등에 사용됩니다.",
      },
    ],
  },
};
