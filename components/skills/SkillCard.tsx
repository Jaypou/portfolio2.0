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
    <div className="relative w-full ease-in-out md:min-h-[310px] md:rounded-lg md:bg-white/90 md:p-6 md:shadow-xl md:shadow-gray-700 md:transition-all md:hover:scale-105 md:hover:shadow-gray-800 lg:min-h-[300px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IconComp
            className={cn(
              "-top-3 left-2 h-12 w-12 min-w-[48px] rounded-lg p-2 text-white shadow-xl shadow-gray-500 md:absolute md:h-16 md:w-16 md:min-w-[64px]",
              `bg-${iconColor}`
            )}
            icon={icon}
          />

          <h3 className="text-xl font-semibold md:ml-4 md:mt-10">{title}</h3>
        </div>

        <ul
          className={cn(
            "ml-20 flex list-disc flex-col items-start justify-center gap-4 marker:text-xs md:ml-8",
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
