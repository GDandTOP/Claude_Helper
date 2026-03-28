export interface Phase {
  name: string;
  lessons: string[];
  milestone: string;
}

export interface TrackRoadmap {
  title: string;
  phases: Phase[];
}

export const roadmapData: Record<string, TrackRoadmap> = {
  beginner: {
    title: "초급 학습 로드맵",
    phases: [
      {
        name: "1단계: 기초 다지기",
        lessons: ["01", "02", "03"],
        milestone: "기본 대화 및 파일 작업 가능",
      },
      {
        name: "2단계: 도구 활용",
        lessons: ["04", "05", "06"],
        milestone: "명령어와 Git으로 생산성 향상",
      },
      {
        name: "3단계: 환경 확장",
        lessons: ["07", "08", "09", "10"],
        milestone: "전체 워크플로우 구축 완료",
      },
    ],
  },
  advanced: {
    title: "고급 학습 로드맵",
    phases: [
      {
        name: "1단계: 확장 기능",
        lessons: ["01", "02", "03"],
        milestone: "MCP, Hooks, 에이전트 활용 가능",
      },
      {
        name: "2단계: 자동화",
        lessons: ["04", "05", "06", "07"],
        milestone: "대규모 자동화 워크플로우 구축",
      },
      {
        name: "3단계: 마스터",
        lessons: ["08", "09", "10"],
        milestone: "엔터프라이즈급 활용 능력 완성",
      },
    ],
  },
};
