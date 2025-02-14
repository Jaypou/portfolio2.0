"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { AboutTimeline } from "@/components";

export default function AboutMain() {
  const dictionary = useDictionary();

  const timelineData = [
    {
      year: "2015",
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

  return (
    <div className="max-w-7xl py-20">
      <div className="container mx-auto flex flex-col items-center px-8 md:px-0">
        <h1 className="mb-16 text-center text-5xl font-bold text-white">
          {dictionary.About.title}
        </h1>

        <AboutTimeline timelineData={timelineData} />
      </div>
    </div>
  );
}
