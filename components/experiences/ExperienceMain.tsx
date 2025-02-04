"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { ExperienceCard } from "@/components";
import CegepSherbrookeLogo from "@/public/assets/images/CegepSherbrookeLogo.png";
import InnovationKKLogo from "@/public/assets/images/InnovationKKLogo.png";

export default function ExperiencesMain() {
  const dictionary = useDictionary();

  const experienceData = [
    {
      title: dictionary.Experience.AECTitle,
      description: dictionary.Experience.AECDesc,
      year: "2021-2022",
      image: CegepSherbrookeLogo,
      classnames: "bg-white p-5",
      tasks: dictionary.Experience.AECTasks,
      link: "https://cegepsherbrooke.qc.ca/formations/aec/developpement-web/",
    },
    {
      title: dictionary.Experience.WebDevTitle,
      description: dictionary.Experience.WebDevDesc,
      year: "2023-2025",
      image: InnovationKKLogo,
      classnames: "bg-black p-1",
      tasks: dictionary.Experience.WebDevTasks,
      link: "https://www.innovation-kk.ca/",
    },
  ];

  return (
    <div className="max-w-7xl py-20">
      <div className="container mx-auto flex flex-col items-center px-8 md:px-0">
        <h1 className="mb-16 text-center text-5xl font-bold">
          Experience Professionnelle
        </h1>
        <div className="w-full">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={index}
              title={experience.title}
              description={experience.description}
              year={experience.year}
              image={experience.image}
              classnames={experience.classnames}
              tasks={experience.tasks}
              link={experience.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
