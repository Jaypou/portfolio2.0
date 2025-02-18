"use client";

import { useDictionary } from "@/app/[locale]/dictionary-provider";
import { AboutTimeline } from "@/components";
import { timelineData } from "@/constants/TimelineData";

export default function AboutMain() {
  const dictionary = useDictionary();

  return (
    <section aria-labelledby="about-title" className="max-w-7xl py-20">
      <div className="container mx-auto flex flex-col items-center md:px-0">
        <h1
          className="mb-16 text-center text-4xl font-bold text-white"
          id="about-title"
        >
          {dictionary.About.title}
        </h1>
        <AboutTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
