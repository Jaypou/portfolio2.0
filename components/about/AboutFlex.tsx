"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface Item {
  title: string;
  content: React.ReactNode;
  image: string;
}

interface DynamicSectionProps {
  items: Item[];
}

export default function DynamicSection({ items }: DynamicSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(3);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>(
    Array(items.length).fill(null)
  );
  const contentRefs = useRef<(HTMLDivElement | null)[]>(
    Array(items.length).fill(null)
  );
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const totalItems = items.length;

  useEffect(() => {
    // Check screen size to adjust layout
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check screen size to adjust layout
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Cleanup function to kill previous animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Kill any existing animations on content elements
    contentRefs.current.forEach((ref) => {
      if (ref) {
        gsap.killTweensOf(ref);
      }
    });

    // Immediately set all content to opacity 0 except hovered
    contentRefs.current.forEach((ref, idx) => {
      if (ref && idx !== hoveredIndex) {
        gsap.set(ref, { opacity: 0.01 });
      }
    });

    if (hoveredIndex !== null) {
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          timelineRef.current = null;
        },
      });

      // Define scaling and positioning based on screen size
      const scaleValue = isLargeScreen ? 1.5 : 1.2;
      const yValue = isLargeScreen ? -350 : -200;
      const enterRotation = isLargeScreen ? 0 : 0;
      const exitRotation = isLargeScreen ? 90 : 0;

      // Animate title
      timelineRef.current.to(titleRefs.current[hoveredIndex], {
        y: yValue,
        rotation: enterRotation,
        scale: scaleValue,
        duration: 1,
        ease: "power2.out",
      });

      // Animate content fade-in
      timelineRef.current.to(
        contentRefs.current[hoveredIndex],
        {
          opacity: 1,
          duration: 3,
          ease: "expoScale",
          overwrite: true,
        },
        "<"
      );

      // Add scroll event listener to the active content
      const contentRef = contentRefs.current[hoveredIndex];
      const titleRef = titleRefs.current[hoveredIndex];

      if (contentRef && titleRef) {
        const handleScroll = () => {
          const scrollTop = contentRef.scrollTop;
          const opacity = Math.max(0, 1 - scrollTop / 50); // Fade out over first 100px of scroll
          gsap.to(titleRef, {
            opacity: opacity,
            duration: 0.2,
          });
        };

        contentRef.addEventListener("scroll", handleScroll);
        return () => {
          contentRef.removeEventListener("scroll", handleScroll);
          if (timelineRef.current) {
            timelineRef.current.kill();
          }

          if (titleRef) {
            gsap.to(titleRef, {
              y: 0,
              scale: 1,
              rotation: exitRotation,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (contentRef) {
            gsap.to(contentRef, {
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              overwrite: true,
            });
          }
        };
      }
    }
  }, [hoveredIndex, isLargeScreen]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getWidth = (index: number) => {
    if (isLargeScreen) {
      if (hoveredIndex === null) {
        return `${100 / totalItems}%`;
      }
      return index === hoveredIndex ? "60%" : `${40 / (totalItems - 1)}%`;
    }
    return "100%";
  };

  const getHeight = (index: number) => {
    if (!isLargeScreen) {
      if (hoveredIndex === null) {
        return `${100 / totalItems}%`;
      }
      return index === hoveredIndex ? "60%" : `${40 / (totalItems - 1)}%`;
    }
    return "100%";
  };

  return (
    <div
      className={`flex ${isLargeScreen ? "flex-row" : "flex-col"} h-[800px] w-full`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center transition-[width,height] duration-1000 ease-in-out"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            width: getWidth(index),
            height: getHeight(index),
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="h-full w-full object-cover"
                priority
              />
              <div
                className={`absolute inset-0 duration-500 ease-in-out transition-background ${hoveredIndex === index ? "bg-black/35 backdrop-blur-[0.8px]" : "bg-black/60"}`}
              />
            </div>

            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className={`relative flex h-full w-full items-center justify-center overflow-y-auto scrollbar-hide`}
            >
              <div className={`max-h-full w-full max-w-full`}>
                {item.content}
              </div>
            </div>
          </div>

          <h2
            ref={(el) => {
              titleRefs.current[index] = el;
            }}
            className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${
              isLargeScreen ? "rotate-90 text-4xl" : "text-3xl"
            } whitespace-nowrap font-bold text-white transition-opacity duration-200`}
          >
            {item.title}
          </h2>
        </div>
      ))}
    </div>
  );
}
