export const getSkillsUIData = (dictionary: any) => [
  {
    icon: "mingcute:code-fill",
    iconColor: "red-500",
    title: dictionary.Skills.FrontEnd.title,
    description: dictionary.Skills.FrontEnd.description,
    skills: dictionary.Skills.FrontEnd.skills,
  },
  {
    icon: "zondicons:cloud",
    iconColor: "blue-500",
    title: dictionary.Skills.BackEnd.title,
    description: dictionary.Skills.BackEnd.description,
    skills: dictionary.Skills.BackEnd.skills,
  },
  {
    icon: "flowbite:brain-solid",
    iconColor: "green-500",
    title: dictionary.Skills.AI.title,
    description: dictionary.Skills.AI.description,
    skills: dictionary.Skills.AI.skills,
  },
  {
    icon: "mdi:toolbox",
    iconColor: "purple-500",
    title: dictionary.Skills.Professional.title,
    description: dictionary.Skills.Professional.description,
    skills: dictionary.Skills.Professional.skills,
  },
];
