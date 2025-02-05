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
    <div className="group relative mb-12 sm:mb-16 w-full items-start md:px-8">
      {/* Content */}
      <div className="w-full">
        <div className="rounded-xl bg-white p-4 sm:p-8 shadow-xl shadow-gray-700 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gray-800 dark:bg-gray-800/50 dark:backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4">
              {/* Image & Link */}
              {link ? (
                <Link
                  href={link}
                  target="_blank"
                  className={`flex h-24 w-24 sm:h-20 sm:w-20 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 ${classnames ? classnames : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${title} Logo`}
                    className="object-contain p-3 sm:p-2"
                  />
                </Link>
              ) : (
                <div
                  className={`flex h-24 w-24 sm:h-20 sm:w-20 items-center justify-center rounded-xl shadow-md shadow-gray-500 transition-all hover:scale-110 active:scale-90 ${classnames ? classnames : ""}`}
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <h4 className="font-light tracking-wider text-gray-500">
                  {year}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-300 sm:ml-8">
              {description}
            </p>

            {/* Tasks */}
            {tasks && (
              <ul className="ml-4 list-inside list-disc space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 sm:ml-16">
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
