export interface QuizQuestion {
  id: string;
  text: string;
  choices: string[];
  correctIndex: number;
  isRecommended: boolean;
  explanation: string;
}

export interface Section {
  type: "text" | "code" | "tip" | "warning";
  title?: string;
  language?: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  sections: Section[];
  quiz: {
    passingScore: number;
    questions: QuizQuestion[];
  };
}
