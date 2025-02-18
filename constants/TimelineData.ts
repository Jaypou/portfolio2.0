export interface TimelineEntry {
  year: string;
  titleKey: string;
  descriptionKey: string;
}

export const timelineData: TimelineEntry[] = [
  {
    year: "2016",
    titleKey: "About.BeginningCarpentry",
    descriptionKey: "About.BeginningCarpentryDesc",
  },
  {
    year: "2018",
    titleKey: "About.ProfessionalExperience",
    descriptionKey: "About.ProfessionalExperienceDesc",
  },
  {
    year: "2022",
    titleKey: "About.TransitionWebDev",
    descriptionKey: "About.TransitionWebDevDesc",
  },
  {
    year: "2023",
    titleKey: "About.SkillDevelopment",
    descriptionKey: "About.SkillDevelopmentDesc",
  },
  {
    year: "2025",
    titleKey: "About.ReadyForImpact",
    descriptionKey: "About.ReadyForImpactDesc",
  },
];

export const yearToIcon = {
  "2016": "mdi:hammer-screwdriver",
  "2018": "mdi:account-hard-hat",
  "2022": "mdi:code-braces",
  "2023": "mdi:book-open-page-variant",
  "2025": "mdi:rocket-launch",
} as const;

export const timelineAnimationVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.3 },
};
