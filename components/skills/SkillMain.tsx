"use client";
import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { SkillCard } from "@/components";
import { getSkillsUIData } from "@/constants/SkillsData";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function SkillMain() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".skill-card-container");

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

  return (
    <div className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center px-8">
        <h1 className="mb-16 text-center text-5xl font-bold text-white">
          {dictionary.ProgressNav.Skills}
        </h1>
        <div
          ref={containerRef}
          className="flex w-full flex-col divide-y divide-gray-700/50 md:grid md:grid-cols-2 md:gap-6 md:divide-y-0 xl:grid-cols-3"
        >
          {getSkillsUIData(dictionary).map((skill, index) => (
            <div
              key={index}
              className={`skill-card-container py-8 first:pt-0 last:pb-0 md:py-0 ${index === getSkillsUIData(dictionary).length - 1 ? "xl:col-span-3" : ""}`}
            >
              <SkillCard
                icon={skill.icon}
                iconColor={skill.iconColor}
                title={skill.title}
                skills={skill.skills}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
