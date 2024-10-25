"use client";
import React, { useRef, useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextOverlayProps {
  title: string;
  subtitle: string;
  textClassnames?: string;
  containerRef: RefObject<HTMLDivElement>;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  title,
  subtitle,
  textClassnames = "text-white",
  containerRef,
}) => {
  const textSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const textElement = textSectionRef.current;
    const containerElement = containerRef.current;

    if (!textElement || !containerElement) return;

    // Initial text animation (from bottom)
    gsap.fromTo(
      textElement,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
      }
    );

    // ScrollTrigger for text animation
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerElement,
        start: "top top",
        end: "+=50%",
        scrub: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      },
    });

    textTl.to(textElement, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerRef]);

  return (
    <div
      ref={textSectionRef}
      className={`absolute left-1/2 top-1/2 z-20 flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-4 text-center md:max-w-[80%] lg:max-w-none ${textClassnames}`}
    >
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        {subtitle}
      </p>
    </div>
  );
};

export default TextOverlay;
