import type { StaticData } from "@/types/static-data";

/**
 * Raw data type from JSON (all dates as strings)
 */
type RawStaticData = Omit<StaticData, 'projects' | 'certifications' | 'timeline'> & {
  projects: Array<Omit<StaticData['projects'][number], 'createdAt' | 'updatedAt' | 'projectInitiated' | 'projectCompleted' | 'endDate'> & {
    createdAt: string;
    updatedAt: string;
    projectInitiated: string;
    projectCompleted: string | null;
    endDate: string | null;
  }>;
  certifications: Array<Omit<StaticData['certifications'][number], 'date' | 'createdAt' | 'updatedAt'> & {
    date: string;
    createdAt: string;
    updatedAt: string;
  }>;
  timeline: Array<Omit<StaticData['timeline'][number], 'createdAt' | 'updatedAt'> & {
    createdAt?: string;
    updatedAt?: string;
  }>;
};

/**
 * Load static data from JSON file
 */
async function loadStaticData(): Promise<RawStaticData> {
  const { default: data } = await import("../../public/data/static-data.json");
  return data as RawStaticData;
}

/**
 * Helper to convert date strings to Date objects
 */
function parseDates<T>(obj: any): T {
  if (!obj) return obj;

  const dateFields = [
    "createdAt",
    "updatedAt",
    "date",
    "projectInitiated",
    "projectCompleted",
    "endDate",
  ];

  const result = { ...obj };

  dateFields.forEach((field) => {
    if (result[field] && typeof result[field] === "string") {
      result[field] = new Date(result[field]);
    }
  });

  return result as T;
}

/**
 * Get all static data
 */
export async function getStaticData(): Promise<StaticData> {
  const rawData = await loadStaticData();

  // Parse dates for all items
  return {
    projects: rawData.projects.map((p: any) => parseDates(p)),
    technologies: rawData.technologies,
    categories: rawData.categories,
    certifications: rawData.certifications.map((c: any) => parseDates(c)),
    timeline: rawData.timeline.map((t: any) => parseDates(t)),
  };
}

/**
 * Get all projects
 */
export async function getProjects() {
  const data = await getStaticData();
  return data.projects;
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.isFeatured);
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

/**
 * Get all technologies
 */
export async function getTechnologies() {
  const data = await getStaticData();
  return data.technologies;
}

/**
 * Get technology by ID
 */
export async function getTechnologyById(id: string) {
  const technologies = await getTechnologies();
  return technologies.find((tech) => tech.id === id);
}

/**
 * Get all categories
 */
export async function getCategories() {
  const data = await getStaticData();
  return data.categories;
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string) {
  const categories = await getCategories();
  return categories.find((category) => category.id === id);
}

/**
 * Get all certifications
 */
export async function getCertifications() {
  const data = await getStaticData();
  return data.certifications.filter((cert) => cert.visible);
}

/**
 * Get certification by ID
 */
export async function getCertificationById(id: string) {
  const certifications = await getCertifications();
  return certifications.find((cert) => cert.id === id);
}

/**
 * Get all timeline events
 */
export async function getTimeline() {
  const data = await getStaticData();
  return data.timeline.filter((event) => !event.visibility || event.visibility === "public");
}
