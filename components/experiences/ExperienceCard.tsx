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
    <div className="group relative mb-16 w-full items-start px-8 ">
      {/* Content */}
      <div className="w-full">
        <div className="rounded-xl bg-white p-8 shadow-xl shadow-gray-700 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gray-800 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* Image & Link */}
              {link ? (
                <Link
                  href={link}
                  target="_blank"
                  className={`flex h-20 w-20 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 ${classnames ? classnames : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${title} Logo`}
                    className="object-contain p-2"
                  />
                </Link>
              ) : (
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 ${classnames ? classnames : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${title} Logo`}
                    className="object-contain p-2"
                  />
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <h4 className="font-light tracking-wider text-gray-500">
                  {year}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="ml-0 md:ml-8 text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-300">
              {description}
            </p>

            {/* Tasks */}
            {tasks && (
              <ul className="ml-4 md:ml-16 list-inside list-disc space-y-2 text-base text-gray-600 dark:text-gray-300">
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
