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
      aria-label="Timeline navigation"
      className="flex items-center justify-center gap-4 md:gap-10"
      role="navigation"
    >
      <button
        aria-label="Previous timeline entry"
        className="rounded-full bg-blue-500/10 p-2 text-blue-primary transition-colors hover:bg-blue-500/20"
        onClick={onPrev}
      >
        <IconComp className="h-8 w-8" icon="mdi:chevron-left" />
      </button>

      {timelineData.map((data, index) => (
        <button
          key={data.year}
          aria-current={currentIndex === index ? "true" : undefined}
          aria-label={`Go to year ${data.year}`}
          className="group flex flex-col items-center"
          onClick={() => onDotClick(index)}
        >
          <div className="relative mb-2 h-3 w-3">
            <div
              className={`absolute h-full w-full rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "scale-125 bg-blue-primary"
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
        aria-label="Next timeline entry"
        className="rounded-full bg-blue-500/10 p-2 text-blue-primary transition-colors hover:bg-blue-500/20"
        onClick={onNext}
      >
        <IconComp className="h-8 w-8" icon="mdi:chevron-right" />
      </button>
    </div>
  );
}
