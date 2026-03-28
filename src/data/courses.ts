export interface LessonMeta {
  id: string;
  title: string;
  estimatedMinutes: number;
}

export interface CourseMeta {
  id: "beginner" | "advanced";
  title: string;
  description: string;
  totalLessons: number;
  estimatedHours: number;
  color: string;
  icon: string;
  lessons: LessonMeta[];
}

export const beginnerCourse: CourseMeta = {
  id: "beginner",
  title: "초급 코스",
  description: "Claude Code CLI와 Desktop 앱의 기본 기능을 단계별로 학습합니다.",
  totalLessons: 10,
  estimatedHours: 7,
  color: "blue",
  icon: "🚀",
  lessons: [
    { id: "01", title: "Claude Code 소개 및 설치", estimatedMinutes: 30 },
    { id: "02", title: "기본 채팅과 파일 읽기", estimatedMinutes: 45 },
    { id: "03", title: "파일 편집과 코드 생성", estimatedMinutes: 45 },
    { id: "04", title: "슬래시 명령어 마스터하기", estimatedMinutes: 40 },
    { id: "05", title: "CLAUDE.md로 프로젝트 설정", estimatedMinutes: 35 },
    { id: "06", title: "Git 기본 작업 자동화", estimatedMinutes: 50 },
    { id: "07", title: "VS Code 확장 프로그램 활용", estimatedMinutes: 40 },
    { id: "08", title: "권한 모드와 보안 이해", estimatedMinutes: 35 },
    { id: "09", title: "웹 검색과 세션 관리", estimatedMinutes: 40 },
    { id: "10", title: "Desktop 앱 기본 기능", estimatedMinutes: 45 },
  ],
};

export const advancedCourse: CourseMeta = {
  id: "advanced",
  title: "고급 코스",
  description: "MCP 서버, Hooks, 에이전트, 엔터프라이즈까지 파워 유저 기능을 마스터합니다.",
  totalLessons: 10,
  estimatedHours: 10,
  color: "purple",
  icon: "⚡",
  lessons: [
    { id: "01", title: "MCP 서버 이해와 설정", estimatedMinutes: 50 },
    { id: "02", title: "Hooks 시스템 심화", estimatedMinutes: 55 },
    { id: "03", title: "커스텀 에이전트와 팀", estimatedMinutes: 60 },
    { id: "04", title: "Skills와 플러그인 생태계", estimatedMinutes: 50 },
    { id: "05", title: "Plan 모드와 Headless 모드", estimatedMinutes: 55 },
    { id: "06", title: "Git 워크트리와 배치 작업", estimatedMinutes: 50 },
    { id: "07", title: "브라우저 자동화와 스케줄링", estimatedMinutes: 55 },
    { id: "08", title: "엔터프라이즈와 원격 제어", estimatedMinutes: 60 },
    { id: "09", title: "Extended Thinking과 모델 설정", estimatedMinutes: 50 },
    { id: "10", title: "Desktop 고급: 컴퓨터 사용과 커넥터", estimatedMinutes: 55 },
  ],
};

export function getCourse(track: "beginner" | "advanced"): CourseMeta {
  return track === "beginner" ? beginnerCourse : advancedCourse;
}
