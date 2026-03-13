export interface Profile {
  name: string;
  about: string;
  title: string;
  handle: string;
  location: string;
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
}

export interface Language {
  level: string;
  language: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  period: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface CvInfo {
  profile: Profile;
  education: Education[];
  languages: Language[];
  experience: ExperienceItem[];
}

export interface CvData {
  id: number;
  cvInfo: CvInfo;
  cvLang: string;
}
