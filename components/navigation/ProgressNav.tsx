"use client";
import React from "react";
import IconComp from "../shared/IconComp";
import Link from "next/link";

const navItems = [
  {
    icon: "mdi:account",
    href: "/about",
    label: "About",
  },
  {
    icon: "mdi:lightbulb",
    href: "/skills",
    label: "Skills",
  },
  {
    icon: "mdi:rocket-launch",
    href: "/projects",
    label: "Projects",
  },
  {
    icon: "mdi:briefcase",
    href: "/contact",
    label: "Contact",
  },
];

export default function ProgressNav() {
  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center gap-8">
        <div className="w-[2px] h-20 bg-white/20 rounded-full" />
        
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group relative flex items-center justify-center"
          >
            <div className="relative">
              {index === 0 ? (
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <IconComp
                    icon={item.icon}
                    className="w-6 h-6 text-white"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black">
                  <IconComp
                    icon={item.icon}
                    className="w-6 h-6 text-black transition-all duration-300 group-hover:text-white"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
        
        <div className="w-[2px] h-20 bg-white/20 rounded-full" />
      </div>
    </nav>
  );
}
