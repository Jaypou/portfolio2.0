"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Rock_Salt } from "next/font/google";
import { cn } from "@/lib/cn";

const rockSalt = Rock_Salt({
  weight: ["400"],
  subsets: ["latin"],
});

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
  font?: "default" | "rockSalt";
  triggerOnHover?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~".split("");
const allCharacters = [...alphabets, ...symbols];

const getRandomChar = () => allCharacters[Math.floor(Math.random() * allCharacters.length)];

export default function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
  font = "default",
  triggerOnHover = false,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (interations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? l
                : i <= interations.current
                  ? text[i]
                  : getRandomChar()
            )
          );
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10)
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div
      className={cn(
        "flex scale-100 cursor-default py-2",
        font === "rockSalt" ? "gap-1 px-1" : "overflow-hidden"
      )}
      onMouseEnter={() => triggerOnHover && triggerAnimation()}
    >
      <div className="flex">
        {displayText.map((letter, i) => (
          <motion.div
            key={`${letter}-${i}-${trigger}`}
            initial={{ opacity: 0.75, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            className={cn(
              "font-mono",
              letter === " " ? "w-3" : "",
              font === "rockSalt" ? rockSalt.className : "",
              className
            )}
          >
            {letter.toUpperCase()}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
