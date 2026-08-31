export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  avatarUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  icon: 'car' | 'calendar' | 'school' | 'shopping' | 'code' | 'default';
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  hidden?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  imageBase64?: string;
}

export interface SkillsData {
  technical: string[];
  soft: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface RecommendationItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  text: string;
  rating: number;
  hidden?: boolean;
}

export interface PortfolioContent {
  siteConfig: SiteConfig;
  heroStats: HeroStat[];
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  coreStack: string[];
  languages: LanguageItem[];
  recommendations: RecommendationItem[];
  updatedAt?: string;
}

export type ConnectionStatus = 'synced' | 'connecting' | 'offline' | 'error';
