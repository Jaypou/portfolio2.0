export const getSkillsUIData = (dictionary: any) => [
  {
    icon: "mingcute:code-fill",
    iconColor: "red-500",
    title: dictionary.Skills.FrontEnd.title,
    skills: dictionary.Skills.FrontEnd.skills,
  },
  {
    icon: "zondicons:cloud",
    iconColor: "blue-500",
    title: dictionary.Skills.BackEnd.title,
    skills: dictionary.Skills.BackEnd.skills,
  },
  {
    icon: "flowbite:brain-solid",
    iconColor: "green-500",
    title: dictionary.Skills.AI.title,
    skills: dictionary.Skills.AI.skills,
  },
  {
    icon: "mdi:toolbox",
    iconColor: "purple-500",
    title: dictionary.Skills.Professional.title,
    skills: dictionary.Skills.Professional.skills,
  },
];
