"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCourse } from "@/data/courses";
import { loadProgress, type LessonProgress } from "@/lib/progress";

export default function CoursePage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = use(params);
  const course = getCourse(track as "beginner" | "advanced");
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    const all = loadProgress();
    setProgress(all[track as "beginner" | "advanced"] || {});
  }, [track]);

  const completedCount = Object.values(progress).filter((l) => l.completed).length;
  const overallProgress = Math.round((completedCount / course.totalLessons) * 100);

  const isBeginner = track === "beginner";
  const gradientFrom = isBeginner ? "from-blue-500" : "from-violet-500";
  const gradientTo = isBeginner ? "to-cyan-500" : "to-purple-500";
  const lightBg = isBeginner ? "bg-blue-50" : "bg-violet-50";
  const lightText = isBeginner ? "text-blue-600" : "text-violet-600";
  const shadowColor = isBeginner ? "shadow-blue-500/20" : "shadow-violet-500/20";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Course Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg ${shadowColor}`}>
              {isBeginner ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{course.title}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{course.description}</p>
            </div>
          </div>
          <div className="flex gap-5 text-xs text-muted-foreground mt-4">
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
              {course.totalLessons} Lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              ~{course.estimatedHours}h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              {completedCount}/{course.totalLessons} Done
            </span>
          </div>
          {overallProgress > 0 && (
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className={`font-semibold ${lightText}`}>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-1.5" />
            </div>
          )}
        </div>

        {/* Lesson List */}
        <div className="space-y-2.5">
          {course.lessons.map((lesson, index) => {
            const lessonProgress = progress[lesson.id];
            const isCompleted = lessonProgress?.completed;
            const score = lessonProgress?.quizScore;

            return (
              <Link key={lesson.id} href={`/course/${track}/${lesson.id}`}>
                <Card className={cn(
                  "card-premium border-border/50 cursor-pointer",
                  isCompleted && "border-emerald-200/60 bg-emerald-50/30"
                )}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : `${lightBg} ${lightText}`
                      }`}
                    >
                      {isCompleted ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">
                        Lesson {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        ~{lesson.estimatedMinutes}min
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {score !== null && score !== undefined && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          score >= 70 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`}>
                          {score}pt
                        </span>
                      )}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/40">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between mt-10">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl border-border/60")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5"><polyline points="15 18 9 12 15 6" /></svg>
            Home
          </Link>
          <Link href="/roadmap" className={cn(buttonVariants(), `rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:opacity-90 border-0 text-white`)}>
            Roadmap
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1.5"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
