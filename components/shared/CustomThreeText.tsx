"use client";

import { Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

interface CustomThreeTextProps {
  text: string;
  duration?: number;
  animateOnLoad?: boolean;
  triggerOnHover?: boolean;
  fontSize?: number;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  maxWidth?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "center" | "right";
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "middle" | "bottom";
  outlineWidth?: number;
  outlineColor?: string;
  href?: string;
  font?: string;
  scrambled?: boolean;
}

const alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz".split(
  ""
);
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function CustomThreeText({
  text,
  duration = 1,
  animateOnLoad = true,
  triggerOnHover = false,
  fontSize = 1,
  color = "#ffffff",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  maxWidth = 10,
  lineHeight = 1,
  letterSpacing = 0.02,
  textAlign = "center",
  anchorX = "center",
  anchorY = "middle",
  outlineWidth = 0,
  outlineColor = "#000000",
  href,
  font,
  scrambled,
}: CustomThreeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hovered, setHovered] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);
  const hoverTimeout = useRef<NodeJS.Timeout>();
  const textRef = useRef<THREE.Mesh>();
  const router = useRouter();

  const triggerAnimation = () => {
    // Only trigger animation if scrambled is not explicitly false
    if (scrambled !== false) {
      iterations.current = 0;
      setTriggerCount((prev) => prev + 1);
      setDisplayText(text);
    }
  };

  useEffect(() => {
    // If scrambled is explicitly false, don't run any animations
    if (scrambled === false) {
      setDisplayText(text);
      return;
    }

    const totalDuration = text.length * duration * 1000;
    const intervalTime = totalDuration / (text.length * 10);

    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }

      if (iterations.current < text.length) {
        setDisplayText((prevText) => {
          const textArray = prevText.split("");
          return textArray
            .map((l, i) =>
              l === " "
                ? l
                : i <= iterations.current
                  ? text[i]
                  : alphabets[getRandomInt(26)]
            )
            .join("");
        });
        iterations.current = iterations.current + 0.1;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration, animateOnLoad, triggerCount, scrambled]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
      if (href) router.prefetch(href);
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, href, router]);

  const handlePointerEnter = () => {
    setHovered(true);
    if (triggerOnHover) {
      // Clear any existing timeout
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      // Set a new timeout for the animation trigger
      hoverTimeout.current = setTimeout(() => {
        triggerAnimation();
      }, 200); // 200ms delay before triggering animation
    }
  };

  const handlePointerLeave = () => {
    setHovered(false);
    // Clear the timeout if the user leaves before the animation triggers
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <Text
        ref={textRef}
        fontSize={fontSize}
        maxWidth={maxWidth}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        textAlign={textAlign}
        anchorX={anchorX}
        anchorY={anchorY}
        outlineWidth={outlineWidth}
        outlineColor={outlineColor}
        color={color}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        font={font}
      >
        {displayText}
      </Text>
    </group>
  );
}
