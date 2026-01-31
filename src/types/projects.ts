import type { Project, Technology, Category } from "./static-data";

export type ProjectWithRelations = Omit<Project, "technologies" | "categories"> & {
  technologies?: {
    technologyId: string;
    technology?: Technology;
  }[];
  projectCategories?: {
    categoryId: string;
    category?: Category;
  }[];
};
