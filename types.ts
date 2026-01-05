
export interface QuestionOption {
  label: string;
  value: number | string;
  emoji?: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'rating' | 'agreement' | 'experience' | 'nps' | 'open';
  options?: QuestionOption[];
  placeholder?: string;
}

export interface SurveyAnswers {
  [key: number]: string | number;
}
