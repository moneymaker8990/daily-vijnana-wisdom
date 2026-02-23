export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizResult = {
  courseId: string;
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
};
