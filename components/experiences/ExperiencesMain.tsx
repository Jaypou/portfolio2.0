"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { ExperiencesTimeline } from "@/components";

export default function ExperiencesMain() {
  const dictionary = useDictionary();

  const experiencesData = [];

  return (
    <div className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center px-8 md:px-0">
        <h1 className="mb-16 text-center text-5xl font-bold">{dictionary.experiences.title}</h1>

        <ExperiencesTimeline />
      </div>
    </div>
  );
}
