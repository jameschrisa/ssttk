export type QuestionType = 
  | 'text'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'file'
  | 'info'
  | 'username-input'
  | 'google-search'
  | 'card-selection';

export interface Option {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  details?: string;
  required: boolean;
  type: QuestionType;
  options?: Option[];
}

export interface AlternateRoute {
  condition: string;
  targetPageId: string;
}

export interface Navigation {
  back: boolean;
  next: boolean;
  exit?: boolean;
  alternateRoutes: AlternateRoute[];
}

export interface Page {
  id: string;
  title: string;
  sequence: number;
  questions: Question[];
  navigation: Navigation;
}

export interface Asset {
  id: string;
  type: 'screenshot' | 'document';
  content: string;
  tags: string[];
  timestamp: string;
  pageId: string;
  questionId: string;
}

export interface Assessment {
  id: string;
  startedAt: string;
  lastUpdated: string;
  currentPageId: string;
  answers: Record<string, any>;
  assets: Asset[];
  status: 'in-progress' | 'completed';
}
