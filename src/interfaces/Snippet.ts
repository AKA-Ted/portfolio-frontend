export interface SnippetTranslationContent {
  description: string;
  code: string;
}

export interface SnippetTranslations {
  es: SnippetTranslationContent;
  en: SnippetTranslationContent;
}

export interface SnippetIOData {
  input_data: string[] | { headers: string[], rows: string[][] };
  output_data: string[] | { headers: string[], rows: string[][] };
}

export interface Snippet {
  url: string;
  category: string;
  command: string;
  translation: SnippetTranslations | string;
  visualizer: 'LIST' | 'TABLE' | 'NONE';
  io: SnippetIOData | string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
