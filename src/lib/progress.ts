"use client";

export interface LessonProgress {
  completed: boolean;
  quizScore: number | null;
  quizAttempts: number;
}

export interface CourseProgress {
  [lessonId: string]: LessonProgress;
}

export interface AllProgress {
  beginner: CourseProgress;
  advanced: CourseProgress;
}

const STORAGE_KEY = "claude-learning-progress";

function getDefaultProgress(): AllProgress {
  return { beginner: {}, advanced: {} };
}

export function loadProgress(): AllProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw);
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: AllProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function saveLessonResult(
  track: "beginner" | "advanced",
  lessonId: string,
  score: number
) {
  const progress = loadProgress();
  const existing = progress[track][lessonId];
  progress[track][lessonId] = {
    completed: score >= 70,
    quizScore: score,
    quizAttempts: (existing?.quizAttempts ?? 0) + 1,
  };
  saveProgress(progress);
  return progress;
}

export function getCourseCompletion(
  track: "beginner" | "advanced",
  totalLessons: number
): number {
  const progress = loadProgress();
  const completed = Object.values(progress[track]).filter(
    (l) => l.completed
  ).length;
  return Math.round((completed / totalLessons) * 100);
}
