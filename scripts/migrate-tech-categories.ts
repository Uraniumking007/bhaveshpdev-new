import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function migrateTechAndCategories() {
  console.log("Starting migration of tech and categories...");

  try {
    // Get all projects with their tech and categories arrays
    const projects = await prisma.projects.findMany({
      select: {
        id: true,
        tech: true,
        categories: true,
      },
    });

    console.log(`Found ${projects.length} projects to migrate`);

    // Collect all unique technologies and categories
    const allTech = new Set<string>();
    const allCategories = new Set<string>();

    projects.forEach((project) => {
      project.tech?.forEach((t) => {
        if (t && t.trim()) {
          allTech.add(t.trim().toLowerCase());
        }
      });
      project.categories?.forEach((c) => {
        if (c && c.trim()) {
          allCategories.add(c.trim().toLowerCase());
        }
      });
    });

    console.log(`Found ${allTech.size} unique technologies`);
    console.log(`Found ${allCategories.size} unique categories`);

    // Create all technologies
    const techMap = new Map<string, string>();
    for (const techName of allTech) {
      try {
        const tech = await prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName },
        });
        techMap.set(techName, tech.id);
      } catch (error) {
        console.error(`Error creating technology ${techName}:`, error);
      }
    }

    // Create all categories
    const categoryMap = new Map<string, string>();
    for (const categoryName of allCategories) {
      try {
        const category = await prisma.category.upsert({
          where: { name: categoryName },
          update: {},
          create: { name: categoryName },
        });
        categoryMap.set(categoryName, category.id);
      } catch (error) {
        console.error(`Error creating category ${categoryName}:`, error);
      }
    }

    console.log("Created all technologies and categories");

    // Link projects to technologies and categories
    let linkedTech = 0;
    let linkedCategories = 0;

    for (const project of projects) {
      // Link technologies
      if (project.tech && project.tech.length > 0) {
        for (const techName of project.tech) {
          const normalizedTech = techName.trim().toLowerCase();
          const techId = techMap.get(normalizedTech);
          if (techId) {
            try {
              await prisma.projectTechnology.upsert({
                where: {
                  projectId_technologyId: {
                    projectId: project.id,
                    technologyId: techId,
                  },
                },
                update: {},
                create: {
                  projectId: project.id,
                  technologyId: techId,
                },
              });
              linkedTech++;
            } catch (error) {
              console.error(
                `Error linking tech ${techName} to project ${project.id}:`,
                error
              );
            }
          }
        }
      }

      // Link categories
      if (project.categories && project.categories.length > 0) {
        for (const categoryName of project.categories) {
          const normalizedCategory = categoryName.trim().toLowerCase();
          const categoryId = categoryMap.get(normalizedCategory);
          if (categoryId) {
            try {
              await prisma.projectCategory.upsert({
                where: {
                  projectId_categoryId: {
                    projectId: project.id,
                    categoryId: categoryId,
                  },
                },
                update: {},
                create: {
                  projectId: project.id,
                  categoryId: categoryId,
                },
              });
              linkedCategories++;
            } catch (error) {
              console.error(
                `Error linking category ${categoryName} to project ${project.id}:`,
                error
              );
            }
          }
        }
      }
    }

    console.log(`Linked ${linkedTech} technology relationships`);
    console.log(`Linked ${linkedCategories} category relationships`);
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateTechAndCategories()
  .then(() => {
    console.log("Migration script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration script failed:", error);
    process.exit(1);
  });

