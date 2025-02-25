"use client";

import { IconComp } from "@/components";
import { yearToIcon } from "@/constants/TimelineData";

interface TimelineCardProps {
  title: string;
  description: string | string[];
  year: string;
}

export default function TimelineCard({
  title,
  description,
  year,
}: TimelineCardProps) {
  const icon = yearToIcon[year as keyof typeof yearToIcon];

  return (
    <article className="md:max-w-8xl group relative mx-auto w-full px-2 md:px-6">
      <div
        aria-labelledby={`timeline-title-${year}`}
        className="min-h-[400px] rounded-xl bg-gradient-to-br from-zinc-800/90 to-zinc-950/100 p-4 shadow-lg shadow-white/20 transition-all duration-300 md:min-h-[250px] md:p-8"
        role="article"
      >
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 p-2"
            >
              <IconComp className="h-10 w-10 text-blue-primary" icon={icon} />
            </div>
            <div className="flex flex-col">
              <h3
                className="text-2xl font-bold text-white md:text-3xl"
                id={`timeline-title-${year}`}
              >
                {title}
              </h3>
              <time className="text-base text-white/50 md:text-xl">{year}</time>
            </div>
          </header>
          <div className="flex flex-col gap-4">
            {Array.isArray(description) ? (
              description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-white/80 md:text-lg"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
