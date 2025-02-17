"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { ExperienceCard } from "@/components";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import CegepSherbrookeLogo from "@/public/assets/images/CegepSherbrookeLogo.png";
import InnovationKKLogo from "@/public/assets/images/InnovationKKLogo.png";

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
    <div className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-8">
        <h1 className="mb-16 text-center text-5xl font-bold text-white">
          {dictionary.Experience.ExpTitle}
        </h1>
        <div ref={containerRef} className="w-full">
          {experienceData.map((experience, index) => (
            <div key={index} className="experience-card-container">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
