import type { Lesson } from "../types";

export const lesson08: Lesson = {
  id: "beginner-08",
  title: "권한 모드와 보안 이해",
  objectives: [
    "Claude Code의 권한 시스템과 도구 승인 방식을 이해한다",
    "기본 모드, 자동 승인, DontAsk 모드의 차이를 구분한다",
    "안전한 Claude Code 사용을 위한 보안 모범 사례를 익힌다",
  ],
  sections: [
    {
      type: "text",
      title: "권한 시스템의 기본 개념",
      content:
        "Claude Code는 파일 시스템에 직접 접근하여 파일을 읽고, 편집하고, 명령어를 실행할 수 있는 강력한 도구입니다. 이러한 강력한 기능에는 적절한 안전장치가 필요합니다. 기본적으로 Claude Code는 파일 읽기와 같은 안전한 작업은 자동으로 수행하지만, 파일 편집이나 명령어 실행처럼 시스템에 변경을 가하는 작업은 사용자의 승인을 요청합니다. 이를 통해 의도하지 않은 변경을 방지할 수 있습니다.",
    },
    {
      type: "text",
      title: "권한 모드의 종류",
      content:
        "Claude Code에는 세 가지 주요 권한 모드가 있습니다. 기본 모드(Default)에서는 파일 편집, 쉘 명령어 실행 등 변경 작업 시 매번 사용자 승인을 요청합니다. 가장 안전한 모드입니다. 자동 승인(Auto-approve) 모드에서는 특정 유형의 작업을 자동으로 승인합니다. 예를 들어 파일 편집은 자동 승인하되 쉘 명령어는 여전히 확인을 요청하도록 설정할 수 있습니다. DontAsk 모드는 모든 작업을 사용자 확인 없이 자동으로 실행합니다. 편리하지만 가장 주의가 필요한 모드입니다.",
    },
    {
      type: "code",
      title: "권한 설정 예시",
      language: "bash",
      content: `# 기본 모드로 실행 (매번 승인 요청)
claude

# 자동 승인 모드로 실행
claude --auto-approve edit  # 파일 편집 자동 승인
claude --auto-approve bash  # bash 명령어 자동 승인

# DontAsk 모드로 실행 (모든 작업 자동 실행)
claude --dangerously-skip-permissions

# 특정 도구에 대한 권한 설정도 가능
# 설정 파일에서 세밀하게 제어 가능`,
    },
    {
      type: "warning",
      title: "보안 주의사항",
      content:
        "DontAsk 모드(--dangerously-skip-permissions)는 이름에서 알 수 있듯이 위험할 수 있습니다. 모든 파일 편집과 명령어가 확인 없이 실행되므로, 신뢰할 수 있는 프로젝트에서만 사용하세요. 특히 공개 저장소에서 작업할 때는 기본 모드를 유지하는 것이 좋습니다. 또한 Claude가 실행하려는 명령어를 항상 확인하고, 이해할 수 없는 명령어는 거부하세요. rm -rf, chmod 777 같은 위험한 명령어에 특히 주의해야 합니다.",
    },
    {
      type: "tip",
      title: "권장 보안 설정",
      content:
        "초보자에게는 기본 모드를 유지하면서 Claude가 수행하는 각 작업을 직접 확인하는 것을 권장합니다. 작업에 익숙해진 후 파일 편집만 자동 승인하는 중간 단계를 거쳐, 충분한 경험이 쌓인 후에 DontAsk 모드를 고려하세요. 어떤 모드를 사용하든 중요한 작업 전에는 Git 커밋으로 백업 포인트를 만들어두는 습관이 좋습니다.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b08-q1",
        text: "Claude Code의 기본(Default) 권한 모드에서 파일 편집 시 어떤 일이 발생하나요?",
        choices: [
          "자동으로 편집이 실행된다",
          "사용자에게 승인을 요청한다",
          "편집이 차단된다",
          "읽기 전용으로 표시된다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "기본 모드에서는 파일 편집이나 명령어 실행 등 시스템 변경 작업 시 매번 사용자의 승인을 요청합니다. 가장 안전한 모드입니다.",
      },
      {
        id: "b08-q2",
        text: "모든 작업을 사용자 확인 없이 자동 실행하는 모드의 플래그는?",
        choices: [
          "--auto-approve all",
          "--no-confirm",
          "--dangerously-skip-permissions",
          "--yes-to-all",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "--dangerously-skip-permissions 플래그는 모든 작업을 자동으로 실행합니다. 이름에 'dangerously'가 포함된 것처럼 신중하게 사용해야 합니다.",
      },
      {
        id: "b08-q3",
        text: "초보자에게 가장 권장되는 권한 모드는?",
        choices: [
          "DontAsk 모드",
          "전체 자동 승인 모드",
          "기본(Default) 모드",
          "bash 자동 승인 모드",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          "초보자에게는 기본 모드를 사용하여 Claude가 수행하는 각 작업을 직접 확인하면서 학습하는 것이 안전하고 교육적입니다.",
      },
      {
        id: "b08-q4",
        text: "중요한 작업 전에 해두면 좋은 안전 조치는?",
        choices: [
          "컴퓨터를 재부팅한다",
          "DontAsk 모드로 전환한다",
          "Git 커밋으로 백업 포인트를 만든다",
          "모든 파일을 복사한다",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "Git 커밋으로 백업 포인트를 만들면, 작업이 잘못되었을 때 이전 상태로 되돌릴 수 있습니다. 가장 효과적인 안전 조치입니다.",
      },
      {
        id: "b08-q5",
        text: "자동 승인 모드에서 파일 편집만 자동 승인하는 명령어는?",
        choices: [
          "claude --auto-approve edit",
          "claude --auto edit",
          "claude --approve-edit",
          "claude --skip edit",
        ],
        correctIndex: 0,
        isRecommended: false,
        explanation:
          "'claude --auto-approve edit'는 파일 편집 작업만 자동으로 승인하고, 다른 작업(쉘 명령어 등)은 여전히 사용자 확인을 요청합니다.",
      },
    ],
  },
};
