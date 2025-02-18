"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Rock_Salt } from "next/font/google";
import { cn } from "@/lib/utils";

const rockSalt = Rock_Salt({
  weight: ["400"],
  subsets: ["latin"],
});

interface GsapTextProps {
  text: string;
  duration?: number; // Duration per letter in seconds
  className?: string;
  animateOnLoad?: boolean;
  font?: "default" | "rockSalt";
  triggerOnHover?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function GsapText({
  text,
  duration = 1, // Default to 1 second per letter
  className,
  animateOnLoad = true,
  font = "default",
  triggerOnHover = false,
}: GsapTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const totalDuration = text.length * duration * 1000; // Total duration in ms
    const intervalTime = totalDuration / (text.length * 10); // Control scramble frequency

    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }

      if (iterations.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= iterations.current
                ? text[i]
                : alphabets[getRandomInt(26)]
          )
        );
        iterations.current = iterations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        {
          opacity: 0.75,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.3,
        }
      );
    }
  }, [trigger]);

  return (
    <div
      className={cn(
        "flex scale-100 cursor-default py-2",
        font === "rockSalt" ? "gap-1 px-1" : "overflow-hidden"
      )}
      onMouseEnter={() => triggerOnHover && triggerAnimation()}
    >
      <div className="flex" ref={containerRef}>
        {displayText.map((letter, i) => (
          <div
            key={`${letter}-${i}-${trigger}`}
            className={cn(
              "font-mono",
              letter === " " ? "w-3" : "",
              font === "rockSalt" ? rockSalt.className : "",
              className
            )}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}
