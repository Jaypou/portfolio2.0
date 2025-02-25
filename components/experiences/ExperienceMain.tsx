"use client";

import { useEffect, useRef } from "react";

import { useDictionary } from "@/app/[locale]/dictionary-provider";
import { ExperienceCard } from "@/components";
import CarpentryLogo from "@/public/assets/images/Carpentry.png";
import CegepSherbrookeLogo from "@/public/assets/images/CegepSherbrookeLogo.png";
import InnovationKKLogo from "@/public/assets/images/InnovationKKLogo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function ExperiencesMain() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".experience-card-container");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  const dictionary = useDictionary();

  const experienceData = [
    {
      title: dictionary.Experience.ConstructionTitle,
      description: dictionary.Experience.ConstructionDesc,
      year: "2016 - 2021",
      image: CarpentryLogo,
      classnames: "bg-black p-0",
      tasks: dictionary.Experience.ConstructionTasks,
      // link: "",
    },
    {
      title: dictionary.Experience.AECTitle,
      description: dictionary.Experience.AECDesc,
      year: "2021 - 2022",
      image: CegepSherbrookeLogo,
      classnames: "bg-white p-5",
      tasks: dictionary.Experience.AECTasks,
      link: "https://cegepsherbrooke.qc.ca/formations/aec/developpement-web/",
    },
    {
      title: dictionary.Experience.WebDevTitle,
      description: dictionary.Experience.WebDevDesc,
      year: "2023 - Fin 2024",
      image: InnovationKKLogo,
      classnames: "bg-black p-1",
      tasks: dictionary.Experience.WebDevTasks,
      link: "https://www.innovation-kk.ca/",
    },
  ];

  return (
    <div className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-8 lg:max-w-5xl xl:max-w-6xl">
        <h1 className="mb-16 text-center text-4xl font-bold text-white">
          {dictionary.Experience.ExpTitle}
        </h1>
        <div ref={containerRef} className="w-full">
          {experienceData.map((experience, index) => (
            <div key={index} className="experience-card-container">
              <ExperienceCard
                key={index}
                classnames={experience.classnames}
                description={experience.description}
                image={experience.image}
                link={experience.link}
                tasks={experience.tasks}
                title={experience.title}
                year={experience.year}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
