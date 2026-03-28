import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </div>
              <span className="font-semibold text-sm">Claude Guide</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Claude Code & Desktop 기능을 체계적으로 학습하는 가이드
            </p>
          </div>

          {/* Course Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">Course</h4>
            <ul className="space-y-2">
              <li><Link href="/course/beginner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beginner</Link></li>
              <li><Link href="/course/advanced" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Advanced</Link></li>
              <li><Link href="/roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/commands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Commands</Link></li>
            </ul>
          </div>

          {/* External */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">External</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Anthropic Docs</a></li>
              <li><a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Claude.ai</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground/60">
          <span>2026 Claude Code & Desktop Learning Guide</span>
          <span>Anthropic 공식 문서 기반 제작</span>
        </div>
      </div>
    </footer>
  );
}
