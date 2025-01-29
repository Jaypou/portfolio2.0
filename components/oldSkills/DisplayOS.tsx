"use client";
import React, { useEffect, useState } from "react";
import { FloatingDockDemo, WindowsTaskBar } from "@/components";
import { motion, AnimatePresence } from "framer-motion";

export default function DisplayOS() {
  const [os, setOS] = useState<string | null>(null);

  const fetchPreferences = async () => {
    try {
      const response = await fetch("/api/getPreferences");
      const data = await response.json();
      setOS(data.os || null); // Set OS preference from the response
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  };

  useEffect(() => {
    // Fetch OS preference on initial load
    fetchPreferences();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchPreferences, 1000); // Check for updates every second
    return () => clearInterval(interval);
  }, []);

  // Framer Motion transition variants for smooth animations
  const variants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly off-screen
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Smooth fade-in and slide-in
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }, // Smooth fade-out and slide-out
  };

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {/* Updated mode from exitBeforeEnter */}
        {os === "mac" && (
          <motion.div
            key="mac"
            className="absolute bottom-6 z-[0] w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <FloatingDockDemo />
          </motion.div>
        )}
        {os === "windows" && (
          <motion.div
            key="windows"
            className="absolute bottom-0 z-[0] w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <WindowsTaskBar />
          </motion.div>
        )}
        {/* Default fallback if no OS is specified */}
        {!os && (
          <motion.div
            key="fallback"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <div>No OS specified.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
