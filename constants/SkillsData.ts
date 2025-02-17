export const SkillsData = {
  FrontEnd: {
    skills: [
      "HTML, CSS, TypeScript, JavaScript",
      "React, Next.js",
      "TailwindCSS, GSAP, Framer Motion",
      "HeroUI, HeroUI Pro, TailwindUI",
      "MagicUI, AceternityUI, Bootstrap"
    ],
  },
  BackEnd: {
    skills: [
      "PHP, Java, Node.js, Laravel",
      "RESTful API, GraphQL, Hygraph",
      "MySQL, Apache",
      "Microsoft Azure, Docker",
      "GitHub, Git"
    ],
  },
  AI: {
    skills: [
      "ChatGPT, Copilot, ClaudeAI",
      "GitHub Copilot",
      "Cline (VS Code Addon)"
    ],
  },
  Professional: {
    skills: [
      "Strategy & Innovation",
      "Performance Optimization",
      "Problem Solving & Teamwork",
      "Adaptability & Continuous Learning"
    ],
  },
};

export const getSkillsUIData = (dictionary: any) => [
  {
    icon: "mingcute:code-fill",
    iconColor: "red-500",
    title: dictionary.Skills.FrontEnd.title,
    skills: SkillsData.FrontEnd.skills,
  },
  {
    icon: "zondicons:cloud",
    iconColor: "blue-500",
    title: dictionary.Skills.BackEnd.title,
    skills: SkillsData.BackEnd.skills,
  },
  {
    icon: "flowbite:brain-solid",
    iconColor: "green-500",
    title: dictionary.Skills.AI.title,
    skills: SkillsData.AI.skills,
  },
  {
    icon: "mdi:toolbox",
    iconColor: "purple-500",
    title: dictionary.Skills.Professional.title,
    skills: SkillsData.Professional.skills,
  },
];
