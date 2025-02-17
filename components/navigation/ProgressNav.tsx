"use client";
import React, { useState, useEffect } from "react";
import { IconComp } from "@/components";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface ProgressNavProps {
  navItems: NavItem[];
}

export default function ProgressNav({ navItems }: ProgressNavProps) {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isVisible, isLoading, isDesktop } = useScrollVisibility();

  // Constants for the progressNav are stored elsewhere for easier management

  // Handle section tracking and progress
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
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-2xl opacity-0 transition-all duration-500 md:bottom-auto md:left-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rounded-none md:bg-transparent 
      ${!isLoading ? "opacity-100" : ""} 
      ${!isDesktop ? (isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0") : ""}`}
    >
      <div className="relative flex items-center gap-4 p-4 md:flex-col md:gap-12 md:px-0 md:py-12">
        {/* Progress bar container - only visible on desktop */}
        <div className="absolute inset-y-0 hidden w-[2px] bg-white/20 md:block">
          {/* Progress bar fill */}
          <div
            className="bg-blue-primary w-full transition-all duration-300"
            style={{
              height: `${scrollProgress}%`,
            }}
          />
        </div>

        {navItems.map((item: any, index: number) => (
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
            {/* Custom tooltip element */}
            <div className="group relative">
              <div
                className={`absolute whitespace-nowrap ${
                  isDesktop
                    ? "left-[calc(100%+12px)] top-1/2 -translate-y-1/2"
                    : "left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+12px)]"
                } hidden rounded-md bg-white/90 px-3 py-1.5 text-sm capitalize text-black shadow-lg ${isVisible ? "group-hover:block" : ""}`}
              >
                {item.label}
                <div
                  className={`absolute ${
                    isDesktop
                      ? "left-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-white/90"
                      : "bottom-[-6px] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white/90"
                  }`}
                />
              </div>

              <div className="relative">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 backdrop-blur-md transition-all duration-300 group-hover:scale-110 sm:h-12 sm:w-12 md:h-10 md:w-10 md:bg-gradient-to-br md:from-zinc-800/90 md:to-zinc-950/100 xl:h-14 xl:w-14
                    ${
                      activeSection === item.href.substring(1)
                        ? "shadow-blue-primary shadow-md md:bg-gray-800"
                        : "shadow-sm shadow-white/20"
                    }`}
                >
                  <IconComp
                    icon={item.icon}
                    className={`relative h-6 w-6 transition-all duration-300
                      ${
                        activeSection === item.href.substring(1)
                          ? "text-black md:text-white"
                          : "text-black group-hover:text-black md:text-white"
                      }`}
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </nav>
  );
}
