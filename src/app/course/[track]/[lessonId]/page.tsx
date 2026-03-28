"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Quiz } from "@/components/quiz";
import { getCourse } from "@/data/courses";
import { saveLessonResult, loadProgress } from "@/lib/progress";
import type { Lesson } from "@/data/types";

async function loadLesson(
  track: string,
  lessonId: string
): Promise<Lesson | null> {
  try {
    const mod = await import(`@/data/${track}/lesson${lessonId}`);
    const key = Object.keys(mod).find((k) => k.startsWith("lesson"));
    return key ? mod[key] : null;
  } catch {
    return null;
  }
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lessonId: string }>;
}) {
  const { track, lessonId } = use(params);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const course = getCourse(track as "beginner" | "advanced");
  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  const isBeginner = track === "beginner";
  const accentBg = isBeginner ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700";

  useEffect(() => {
    loadLesson(track, lessonId).then(setLesson);
    const progress = loadProgress();
    const lp = progress[track as "beginner" | "advanced"]?.[lessonId];
    if (lp?.quizScore !== null && lp?.quizScore !== undefined) {
      setQuizCompleted(true);
      setQuizScore(lp.quizScore);
    }
  }, [track, lessonId]);

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizScore(score);
    saveLessonResult(track as "beginner" | "advanced", lessonId, score);
  };

  if (!lesson) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground mt-4">Loading lesson...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href={`/course/${track}`} className="hover:text-foreground transition-colors">
            {course.title}
          </Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          <span className="text-foreground font-medium">Lesson {lessonId}</span>
        </div>

        {/* Lesson Header */}
        <div className="mb-10">
          <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full ${accentBg} mb-4`}>
            Lesson {lessonId}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">{lesson.title}</h1>

          {/* Objectives */}
          <div className="rounded-xl border border-border/50 bg-accent/30 p-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">Learning Objectives</h3>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="text-sm flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500 shrink-0 mt-0.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-7 mb-14">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              {section.type === "text" && (
                <div>
                  {section.title && (
                    <h2 className="text-lg font-bold mb-3 tracking-tight">{section.title}</h2>
                  )}
                  <div className="text-sm leading-[1.8] whitespace-pre-line text-foreground/85">
                    {section.content}
                  </div>
                </div>
              )}

              {section.type === "code" && (
                <div>
                  {section.title && (
                    <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">{section.title}</h3>
                  )}
                  <pre className="bg-[#0f1117] text-zinc-100 rounded-xl p-5 overflow-x-auto text-[13px] leading-relaxed">
                    <code>{section.content}</code>
                  </pre>
                </div>
              )}

              {section.type === "tip" && (
                <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed">{section.content}</p>
                </div>
              )}

              {section.type === "warning" && (
                <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600" strokeLinecap="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        {/* Quiz Section */}
        <Quiz
          questions={lesson.quiz.questions}
          passingScore={lesson.quiz.passingScore}
          onComplete={handleQuizComplete}
        />

        <Separator className="my-10" />

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {prevLesson ? (
            <Link href={`/course/${track}/${prevLesson.id}`} className={cn(buttonVariants({ variant: "outline" }), "rounded-xl border-border/60")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5"><polyline points="15 18 9 12 15 6" /></svg>
              {prevLesson.title}
            </Link>
          ) : (
            <Link href={`/course/${track}`} className={cn(buttonVariants({ variant: "outline" }), "rounded-xl border-border/60")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5"><polyline points="15 18 9 12 15 6" /></svg>
              Course List
            </Link>
          )}
          {nextLesson ? (
            <Link href={`/course/${track}/${nextLesson.id}`} className={cn(buttonVariants(), "rounded-xl")}>
              {nextLesson.title}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1.5"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          ) : (
            <Link href={`/course/${track}`} className={cn(buttonVariants(), "rounded-xl")}>
              Course Complete
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1.5"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
