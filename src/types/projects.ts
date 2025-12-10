import { Projects } from "@prisma/client";

export type ProjectWithRelations = Omit<Projects, "tech" | "categories"> & {
  tech?: Projects["tech"];
  categories?: Projects["categories"];
  technologies?: { technology: { name: string } }[];
  projectCategories?: { category: { name: string } }[];
};
