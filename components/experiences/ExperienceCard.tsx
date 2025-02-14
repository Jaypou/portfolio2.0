"use client";
import Image, { StaticImageData } from "next/image";
import Link, { LinkProps } from "next/link";

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
  return (
    <div className="group relative mb-12 w-full items-start sm:mb-16 md:px-8">
      {/* Content */}
      <div className="w-full">
        <div className="rounded-xl bg-gradient-to-br from-zinc-800/90 to-zinc-950/100 p-4 shadow-lg shadow-white/20 transition-all duration-300 group-hover:shadow-white/80 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-4">
              {/* Image & Link */}
              {link ? (
                <Link
                  href={link}
                  target="_blank"
                  className={`flex h-24 w-24 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 sm:h-20 sm:w-20 ${classnames ? classnames : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${title} Logo`}
                    className="object-contain p-3 sm:p-2"
                  />
                </Link>
              ) : (
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 sm:h-20 sm:w-20 ${classnames ? classnames : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${title} Logo`}
                    className="object-contain p-3 sm:p-2"
                  />
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <h4 className="font-light tracking-wider text-white/50">
                  {year}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-base font-medium leading-relaxed text-white sm:ml-8 sm:text-lg">
              {description}
            </p>

            {/* Tasks */}
            {tasks && (
              <ul className="ml-4 list-inside list-disc space-y-3 text-sm text-white/60 sm:ml-16 sm:text-base">
                {tasks.map((task, index) => (
                  <li key={index} className="">
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
