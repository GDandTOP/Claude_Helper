"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/data/types";

interface QuizProps {
  questions: QuizQuestion[];
  passingScore: number;
  onComplete: (score: number) => void;
}

export function Quiz({ questions, passingScore, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, choiceIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
    const correct = questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    onComplete(score);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanations({});
  };

  const correctCount = submitted
    ? questions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;
  const score = submitted
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Quiz</h2>
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-accent/60 text-muted-foreground">
          Pass: {passingScore}pt
        </span>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 text-center ${
          score >= passingScore
            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60"
            : "bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/60"
        }`}>
          <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
            score >= passingScore
              ? "bg-emerald-100"
              : "bg-red-100"
          }`}>
            {score >= passingScore ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600" strokeLinecap="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
          </div>
          <div className="text-lg font-bold mb-1">
            {score >= passingScore ? "Passed!" : "Not quite..."}
          </div>
          <div className="text-sm font-semibold text-muted-foreground">
            {correctCount}/{questions.length} correct ({score}pt)
          </div>
          {score < passingScore && (
            <Button onClick={handleRetry} className="mt-4 rounded-xl" size="sm" variant="outline">
              Try Again
            </Button>
          )}
        </div>
      )}

      {questions.map((q, qIndex) => {
        const selected = answers[q.id];
        const isCorrect = submitted && selected === q.correctIndex;
        const isWrong = submitted && selected !== undefined && selected !== q.correctIndex;

        return (
          <div key={q.id} className="rounded-xl border border-border/50 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-accent/60 flex items-center justify-center text-xs font-bold shrink-0 text-muted-foreground">
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <span className="font-medium text-sm leading-relaxed">{q.text}</span>
                  {q.isRecommended && (
                    <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      Pick
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 ml-10">
                {q.choices.map((choice, cIndex) => {
                  const isSelected = selected === cIndex;
                  const isCorrectChoice = q.correctIndex === cIndex;

                  let stateClass = "border-border/50 hover:border-primary/30 hover:bg-accent/30";
                  if (submitted) {
                    if (isCorrectChoice) stateClass = "border-emerald-300 bg-emerald-50/60";
                    else if (isSelected && !isCorrectChoice) stateClass = "border-red-300 bg-red-50/60";
                    else stateClass = "border-border/30 opacity-60";
                  } else if (isSelected) {
                    stateClass = "border-primary/50 bg-primary/[0.04] ring-1 ring-primary/20";
                  }

                  return (
                    <button
                      key={cIndex}
                      onClick={() => handleSelect(q.id, cIndex)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-xl border text-sm transition-all duration-200 ${stateClass} ${
                        !submitted ? "cursor-pointer" : ""
                      }`}
                    >
                      <span className="font-semibold mr-2 text-muted-foreground">
                        {String.fromCharCode(65 + cIndex)}.
                      </span>
                      {choice}
                      {submitted && isCorrectChoice && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline ml-2 text-emerald-500" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {submitted && isSelected && !isCorrectChoice && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline ml-2 text-red-500" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="ml-10 mt-3">
                  <button
                    onClick={() =>
                      setShowExplanations((prev) => ({
                        ...prev,
                        [q.id]: !prev[q.id],
                      }))
                    }
                    className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    {showExplanations[q.id] ? "Hide explanation" : "Show explanation"}
                  </button>
                  {showExplanations[q.id] && (
                    <div className="mt-2 p-3 rounded-lg bg-accent/40 text-sm leading-relaxed">
                      {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {!submitted && (
        <div className="text-center pt-2">
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            size="lg"
            className="rounded-xl px-10 h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 border-0 text-white shadow-md shadow-indigo-500/15"
          >
            Submit ({Object.keys(answers).length}/{questions.length})
          </Button>
          {Object.keys(answers).length < questions.length && (
            <p className="text-[11px] text-muted-foreground mt-2.5">
              Answer all questions to submit
            </p>
          )}
        </div>
      )}
    </div>
  );
}
