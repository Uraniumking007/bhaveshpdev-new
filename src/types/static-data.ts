// Static types based on former database schema
// Dates are stored as strings in JSON for compatibility

export interface Technology {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProjectTechnology {
  projectId: string;
  technologyId: string;
  technology?: Technology;
}

export interface ProjectCategory {
  projectId: string;
  categoryId: string;
  category?: Category;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string | null;
  github: string | null;
  technologies: ProjectTechnology[];
  categories: ProjectCategory[];
  createdAt: Date;
  updatedAt: Date;
  projectInitiated: Date;
  projectCompleted: Date | null;
  isCompleted: boolean;
  endDate: Date | null;
  isFeatured: boolean;
  images: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  description: string;
  imageUrl: string;
  credentialUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  pdfUrl: string | null;
  visible: boolean;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  yearStart: string;
  yearEnd: string | null;
  ongoing: boolean;
  type: string;
  visibility?: "public" | "private";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StaticData {
  projects: Project[];
  technologies: Technology[];
  categories: Category[];
  certifications: Certification[];
  timeline: Timeline[];
}
