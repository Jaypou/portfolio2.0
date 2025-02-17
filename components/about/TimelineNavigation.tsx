"use client";

import { IconComp } from "@/components";
import { TimelineEntry } from "@/constants/TimelineData";

interface TimelineNavigationProps {
  timelineData: TimelineEntry[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onDotClick: (index: number) => void;
}

export default function TimelineNavigation({
  timelineData,
  currentIndex,
  onNext,
  onPrev,
  onDotClick,
}: TimelineNavigationProps) {
  return (
    <div
      className="flex items-center justify-center gap-4 md:gap-10"
      role="navigation"
      aria-label="Timeline navigation"
    >
      <button
        onClick={onPrev}
        className="text-blue-primary rounded-full bg-blue-500/10 p-2 transition-colors hover:bg-blue-500/20"
        aria-label="Previous timeline entry"
      >
        <IconComp icon="mdi:chevron-left" className="h-8 w-8" />
      </button>

      {timelineData.map((data, index) => (
        <button
          key={data.year}
          onClick={() => onDotClick(index)}
          className="group flex flex-col items-center"
          aria-label={`Go to year ${data.year}`}
          aria-current={currentIndex === index ? "true" : undefined}
        >
          <div className="relative mb-2 h-3 w-3">
            <div
              className={`absolute h-full w-full rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-blue-primary scale-125"
                  : "bg-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/40"
              }`}
            />
          </div>
          <span
            className={`text-sm font-medium transition-colors ${
              currentIndex === index
                ? "text-blue-primary"
                : "text-white/50 group-hover:text-white/80"
            }`}
          >
            {data.year}
          </span>
        </button>
      ))}

      <button
        onClick={onNext}
        className="text-blue-primary rounded-full bg-blue-500/10 p-2 transition-colors hover:bg-blue-500/20"
        aria-label="Next timeline entry"
      >
        <IconComp icon="mdi:chevron-right" className="h-8 w-8" />
      </button>
    </div>
  );
}
