"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roadmapData } from "@/data/roadmap";
import { getCourse } from "@/data/courses";
import { loadProgress, type LessonProgress } from "@/lib/progress";

export default function RoadmapPage() {
  const [beginnerProgress, setBeginnerProgress] = useState<Record<string, LessonProgress>>({});
  const [advancedProgress, setAdvancedProgress] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    const all = loadProgress();
    setBeginnerProgress(all.beginner || {});
    setAdvancedProgress(all.advanced || {});
  }, []);

  const renderRoadmap = (
    track: "beginner" | "advanced",
    progress: Record<string, LessonProgress>
  ) => {
    const data = roadmapData[track];
    const course = getCourse(track);
    const isBeginner = track === "beginner";
    const accentBg = isBeginner ? "bg-blue-500" : "bg-violet-500";
    const lightBg = isBeginner ? "bg-blue-50" : "bg-violet-50";
    const lightText = isBeginner ? "text-blue-600" : "text-violet-600";

    return (
      <div className="relative">
        <h2 className="text-xl font-bold mb-8 text-center tracking-tight">{data.title}</h2>

        <div className="space-y-10">
          {data.phases.map((phase, phaseIndex) => {
            const phaseLessons = phase.lessons.map((lid) => ({
              id: lid,
              meta: course.lessons.find((l) => l.id === lid),
              progress: progress[lid],
            }));
            const phaseComplete = phaseLessons.every((l) => l.progress?.completed);
            const phasePartial = phaseLessons.some((l) => l.progress?.completed);

            return (
              <div key={phaseIndex} className="relative">
                {/* Phase Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                      phaseComplete ? "bg-emerald-500" : phasePartial ? accentBg : "bg-muted-foreground/20"
                    }`}
                  >
                    {phaseComplete ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      phaseIndex + 1
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{phase.name}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      Goal: {phase.milestone}
                    </p>
                  </div>
                </div>

                {/* Lessons in phase */}
                <div className="ml-4 pl-7 border-l-2 border-border/50 space-y-2.5">
                  {phaseLessons.map((lesson) => {
                    const isComplete = lesson.progress?.completed;
                    return (
                      <Link
                        key={lesson.id}
                        href={`/course/${track}/${lesson.id}`}
                      >
                        <Card
                          className={cn(
                            "card-premium border-border/50 cursor-pointer",
                            isComplete && "border-emerald-200/60 bg-emerald-50/30"
                          )}
                        >
                          <CardContent className="p-3 flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${
                                isComplete
                                  ? "bg-emerald-500 text-white"
                                  : `${lightBg} ${lightText}`
                              }`}
                            >
                              {isComplete ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                              ) : (
                                lesson.id
                              )}
                            </div>
                            <span className="text-sm font-medium flex-1">
                              {lesson.meta?.title ?? `Lesson ${lesson.id}`}
                            </span>
                            {lesson.progress?.quizScore !== null &&
                              lesson.progress?.quizScore !== undefined && (
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  lesson.progress.quizScore >= 70
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-red-50 text-red-600"
                                }`}>
                                  {lesson.progress.quizScore}pt
                                </span>
                              )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                {/* Milestone badge */}
                {phaseComplete && (
                  <div className="ml-4 pl-7 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 0 1 0 5H18" /><path d="M18 15h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M6 15H4.5a2.5 2.5 0 0 0 0 5H6" /><line x1="6" y1="9" x2="6" y2="15" /><line x1="18" y1="9" x2="18" y2="15" /><rect x="6" y="9" width="12" height="6" rx="1" /></svg>
                      {phase.milestone}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Learning Roadmap</h1>
          <p className="text-muted-foreground text-sm">
            단계별로 진행하며 Claude Code & Desktop을 마스터하세요
          </p>
        </div>

        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-11 rounded-xl bg-accent/60 p-1">
            <TabsTrigger value="beginner" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Beginner
            </TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="beginner">
            {renderRoadmap("beginner", beginnerProgress)}
          </TabsContent>
          <TabsContent value="advanced">
            {renderRoadmap("advanced", advancedProgress)}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "rounded-xl border-border/60")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5"><polyline points="15 18 9 12 15 6" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
