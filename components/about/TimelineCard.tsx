"use client";
import { IconComp } from "@/components";

interface TimelineCardProps {
  title: string;
  description: string;
  year: string;
}

const getIconForYear = (year: string) => {
  switch (year) {
    case "2015":
      return "mdi:hammer-screwdriver";
    case "2018":
      return "mdi:account-hard-hat";
    case "2022":
      return "mdi:code-braces";
    case "2023":
      return "mdi:book-open-page-variant";
    case "2025":
      return "mdi:rocket-launch";
    default:
      return "mdi:calendar";
  }
};

export default function TimelineCard({
  title,
  description,
  year,
}: TimelineCardProps) {
  const icon = getIconForYear(year);
  return (
    <div className="group relative mb-16 grid w-full items-start gap-6 sm:grid-cols-[1fr,auto]">
      {/* Content */}
      <div className="w-full">
        <div className="shadow-white-20  rounded-xl bg-gradient-to-br from-zinc-800/90 to-zinc-950/100 p-8 shadow-lg transition-all duration-300 group-hover:shadow-white/80 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 p-2">
                <IconComp icon={icon} className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <h4 className="text-white/50">{year}</h4>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-white/80">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline marker */}
      <div
        className="hidden cursor-pointer flex-col items-center sm:flex"
        onClick={(e) => {
          e.currentTarget.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }}
      >
        <div className="relative z-0 flex h-12 w-12 items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full bg-blue-500 opacity-20 transition-transform duration-300 group-hover:scale-125" />
          <div className="absolute h-8 w-8 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute h-4 w-4 rounded-full bg-white" />
        </div>
        <span className="mt-4 text-lg font-bold text-blue-500 dark:text-blue-400">
          {year}
        </span>
      </div>
    </div>
  );
}
