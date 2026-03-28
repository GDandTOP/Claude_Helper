import type { Lesson } from "../types";

export const lesson06: Lesson = {
  id: "advanced-06",
  title: "Git 워크트리와 배치 작업",
  objectives: [
    "Git 워크트리의 개념과 Claude Code에서의 활용법을 이해한다",
    "워크트리를 활용한 병렬 작업 패턴을 구현한다",
    "/batch 명령어로 대규모 일괄 작업을 수행한다",
    "대규모 리팩토링 전략을 수립하고 실행한다",
  ],
  sections: [
    {
      type: "text",
      title: "Git 워크트리와 병렬 작업",
      content:
        "Git 워크트리(worktree)는 하나의 Git 저장소에서 여러 브랜치를 동시에 체크아웃하여 별도의 작업 디렉토리에서 작업할 수 있게 해주는 기능입니다. Claude Code는 이 기능을 활용하여 여러 작업을 동시에 병렬로 진행할 수 있습니다. 예를 들어 메인 워크트리에서는 기능 개발을 진행하면서, 별도의 워크트리에서 Claude에게 버그 수정이나 테스트 작성을 맡길 수 있습니다. 각 워크트리는 독립된 작업 디렉토리를 가지므로 서로 간섭하지 않으며, 완료 후 브랜치 병합으로 결과를 통합합니다.",
    },
    {
      type: "code",
      title: "워크트리 기반 병렬 작업 실행",
      language: "bash",
      content: `# 새 워크트리 생성 (새 브랜치와 함께)
git worktree add ../myproject-fix-auth fix/auth-bug
git worktree add ../myproject-add-tests feature/add-tests

# 각 워크트리에서 독립적으로 Claude Code 실행
# 터미널 1: 인증 버그 수정
cd ../myproject-fix-auth
claude "인증 토큰 만료 시 자동 갱신이 안 되는 버그를 수정해줘"

# 터미널 2: 테스트 추가 (동시에 진행)
cd ../myproject-add-tests
claude "src/services/ 디렉토리의 모든 서비스에 단위 테스트를 추가해줘"

# 작업 완료 후 워크트리 정리
git worktree remove ../myproject-fix-auth
git worktree remove ../myproject-add-tests`,
    },
    {
      type: "text",
      title: "/batch 명령어로 대규모 일괄 작업 수행",
      content:
        "Claude Code의 배치 기능은 동일한 작업을 여러 파일이나 모듈에 반복적으로 적용할 때 유용합니다. Headless 모드(-p)와 셸 스크립트를 결합하면 수백 개의 파일을 일관된 패턴으로 변환할 수 있습니다. 예를 들어 모든 React 클래스 컴포넌트를 함수형 컴포넌트로 변환하거나, 프로젝트 전체의 API 호출 패턴을 새로운 래퍼 함수로 교체하는 등의 대규모 리팩토링을 자동화할 수 있습니다. 핵심은 작업을 작은 단위로 분할하고, 각 단위 작업을 병렬로 실행하는 것입니다.",
    },
    {
      type: "code",
      title: "배치 리팩토링 스크립트 예시",
      language: "bash",
      content: `#!/bin/bash
# batch-refactor.sh: 모든 서비스 파일의 에러 핸들링 패턴 업데이트

# 대상 파일 목록 수집
FILES=$(find src/services -name "*.ts" -not -name "*.test.ts")

# 각 파일에 대해 Claude Code를 병렬로 실행
for file in $FILES; do
  claude -p --max-turns 3 \\
    "파일 $file에서 try-catch 블록의 에러 핸들링을
     새로운 Result<T, E> 패턴으로 변환해줘.
     기존 동작은 유지하면서 타입 안전성을 개선해줘." &

  # 동시 실행 수 제한 (최대 4개)
  if (( $(jobs -r | wc -l) >= 4 )); then
    wait -n
  fi
done

# 모든 작업 완료 대기
wait
echo "배치 리팩토링 완료"`,
    },
    {
      type: "tip",
      title: "대규모 리팩토링 전략",
      content:
        "대규모 리팩토링을 수행할 때는 다음 전략을 권장합니다. 첫째, Plan 모드에서 전체 영향 범위를 먼저 파악합니다. 둘째, 변경을 논리적 단위로 분할합니다(예: 모듈별, 레이어별). 셋째, 각 단위를 별도의 워크트리에서 병렬로 실행합니다. 넷째, 각 단위 작업 완료 후 자동 테스트를 실행하여 회귀를 확인합니다. 다섯째, 모든 변경을 통합한 후 전체 테스트 스위트를 실행합니다. 이 접근법은 대규모 변경의 위험을 최소화하면서 작업 속도를 크게 향상시킵니다.",
    },
  ],
  quiz: {
    passingScore: 70,
    questions: [
      {
        id: "adv06-q1",
        text: "Git 워크트리의 주된 이점은?",
        choices: [
          "Git 저장소의 크기를 줄인다",
          "하나의 저장소에서 여러 브랜치를 동시에 체크아웃하여 병렬 작업이 가능하다",
          "브랜치 병합 충돌을 자동으로 해결한다",
          "Git 히스토리를 최적화한다",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "Git 워크트리는 하나의 저장소에서 여러 브랜치를 별도의 디렉토리에 동시에 체크아웃할 수 있어, 병렬 작업에 매우 유용합니다.",
      },
      {
        id: "adv06-q2",
        text: "배치 리팩토링에서 동시 실행 수를 제한하는 이유는?",
        choices: [
          "Git이 동시 쓰기를 지원하지 않아서",
          "API 호출 속도 제한과 시스템 리소스 관리를 위해",
          "Claude가 한 번에 하나의 작업만 처리할 수 있어서",
          "파일 잠금(lock)이 필요해서",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "API 속도 제한(rate limit)과 CPU/메모리 등 시스템 리소스를 효율적으로 관리하기 위해 동시 실행 수를 제한합니다.",
      },
      {
        id: "adv06-q3",
        text: "워크트리를 사용한 후 정리하는 명령어는?",
        choices: [
          "git worktree delete",
          "git worktree remove",
          "git worktree clean",
          "git worktree destroy",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "git worktree remove 명령어로 더 이상 필요하지 않은 워크트리를 정리할 수 있습니다.",
      },
      {
        id: "adv06-q4",
        text: "대규모 리팩토링 시 가장 먼저 수행해야 할 단계는?",
        choices: [
          "즉시 코드 변경을 시작한다",
          "Plan 모드에서 전체 영향 범위를 파악한다",
          "모든 테스트를 삭제하고 새로 작성한다",
          "새 브랜치를 생성한다",
        ],
        correctIndex: 1,
        isRecommended: false,
        explanation:
          "대규모 리팩토링 전 Plan 모드에서 읽기 전용으로 전체 영향 범위를 파악하는 것이 위험을 최소화하는 첫 번째 단계입니다.",
      },
      {
        id: "adv06-q5",
        text: "배치 작업에서 Headless 모드(-p)를 사용하는 주된 이유는?",
        choices: [
          "실행 속도가 더 빨라서",
          "비대화형으로 실행하여 자동화 스크립트에 통합하기 위해",
          "더 많은 도구를 사용할 수 있어서",
          "API 비용이 더 저렴해서",
        ],
        correctIndex: 1,
        isRecommended: true,
        explanation:
          "-p 플래그는 대화형 입력 없이 비대화형으로 실행되므로, 셸 스크립트나 자동화 파이프라인에 통합하기에 적합합니다.",
      },
    ],
  },
};
