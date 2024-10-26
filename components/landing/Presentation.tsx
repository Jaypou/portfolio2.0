"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { HyperText, VideoBackground } from "@/components/";

export interface PresentationProps {
  fullName: string;
  title: string;
  experience: string;
  location: string;
  languages: string[];
  age: string;
  imageUrl: string;
  navItems?: Array<{ name: string; href: string }>;
}

export default function Presentation({
  fullName,
  title,
  experience,
  location,
  languages,
  age,
  imageUrl,
  navItems = [],
}: PresentationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderItems = [
    { name: "PROJECTS", href: "#" },
    { name: "SKILLS", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !["HOME", "ACCUEIL"].includes(item.name.toUpperCase())
  );

  const items =
    filteredNavItems.length > 0 ? filteredNavItems : placeholderItems;

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".nav-item");
    elements?.forEach((element, index) => {
      gsap.set(element, {
        rotationX: -15,
        rotationZ: -8,
        transformPerspective: 1500,
        transformOrigin: "center center",
        y: index + 20, // Consistent vertical spacing
        z: -50 * (elements.length - index), // Progressive depth
      });
    });
  }, []);

  const handleMouseEnter = (element: HTMLElement) => {
    gsap.to(element, {
      rotationX: 0,
      rotationZ: -3,
      scale: 1.05,
      y: 0,
      z: 100,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (element: HTMLElement, index: number) => {
    gsap.to(element, {
      rotationX: -15,
      rotationZ: -8,
      scale: 1,
      y: index * 20,
      z: -50 * (items.length - index),
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <VideoBackground
          videoSource="/assets/videos/code_background_loop.mov"
          videoClassnames="opacity-20"
          fadeOutDuration={1.5}
          easeOptions="power1.inOut"
        />
      </div>
      <div
        ref={containerRef}
        className="relative z-10 flex h-full w-full flex-col items-start justify-center px-8 pb-32 pt-16 md:px-16 md:pb-16"
      >
        {items.map((item, index) => (
          <Link href={item.href} key={index} className="w-fit">
            <div
              className="nav-item group relative my-4 transform cursor-pointer md:my-6"
              onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget, index)}
            >
              <HyperText
                text={item.name}
                className="text-[8vw] leading-none tracking-tighter text-foreground/90 text-white group-hover:cursor-pointer md:text-[5vw]"
                font="rockSalt"
                duration={800}
              />
              <div className="absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-500 ease-out group-hover:w-full" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
