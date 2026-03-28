"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { commandCategories } from "@/data/commands";

/* SVG Icons for categories */
const categoryIcons: Record<string, React.ReactNode> = {
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  zap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  keyboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <line x1="6" y1="8" x2="6.01" y2="8" />
      <line x1="10" y1="8" x2="10.01" y2="8" />
      <line x1="14" y1="8" x2="14.01" y2="8" />
      <line x1="18" y1="8" x2="18.01" y2="8" />
      <line x1="8" y1="12" x2="8.01" y2="12" />
      <line x1="12" y1="12" x2="12.01" y2="12" />
      <line x1="16" y1="12" x2="16.01" y2="12" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  ),
  terminal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  bulb: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
};

const iconColors: Record<string, string> = {
  star: "bg-amber-50 text-amber-600",
  layers: "bg-blue-50 text-blue-600",
  code: "bg-emerald-50 text-emerald-600",
  search: "bg-cyan-50 text-cyan-600",
  settings: "bg-slate-100 text-slate-600",
  zap: "bg-violet-50 text-violet-600",
  keyboard: "bg-rose-50 text-rose-600",
  terminal: "bg-indigo-50 text-indigo-600",
  bulb: "bg-orange-50 text-orange-600",
};

export default function CommandsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search && !activeCategory) return commandCategories;

    return commandCategories
      .filter((cat) => !activeCategory || cat.id === activeCategory)
      .map((cat) => {
        if (!search) return cat;
        const filtered = cat.commands.filter(
          (cmd) =>
            cmd.command.toLowerCase().includes(search.toLowerCase()) ||
            cmd.description.toLowerCase().includes(search.toLowerCase()) ||
            cmd.tip?.toLowerCase().includes(search.toLowerCase())
        );
        return { ...cat, commands: filtered };
      })
      .filter((cat) => cat.commands.length > 0);
  }, [search, activeCategory]);

  const totalCommands = commandCategories.reduce((acc, cat) => acc + cat.commands.length, 0);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-[11px] font-semibold text-amber-700">Curated Collection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Command Reference
          </h1>
          <p className="text-muted-foreground text-sm">
            Claude Code의 핵심 명령어, 단축키, CLI 옵션을 한곳에 정리했습니다
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
              {totalCommands} Commands
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
              {commandCategories.length} Categories
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-border/60 bg-accent/30 placeholder:text-muted-foreground/40"
            />
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === null
                ? "bg-foreground text-background"
                : "bg-accent/50 text-muted-foreground hover:bg-accent"
            }`}
          >
            All
          </button>
          {commandCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "bg-accent/50 text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Command Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-border/50 overflow-hidden">
              {/* Category Header */}
              <div className="px-6 py-4 bg-accent/20 border-b border-border/40 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${iconColors[category.icon] || "bg-gray-50 text-gray-600"} flex items-center justify-center`}>
                  {categoryIcons[category.icon]}
                </div>
                <div>
                  <h2 className="font-semibold text-sm">{category.title}</h2>
                  <p className="text-[11px] text-muted-foreground">{category.subtitle}</p>
                </div>
                <span className="ml-auto text-[11px] font-medium text-muted-foreground/60 bg-accent/60 px-2.5 py-0.5 rounded-full">
                  {category.commands.length}
                </span>
              </div>

              {/* Commands List */}
              <div className="divide-y divide-border/30">
                {category.commands.map((cmd, idx) => (
                  <div key={idx} className="px-6 py-4 hover:bg-accent/10 transition-colors">
                    <div className="flex items-start gap-4">
                      <code className="text-[13px] font-mono font-semibold text-primary bg-primary/[0.06] px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap">
                        {cmd.command}
                      </code>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground/85">{cmd.description}</p>
                        {cmd.example && (
                          <code className="block mt-1.5 text-[12px] font-mono text-muted-foreground bg-accent/40 px-2.5 py-1 rounded-md">
                            {cmd.example}
                          </code>
                        )}
                        {cmd.tip && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-500 shrink-0 mt-0.5">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
                            </svg>
                            <span className="text-[12px] text-amber-700/80 leading-relaxed">{cmd.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-2xl bg-accent/60 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">No commands found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try a different keyword</p>
          </div>
        )}

        {/* Bottom Quick Reference */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/20 border border-border/40 p-6 md:p-8">
          <h3 className="font-semibold text-sm mb-4">Quick Start Cheatsheet</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { keys: "/compact", desc: "토큰 절약 필수 명령어" },
              { keys: "/commit", desc: "자동 커밋 메시지 생성" },
              { keys: "/model haiku", desc: "비용 절감 모드 전환" },
              { keys: "/plan", desc: "안전한 분석 전용 모드" },
              { keys: "!npm test", desc: "셸 명령어 직접 실행" },
              { keys: "@file.ts", desc: "파일 컨텍스트 추가" },
            ].map((item) => (
              <div key={item.keys} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-background/60">
                <code className="text-[12px] font-mono font-semibold text-primary bg-primary/[0.06] px-2 py-0.5 rounded-md">
                  {item.keys}
                </code>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
