"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import TimelineCard from "./TimelineCard";

interface TimelineEntry {
  title: string;
  description: string;
}

interface Timeline {
  [key: string]: TimelineEntry;
}

export default function ExperiencesTimeline() {
  const dictionary = useDictionary();
  const timelineData = dictionary.experiences.timeline as Timeline;

  return (
    <div className="relative w-full md:max-w-5xl lg:max-w-6xl xl:max-w-none">
      {/* Timeline line */}
      <div className="absolute right-[10%] h-full w-0.5 bg-blue-500/20 dark:bg-blue-400/20" />

      {Object.entries(timelineData).map(([year, data]) => (
        <TimelineCard
          key={year}
          year={year.toUpperCase()}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
}
