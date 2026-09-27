export interface PostTranslation {
  title: string;
  content: string;
  summary: string;
}

export interface PostTranslations {
  en: PostTranslation;
  es: PostTranslation;
}

export interface Post {
  url: string;
  translation: PostTranslations;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}