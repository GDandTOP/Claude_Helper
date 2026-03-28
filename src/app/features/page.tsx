"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { features, categories } from "@/data/features";

export default function FeaturesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return features.filter((f) => {
      const matchesSearch =
        !search ||
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase()) ||
        f.tags.some((t) => t.includes(search));
      const matchesCat = !selectedCategory || f.category === selectedCategory;
      const matchesDiff = !selectedDifficulty || f.difficulty === selectedDifficulty;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  const getCategoryStyle = (catId: string) => {
    return categories.find((c) => c.id === catId)?.color ?? "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (catId: string) => {
    return categories.find((c) => c.id === catId)?.label ?? catId;
  };

  const difficultyOptions = [
    { key: null, label: "All", active: "bg-foreground text-background" },
    { key: "beginner", label: "Beginner", active: "bg-blue-500 text-white" },
    { key: "advanced", label: "Advanced", active: "bg-violet-500 text-white" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Feature Catalog</h1>
          <p className="text-muted-foreground text-sm">
            Claude Code & Desktop의 전체 기능을 한눈에 확인하세요
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input
              placeholder="Search features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-border/60 bg-accent/30 placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Difficulty filter */}
            {difficultyOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelectedDifficulty(opt.key === selectedDifficulty ? null : opt.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedDifficulty === opt.key
                    ? opt.active
                    : "bg-accent/50 text-muted-foreground hover:bg-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}

            <span className="w-px h-6 bg-border/60 self-center mx-1" />

            {/* Category filter */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-accent/50 text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-5 font-medium">
          {filtered.length}개 기능
        </p>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((feature) => (
            <Card key={feature.id} className="card-premium border-border/50 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <h3 className="font-semibold text-sm leading-tight">
                    {feature.name}
                  </h3>
                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      feature.difficulty === "beginner"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {feature.difficulty === "beginner" ? "Beginner" : "Advanced"}
                  </span>
                </div>
                <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${getCategoryStyle(feature.category)} mb-3`}>
                  {getCategoryLabel(feature.category)}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-accent/60 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {feature.relatedLessons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <Link
                      href={`/course/${feature.relatedLessons[0].split("-")[0]}/${feature.relatedLessons[0].split("-")[1]}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Related Lesson
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-2xl bg-accent/60 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">검색 결과가 없습니다</p>
            <p className="text-xs text-muted-foreground/60 mt-1">다른 키워드로 시도해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
