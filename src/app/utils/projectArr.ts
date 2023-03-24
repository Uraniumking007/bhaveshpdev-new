export interface ProjectsDetails {
  githubLink: string;
  title: string;
  description: string;
  imgLink: string;
  previewLink: string;
  warning: string;
}
export interface skill {
  src: string;
  colorScheme: string;
}
export const Skills = [
  {
    src: '/icons/FrontendDevelopment/html.svg',
    colorScheme: 'rgba(251,110,34,0.5)',
  },
  {
    src: '/icons/FrontendDevelopment/css.svg',
    colorScheme: 'rgba(38,154,227,0.5)',
  },
  {
    src: '/icons/FrontendDevelopment/tailwind.svg',
    colorScheme: 'rgba(56,189,248,0.5)',
  },
  {
    src: '/icons/FrontendDevelopment/reactjs.svg',
    colorScheme: 'rgba(0, 216, 255,0.5)',
  },
  {
    src: '/icons/Database/xatafly.png',
    colorScheme: 'rgba(254, 1, 116,0.5)',
  },
  {
    src: '/icons/Social/github.svg',
    colorScheme: 'rgba(92, 107, 192,0.5)',
  },
  {
    src: '/icons/ProgrammingLanguages/javascript.svg',
    colorScheme: 'rgba(255, 214, 0,0.5)',
  },
  {
    src: '/icons/ProgrammingLanguages/typescript.svg',
    colorScheme: 'rgba(25, 118, 210,0.5)',
  },
  {
    src: '/icons/Database/oracle.svg',
    colorScheme: 'rgba(199, 70, 52,0.5)',
  },
  {
    src: '/icons/BackendDevelopment/nodejs.svg',
    colorScheme: 'rgba(83, 158, 67,0.5)',
  },
  {
    src: '/icons/Software/photoshop.svg',
    colorScheme: 'rgba(49, 168, 255,0.5)',
  },
];

export const projectsArr = [
  {
    githubLink: 'https://github.com/Uraniumking007/todo-app-new',
    title: 'Todo App',
    description:
      "This is a simple web application for managing your todo list. You can add, edit, and delete tasks, and mark them as completed when you're done.",
    imgLink:
      'https://cdn.discordapp.com/attachments/1079592365821526078/1081903624394911924/Fqc6rWuWcAEtQL7.png',
    previewLink: 'https://todo.bhaveshp.dev/',
    warning: '',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/Expense-Manager',
    title: 'Expense Manager',
    description:
      'A simple Expense Manager which stores data in local storage of your browser.',
    imgLink:
      'https://cdn.discordapp.com/attachments/1079592365821526078/1079592439528042627/image.png',
    previewLink: 'https://expensemanager.bhaveshp.dev/',
    warning: '',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/digital-clock',
    title: 'Digital Clock',
    description: 'A simple Digital Clock',
    imgLink:
      'https://cdn.discordapp.com/attachments/1056086845693370439/1065513304988078090/image.png',
    previewLink: 'https://digitalclock.bhaveshp.dev/',
    warning: '',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/stckme-clone',
    title: 'Stackme Clone',
    description: 'This is a clone of Stackme made only html and css.',
    imgLink:
      'https://cdn.discordapp.com/attachments/1079592365821526078/1079609336541757520/image.png',
    previewLink: 'https://deft-fudge-10fa95.netlify.app/',
    warning: 'Only Optimized for Mobile',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/linktree-design-clone',
    title: 'Linktree Design Clone',
    description: 'This is a clone of linktree made only html and css.',
    imgLink:
      'https://cdn.discordapp.com/attachments/1056086845693370439/1056105527240818768/ezgif.com-gif-maker_1.gif',
    previewLink: 'https://exquisite-sprite-7700d4.netlify.app/',
    warning: '',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/stopwatch',
    title: 'Stopwatch',
    description:
      'This is a simple stopwatch app built with JavaScript. Read about how to build it on my blog.',
    imgLink:
      'https://cdn.discordapp.com/attachments/1057923395162996796/1059046443383529482/Screenshot_2022-12-30_225610.png',
    previewLink: 'https://stopwatch.bhaveshp.dev/',
    warning: '',
  },
  {
    githubLink: 'https://github.com/Uraniumking007/Temperature-Converter',
    title: 'Temperature Converter',
    description:
      'Temperature-Converter is a simple temperature converter which convert temperature in other temperature unit as soon as value is typed.',
    imgLink:
      'https://cdn.discordapp.com/attachments/1056086845693370439/1059461203824496640/image.png',
    previewLink: 'https://tempconvert.bhaveshp.dev/',
    warning: '',
  },

  {
    githubLink:
      'https://github.com/Uraniumking007/Coming-Soon-Page-for-Website',
    title: 'Coming Soon for Website',
    description: 'A Simple animated coming soon Page for website',
    imgLink:
      'https://cdn.discordapp.com/attachments/1056086845693370439/1060924534821236778/image.png',
    previewLink: 'https://coming-soon.bhaveshp.dev/',
    warning: '',
  },
];
