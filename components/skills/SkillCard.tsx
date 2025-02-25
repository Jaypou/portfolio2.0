"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";

import { cn } from "@/lib/cn";

import { IconComp } from "../shared";

interface SkillCardProps {
  icon: string;
  iconColor?: string;
  title: string;
  description: string;
  skills: string[];
}

export default function SkillCard({
  icon,
  iconColor,
  title,
  skills,
  description,
}: SkillCardProps) {
  const titleRef = useRef(null);
  const skillsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.3 }
      );

      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.1,
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="to relative h-full w-full rounded-lg bg-gradient-to-br from-zinc-800/90 to-zinc-950/100 py-5 ease-in-out md:p-6 md:shadow-lg md:shadow-white/20 md:transition-all md:hover:scale-105">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <IconComp
            className={cn(
              "absolute -top-3 left-2 h-12 w-12 min-w-[48px] rounded-lg p-2 text-white shadow-lg shadow-white/20 md:h-16 md:w-16 md:min-w-[64px]",
              `bg-${iconColor}`
            )}
            icon={icon}
          />

          <h3
            ref={titleRef}
            className="ml-4 mt-4 text-xl font-semibold text-white/80 md:mt-10"
          >
            {title}
          </h3>
        </div>

        <p className="ml-4 text-sm font-light italic text-white/60 md:mt-2 md:text-base">
          {description}
        </p>

        <ul className="ml-12 flex list-disc flex-col items-start justify-center gap-4 text-sm text-white/80 marker:text-xs md:ml-8 md:text-base">
          {skills.map((skill, index) => (
            <li
              key={index}
              ref={(el: HTMLLIElement | null) => {
                skillsRef.current[index] = el;
              }}
              className={cn(`marker:text-${iconColor}`)}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
