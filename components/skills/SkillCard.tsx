import React from "react";
import { IconComp } from "../shared";
import { cn } from "@/lib/utils/cn";

interface SkillCardProps {
  icon: string;
  iconColor?: string;
  title: string;
  skills: string[];
}

export default function SkillCard({
  icon,
  iconColor,
  title,
  skills,
}: SkillCardProps) {
  return (
    <div className="w-full p-6 md:min-h-[250px] md:rounded-lg md:bg-white/90 md:shadow-xl md:shadow-gray-700 md:backdrop-blur-sm md:transition-all md:duration-300 md:hover:scale-105 lg:min-h-[300px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-3 md:items-center md:justify-center">
          <IconComp
            className={cn("h-12 w-12 rounded-lg p-2", `bg-${iconColor}`)}
            icon={icon}
          />

          <h3 className="text-xl font-semibold md:text-center">{title}</h3>
        </div>

        <ul
          className={cn(
            "ml-8 flex list-disc flex-col items-start justify-center gap-4 marker:text-xs md:ml-0",
            iconColor ? `marker:text-${iconColor}` : "marker:text-primary"
          )}
        >
          {skills.map((skill, index) => (
            <li key={index} className="text-black/80">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
