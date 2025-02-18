"use client";

import { useEffect, useRef } from "react";

import Image, { StaticImageData } from "next/image";
import Link, { LinkProps } from "next/link";

import gsap from "gsap";

interface ExperienceCardProps {
  title: string;
  description: string;
  year: string;
  image: StaticImageData;
  classnames: string;
  tasks?: string[];
  link?: LinkProps["href"];
}

export default function ExperienceCard({
  title,
  description,
  year,
  image,
  classnames,
  tasks,
  link,
}: ExperienceCardProps) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const tasksRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.3 }
      );

      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.4 }
      );

      gsap.fromTo(
        tasksRef.current,
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
    <div className="group relative mb-12 w-full items-start sm:mb-16 md:px-8">
      {/* Content */}
      <div className="w-full">
        <div className="rounded-xl bg-gradient-to-br from-zinc-800/90 to-zinc-950/100 px-2 py-5 shadow-lg shadow-white/20 transition-all duration-300 group-hover:scale-105 sm:p-8 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-6 sm:items-center sm:gap-4">
              {/* Image & Link */}
              {link ? (
                <Link
                  className={`flex h-24 w-24 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 sm:h-20 sm:w-20 ${classnames ? classnames : ""}`}
                  href={link}
                  target="_blank"
                >
                  <Image
                    alt={`${title} Logo`}
                    className="object-contain p-3 sm:p-2"
                    src={image}
                  />
                </Link>
              ) : (
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 sm:h-20 sm:w-20 ${classnames ? classnames : ""}`}
                >
                  <Image
                    alt={`${title} Logo`}
                    className="object-contain p-3 sm:p-2"
                    src={image}
                  />
                </div>
              )}

              {/* Title */}
              <div ref={titleRef} className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <h4 className="font-light tracking-wider text-white/50">
                  {year}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-base font-medium leading-relaxed text-white sm:ml-8 sm:text-lg"
            >
              {description}
            </p>

            {/* Tasks */}
            {tasks && (
              <ul className="ml-4 list-inside list-disc space-y-3 text-sm text-white/60 sm:ml-16 sm:text-base">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    ref={(el: HTMLLIElement | null) => {
                      tasksRef.current[index] = el;
                    }}
                    className=""
                  >
                    {task}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
