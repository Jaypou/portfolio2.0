"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { AboutTimeline } from "@/components";
import { timelineData } from "@/constants/TimelineData";

export default function AboutMain() {
  const dictionary = useDictionary();

  return (
    <section className="max-w-7xl py-20" aria-labelledby="about-title">
      <div className="container mx-auto flex flex-col items-center md:px-0">
        <h1 id="about-title" className="mb-16 text-center text-5xl font-bold text-white">
          {dictionary.About.title}
        </h1>
        <AboutTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
