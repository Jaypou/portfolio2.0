"use client";
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import TextGroupRotate from "./TextGroupRotate";

export interface PerspectiveCanvasProps {
  navItems?: Array<{ name: string; href: string }>;
  scrambled?: boolean;
}

function useResponsiveSettings() {
  const { viewport, size } = useThree();

  // Calculate responsive values based on viewport and window size
  const isMobile = size.width < 640;
  const isSmall = size.width < 768;

  // Adjust font size based on viewport width and device type
  const baseFontSize = isSmall
    ? Math.min(1.2, Math.max(0.8, viewport.width / 25))
    : Math.min(1.2, Math.max(1.0, viewport.width / 20));

  // Use increased spacing (2x) for all screen sizes
  const spacing = baseFontSize * 2;

  // Calculate x-offset based on screen size
  let xOffset;
  if (isMobile) {
    // Extra small screens (under 640px): minimal left offset
    xOffset = -3;
  } else if (isSmall) {
    // Mobile screens (640px-768px): moderate left offset
    xOffset = -4;
  } else if (size.width < 1024) {
    // Medium screens
    xOffset = -viewport.width / 3;
  } else {
    // Large screens
    xOffset = -viewport.width / 2.8;
  }

  // Ensure offset stays within reasonable bounds, but allow smaller offsets for mobile
  xOffset = Math.min(-2, Math.max(-14, xOffset));

  return {
    fontSize: baseFontSize,
    spacing,
    xOffset,
  };
}

function Scene({
  items,
  scrambled,
}: {
  items: Array<{ name: string; href: string }>;
  scrambled?: boolean;
}) {
  const { fontSize, spacing, xOffset } = useResponsiveSettings();
  const { size } = useThree();
  const totalItems = items.length;

  // Calculate total height based on viewport
  const totalHeight = (totalItems - 1) * spacing;
  const [dimensions, setDimensions] = useState({
    width: size.width,
    height: size.height,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {items.map((item, index) => {
        const yPosition = totalHeight / 2 - index * spacing;
        return (
          <TextGroupRotate
            key={index}
            item={item}
            scrambled={scrambled}
            fontSize={fontSize}
            position={[xOffset, yPosition, 0]}
          />
        );
      })}
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        // minPolarAngle={2}
        maxPolarAngle={Math.PI / 2}
        // minDistance={10}
        // maxDistance={10}
      />
    </>
  );
}

function ResponsiveCamera() {
  const { viewport, size } = useThree();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);

  useEffect(() => {
    const aspectRatio = size.width / size.height;
    const isSmall = size.width < 768;

    // Adjust camera position based on device and aspect ratio
    const z = isSmall
      ? Math.max(10, Math.min(14, viewport.width))
      : aspectRatio < 1
        ? Math.max(12, Math.min(15, viewport.width))
        : Math.max(8, Math.min(12, viewport.width));

    setCameraPosition([0, 0, z]);
  }, [viewport.width, size.width, size.height]);

  return null;
}

export default function PerspectiveCanvas({
  navItems = [],
  scrambled = true,
}: PerspectiveCanvasProps) {
  const placeholderItems = [
    { name: "PROJECTS", href: "/projects" },
    { name: "SKILLS", href: "/skills" },
    { name: "CONTACT", href: "/contact" },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !["HOME", "ACCUEIL"].includes(item.name.toUpperCase())
  );

  const items =
    filteredNavItems.length > 0 ? filteredNavItems : placeholderItems;

  return (
    <div className="relative z-[2] h-full w-full">
      <Canvas
        camera={{
          position: [-2, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <Scene items={items} scrambled={scrambled} />
        </Suspense>
      </Canvas>
    </div>
  );
}
