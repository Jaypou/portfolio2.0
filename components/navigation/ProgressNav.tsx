"use client";
import React, { useState, useEffect } from "react";
import IconComp from "../shared/IconComp";

const navItems = [
  {
    icon: "mdi:account",
    href: "#contact",
    label: "Contact",
  },
  {
    icon: "mdi:rocket-launch",
    href: "#about",
    label: "About",
  },
  {
    icon: "mdi:lightbulb",
    href: "#skills",
    label: "Skills",
  },
  {
    icon: "mdi:briefcase",
    href: "#experiences",
    label: "Experiences",
  },
];

export default function ProgressNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Simple scroll progress calculation
      const progress = (window.scrollY / documentHeight) * 100;
      setScrollProgress(progress);

      // Find active section
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop - 200 &&
          scrollPosition < sectionTop + sectionHeight - 200
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-white/80 opacity-0 transition-all duration-500 md:bottom-auto md:left-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rounded-none md:bg-transparent ${mounted ? "opacity-100" : ""}`}
    >
      <div className="relative flex items-center gap-4 p-4 md:flex-col md:gap-12 md:px-0 md:py-12">
        {/* Progress bar container - only visible on desktop */}
        <div className="absolute inset-y-0 hidden w-[2px] bg-white/20 md:block">
          {/* Progress bar fill */}
          <div
            className="w-full bg-white transition-all duration-300"
            style={{
              height: `${scrollProgress}%`,
              opacity: 0.8,
            }}
          />
        </div>

        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group relative flex items-center justify-center transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href);
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="relative">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-900 sm:h-12 sm:w-12 md:h-10 md:w-10 xl:h-14 xl:w-14
                  ${
                    activeSection === item.href.substring(1)
                      ? "bg-gray-800 shadow-lg shadow-gray-700"
                      : "bg-white shadow-lg shadow-gray-500"
                  }`}
              >
                <IconComp
                  icon={item.icon}
                  className={`h-6 w-6 transition-all duration-300
                    ${
                      activeSection === item.href.substring(1)
                        ? "text-white"
                        : "text-black group-hover:text-white"
                    }`}
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
}
