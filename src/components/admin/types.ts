/**
 * Types for Admin Components
 *
 * Shared TypeScript types used across admin components.
 */

export type ProjectTechnology = {
  projectId: string;
  technologyId: string;
};

export type ProjectCategory = {
  projectId: string;
  categoryId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string | null;
  github: string | null;
  technologies: ProjectTechnology[];
  categories: ProjectCategory[];
  createdAt: string;
  updatedAt: string;
  projectInitiated: string | null;
  projectCompleted: string | null;
  isCompleted: boolean;
  endDate: string | null;
  isFeatured: boolean;
  images: string[];
};

export type Technology = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  credentialUrl: string | null;
  createdAt: string;
  updatedAt: string;
  pdfUrl: string | null;
  visible: boolean;
};

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
  yearStart: string;
  yearEnd: string | null;
  ongoing: boolean;
  type: 'work' | 'education';
  visibility: string;
  createdAt: string;
  updatedAt: string;
};

export type StaticData = {
  projects: Project[];
  technologies: Technology[];
  categories: Category[];
  certifications: Certification[];
  timeline: TimelineItem[];
};

export type TabType = 'projects' | 'technologies' | 'categories' | 'certifications' | 'timeline';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
