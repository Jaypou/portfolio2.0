"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import TimelineCard from "./TimelineCard";

interface TimelineEntry {
  year: string;
  titleKey: string;
  descriptionKey: string;
}

interface TimelineProps {
  timelineData: TimelineEntry[];
}

export default function AboutTimeline({ timelineData }: TimelineProps) {
  const dictionary = useDictionary();

  return (
    <div className="relative w-full md:max-w-5xl lg:max-w-6xl xl:max-w-none">
      {/* Timeline line */}
      <div className="right-[23px] h-full w-0.5 bg-blue-500/20 dark:bg-blue-400/20 sm:absolute" />

      {timelineData.map((data) => (
        <TimelineCard
          key={data.year}
          year={data.year}
          title={dictionary.About[data.titleKey.split(".")[1]]}
          description={dictionary.About[data.descriptionKey.split(".")[1]]}
        />
      ))}
    </div>
  );
}
