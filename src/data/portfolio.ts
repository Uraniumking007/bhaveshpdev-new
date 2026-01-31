export const portfolioData = {
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "Modern portfolio and blog built with Astro, TypeScript, and Tailwind CSS.",
      technologies: ["Astro", "TypeScript", "Tailwind"],
      codeUrl: "https://github.com/UraniumKing007/portfolio",
      demoUrl: "https://bhaveshp.dev",
    },
    {
      id: 2,
      title: "Blog Platform",
      description:
        "Full-featured blog with authentication, rich text editor, and scheduled publishing.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      codeUrl: "https://github.com/UraniumKing007/blog",
      demoUrl: "https://blog.bhaveshp.dev",
    },
  ],

  experience: [
    {
      id: 1,
      title: "Software Developer",
      company: "Company Name",
      period: "2022 - Present",
      details: [
        "Developed and maintained full-stack web applications",
        "Collaborated with cross-functional teams to deliver features",
        "Implemented responsive UIs using modern frameworks",
        "Optimized database queries and API performance",
      ],
    },
    {
      id: 2,
      title: "Junior Developer",
      company: "Previous Company",
      period: "2020 - 2022",
      details: [
        "Built web applications using JavaScript and frameworks",
        "Fixed bugs and improved existing codebases",
        "Participated in code reviews and team meetings",
        "Learned and applied best practices in software development",
      ],
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Colleague Name",
      role: "Title at Company",
      initials: "CN",
      text: "Bhavesh is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    },
    {
      id: 2,
      name: "Colleague Name",
      role: "Title at Company",
      initials: "CN",
      text: "Working with Bhavesh was a pleasure. He's knowledgeable, collaborative, and always meets deadlines.",
    },
  ],

  skills: {
    frontend: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Astro",
      "Next.js",
      "HTML5",
      "CSS3",
    ],
    backend: [
      "Node.js",
      "Python",
      "Express",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
    ],
    devops: [
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
  },
};

export type PortfolioData = typeof portfolioData;
