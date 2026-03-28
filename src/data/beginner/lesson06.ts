import type { Lesson } from "../types";

export const lesson06: Lesson = {
  id: "beginner-06",
  title: "Git 기본 작업 자동화",
  objectives: [
    "Claude Code를 활용하여 Git 커밋과 푸시를 자동화한다",
    "gh CLI를 사용한 PR 생성 워크플로우를 이해한다",
    "안전한 Git 작업 방법과 주의사항을 익힌다",
  ],
  sections: [
    {
      type: "text",
      title: "Claude Code와 Git 연동",
      content:
        "Claude Code는 Git 작업을 자연어로 수행할 수 있습니다. 커밋 메시지 작성, 브랜치 관리, PR 생성 등 일상적인 Git 작업을 대화형으로 처리합니다. Claude는 변경된 파일을 분석하여 적절한 커밋 메시지를 자동으로 제안하고, 변경 사항의 맥락을 이해하여 의미 있는 메시지를 작성합니다. 단, Claude는 안전을 위해 파괴적인 Git 명령(force push, reset --hard 등)을 실행하기 전에 반드시 사용자 확인을 요청합니다.",
    },
    {
      type: "code",
      title: "Git 작업 요청 예시",
      language: "plaintext",
      content: `# 커밋 관련
> 변경사항을 확인하고 적절한 메시지로 커밋해줘
> 이 변경 내용을 conventional commit 형식으로 커밋해줘
> feat: 로그인 기능 추가로 커밋해줘

# 브랜치 관련
> feature/user-auth 브랜치를 만들고 전환해줘
> 현재 브랜치의 상태를 확인해줘
> main 브랜치의 최신 변경사항을 현재 브랜치에 머지해줘

# PR 관련 (gh CLI 필요)
> 이 브랜치의 변경사항으로 PR을 만들어줘
> PR 제목은 "사용자 인증 기능 구현"으로 해줘
> 이 PR의 리뷰 코멘트를 확인해줘`,
    },
    {
      type: "text",
      title: "PR 생성 워크플로우",
      content:
        "Claude Code는 GitHub CLI(gh)를 활용하여 PR을 생성할 수 있습니다. Claude에게 PR 생성을 요청하면, 먼저 현재 브랜치의 변경사항을 분석하고, 적절한 PR 제목과 설명을 작성한 뒤, gh pr create 명령어로 PR을 생성합니다. PR 설명에는 변경 사항 요약, 테스트 계획 등이 자동으로 포함됩니다. gh CLI가 미리 설치되어 있고 인증이 완료되어 있어야 합니다.",
    },
    {
      type: "warning",
      title: "안전한 Git 사용 주의사항",
      content:
        "Claude Code는 git push --force, git reset --hard, git clean -f 같은 파괴적인 명령어를 사용할 때 매우 신중합니다. 이러한 명령어는 데이터를 되돌릴 수 없게 삭제할 수 있으므로, Claude는 실행 전 반드시 사용자에게 확인을 요청합니다. 또한 main/master 브랜치에 force push하는 것은 절대 권장하지 않으며, 항상 새 커밋을 만드는 것을 기본으로 합니다. 민감한 파일(.env, 인증 정보 등)이 커밋에 포함되지 않도록 주의합니다.",
    },
    {
      type: "tip",
      title: "효율적인 Git 워크플로우 팁",
      content:
        "Claude에게 '변경사항을 확인하고 커밋해줘'라고 요청하면, Claude는 git status와 git diff를 확인한 후 변경 내용에 맞는 커밋 메시지를 제안합니다. Conventional Commits 형식을 원한다면 CLAUDE.md에 해당 규칙을 명시해두면 매번 설명할 필요가 없습니다. PR을 자주 만든다면 PR 템플릿 규칙도 CLAUDE.md에 추가해보세요.",
    },
  ],
  quiz: {
    passingScore: 60,
    questions: [
      {
        id: "b06-q1",
        text: "Claude Code에서 PR을 생성할 때 필요한 CLI 도구는?",
        choices: [
          "git-pr",
          "gh (GitHub CLI)",
          "hub",
          "github-cli",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Claude Code는 GitHub CLI(gh)를 사용하여 PR을 생성합니다. gh가 설치되어 있고 GitHub 인증이 완료되어 있어야 합니다.",
      },
      {
        id: "b06-q2",
        text: "Claude Code가 Git 작업에서 특히 주의하는 명령어 유형은?",
        choices: [
          "git status, git log 같은 조회 명령어",
          "git add, git commit 같은 기본 명령어",
          "git push --force, git reset --hard 같은 파괴적 명령어",
          "git branch, git checkout 같은 브랜치 명령어",
        ],
        correctIndex: 2,
        isRecommended: true,
        explanation:
          "파괴적인 명령어(force push, reset --hard 등)는 데이터를 되돌릴 수 없게 삭제할 수 있으므로, Claude는 실행 전 반드시 사용자 확인을 요청합니다.",
      },
      {
        id: "b06-q3",
        text: "커밋 메시지를 일관되게 관리하려면 어떤 방법이 좋은가요?",
        choices: [
          "매번 Claude에게 형식을 설명한다",
          "CLAUDE.md에 커밋 메시지 컨벤션을 명시한다",
          "커밋 메시지를 작성하지 않는다",
          "항상 'update'라고만 쓴다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "CLAUDE.md에 Conventional Commits 등 커밋 메시지 규칙을 명시해두면 Claude가 매 세션마다 해당 규칙에 맞는 커밋 메시지를 자동으로 작성합니다.",
      },
      {
        id: "b06-q4",
        text: "Claude Code가 커밋 시 포함을 피하는 파일은?",
        choices: [
          "소스 코드 파일 (.ts, .js)",
          "설정 파일 (tsconfig.json)",
          "민감 정보 파일 (.env, credentials)",
          "테스트 파일 (.test.ts)",
        ],
        correctIndex: 2,
        isRecommended: false,
        explanation:
          ".env 파일이나 인증 정보가 담긴 파일은 Git에 커밋하면 보안 위험이 있으므로, Claude는 이러한 파일이 포함되지 않도록 주의합니다.",
      },
      {
        id: "b06-q5",
        text: "Claude Code가 기존 커밋을 수정(amend)하는 대신 기본적으로 하는 행동은?",
        choices: [
          "커밋을 삭제한다",
          "새 커밋을 생성한다",
          "이전 커밋을 rebase한다",
          "커밋 없이 push한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Claude Code는 안전을 위해 기존 커밋을 수정하기보다 새 커밋을 생성하는 것을 기본으로 합니다. amend는 이전 커밋의 내용을 변경할 수 있어 위험할 수 있습니다.",
      },
    ],
  },
};
