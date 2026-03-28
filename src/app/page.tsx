"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { beginnerCourse, advancedCourse } from "@/data/courses";
import { getCourseCompletion } from "@/lib/progress";
import { cn } from "@/lib/utils";

/* SVG Icon Components - replacing basic emojis */
function IconTerminal({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function IconLayers({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconZap({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconCommand({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function IconPlug({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
    </svg>
  );
}

function IconCpu({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function IconSettings({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconBuilding({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="6" x2="9.01" y2="6" />
      <line x1="15" y1="6" x2="15.01" y2="6" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <line x1="9" y1="14" x2="9.01" y2="14" />
      <line x1="15" y1="14" x2="15.01" y2="14" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}

function IconBook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function Home() {
  const [beginnerProgress, setBeginnerProgress] = useState(0);
  const [advancedProgress, setAdvancedProgress] = useState(0);

  useEffect(() => {
    setBeginnerProgress(getCourseCompletion("beginner", 10));
    setAdvancedProgress(getCourseCompletion("advanced", 10));
  }, []);

  const features = [
    {
      icon: <IconTerminal className="w-5 h-5" />,
      title: "Natural Language Coding",
      desc: "대화로 코드를 작성하고 편집",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: <IconCommand className="w-5 h-5" />,
      title: "90+ Slash Commands",
      desc: "강력한 내장 명령어 마스터",
      gradient: "from-violet-500/10 to-purple-500/10",
      iconBg: "bg-violet-500/10 text-violet-600",
    },
    {
      icon: <IconPlug className="w-5 h-5" />,
      title: "MCP Integration",
      desc: "외부 도구와 서비스 연결",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconBg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: <IconCpu className="w-5 h-5" />,
      title: "Agent System",
      desc: "커스텀 AI 에이전트 생성/조율",
      gradient: "from-orange-500/10 to-amber-500/10",
      iconBg: "bg-orange-500/10 text-orange-600",
    },
    {
      icon: <IconSettings className="w-5 h-5" />,
      title: "Hooks Automation",
      desc: "이벤트 기반 워크플로우 구축",
      gradient: "from-pink-500/10 to-rose-500/10",
      iconBg: "bg-pink-500/10 text-pink-600",
    },
    {
      icon: <IconBuilding className="w-5 h-5" />,
      title: "Enterprise Ready",
      desc: "기업 환경 설정 및 관리",
      gradient: "from-slate-500/10 to-gray-500/10",
      iconBg: "bg-slate-500/10 text-slate-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background orbs */}
        <div className="orb w-[500px] h-[500px] bg-indigo-300/30 -top-48 -left-24" />
        <div className="orb w-[400px] h-[400px] bg-purple-300/20 -top-20 right-0" />
        <div className="orb w-[300px] h-[300px] bg-pink-300/15 bottom-0 left-1/3" />

        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.06] border border-primary/10 mb-6">
            <span className="dot-indicator bg-emerald-500" />
            <span className="text-xs font-medium text-primary/80">2026 Latest Version</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-5">
            Claude Code & Desktop
            <br />
            <span className="text-gradient-mixed">Complete Guide</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            초급부터 고급까지, 체계적인 코스와 퀴즈로
            <br className="hidden sm:block" />
            Claude Code CLI와 Desktop 앱을 마스터하세요.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/course/beginner"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 border-0 text-white shadow-lg shadow-indigo-500/20 px-8 h-12 rounded-xl text-[14px]"
              )}
            >
              Start Learning
            </Link>
            <Link
              href="/features"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "px-8 h-12 rounded-xl text-[14px] border-border/60 hover:bg-accent/60"
              )}
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Choose Your Track</h2>
          <p className="text-muted-foreground text-sm">
            자신의 수준에 맞는 코스를 선택하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Beginner Card */}
          <div className="card-premium group relative rounded-2xl bg-card border border-border/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <IconLayers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{beginnerCourse.title}</h3>
                  <p className="text-sm text-muted-foreground">{beginnerCourse.description}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                <span className="inline-flex items-center gap-1.5">
                  <IconBook className="w-3.5 h-3.5" />
                  {beginnerCourse.totalLessons} Lessons
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="w-3.5 h-3.5" />
                  ~{beginnerCourse.estimatedHours}h
                </span>
              </div>

              {beginnerProgress > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-blue-600">{beginnerProgress}%</span>
                  </div>
                  <Progress value={beginnerProgress} className="h-1.5" />
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mb-5">
                {["CLI Basics", "File Ops", "Git", "Desktop"].map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/course/beginner"
                className={cn(
                  buttonVariants(),
                  "w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 border-0 text-white shadow-md shadow-blue-500/15 rounded-xl h-11"
                )}
              >
                {beginnerProgress > 0 ? "Continue Learning" : "Start Course"}
              </Link>
            </div>
          </div>

          {/* Advanced Card */}
          <div className="card-premium group relative rounded-2xl bg-card border border-border/60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-400 to-violet-500" />
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <IconZap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{advancedCourse.title}</h3>
                  <p className="text-sm text-muted-foreground">{advancedCourse.description}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs text-muted-foreground mb-5">
                <span className="inline-flex items-center gap-1.5">
                  <IconBook className="w-3.5 h-3.5" />
                  {advancedCourse.totalLessons} Lessons
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="w-3.5 h-3.5" />
                  ~{advancedCourse.estimatedHours}h
                </span>
              </div>

              {advancedProgress > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-violet-600">{advancedProgress}%</span>
                  </div>
                  <Progress value={advancedProgress} className="h-1.5" />
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mb-5">
                {["MCP", "Hooks", "Agents", "Enterprise"].map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="/course/advanced"
                className={cn(
                  buttonVariants(),
                  "w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90 border-0 text-white shadow-md shadow-violet-500/15 rounded-xl h-11"
                )}
              >
                {advancedProgress > 0 ? "Continue Learning" : "Start Course"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "20", label: "Lessons", color: "text-gradient-blue" },
                { value: "100+", label: "Quiz Items", color: "text-gradient-purple" },
                { value: "30+", label: "Features", color: "text-gradient-blue" },
                { value: "17h", label: "Total Hours", color: "text-gradient-purple" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">What You Will Learn</h2>
          <p className="text-muted-foreground text-sm">핵심 기능들을 체계적으로 학습합니다</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((item) => (
            <Card key={item.title} className={`card-premium border-border/50 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-10 md:p-16 text-center text-white">
          <div className="orb w-[300px] h-[300px] bg-white/10 -top-24 -right-16" />
          <div className="orb w-[200px] h-[200px] bg-white/10 bottom-0 left-0" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Master Claude?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
              지금 바로 학습을 시작하고, Claude Code의 모든 잠재력을 활용하세요.
            </p>
            <Link
              href="/course/beginner"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
