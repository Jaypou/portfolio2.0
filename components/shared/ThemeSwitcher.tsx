"use client";

import React from "react";

import { useTheme } from "@/context/ThemeProvider";
import { Icon } from "@iconify/react";

export default function ThemeSwitcher() {
  const themeContext = useTheme();

  if (!themeContext) {
    throw new Error("ThemeContext is null");
  }

  const { theme, os, toggleTheme, toggleOS } = themeContext;

  const handleThemeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
    }
  };

  const handleOSKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOS();
    }
  };

  return (
    <div className="flex gap-4">
      {/* Light/Dark mode toggle */}
      <button
        aria-label={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
        onClick={toggleTheme}
        onKeyDown={handleThemeKeyDown}
      >
        {theme === "light" ? (
          <Icon
            className="h-8 w-8 text-yellow-500"
            icon="line-md:sunny-outline-to-moon-transition"
            style={{ animation: "1s ease-in-out" }}
          />
        ) : (
          <Icon
            className="h-8 w-8 text-yellow-500"
            icon="line-md:moon-filled-to-sunny-filled-transition"
            style={{ animation: "1s ease-in-out" }}
          />
        )}
      </button>

      {/* Mac/Windows mode toggle */}
      <button
        aria-label={
          os === "mac" ? "Switch to Windows mode" : "Switch to Mac mode"
        }
        className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
        onClick={toggleOS}
        onKeyDown={handleOSKeyDown}
      >
        {os === "mac" ? (
          <Icon
            className="h-8 w-8 text-blue-500"
            icon="tabler:brand-windows"
            style={{ animation: "1s ease-in-out" }}
          />
        ) : (
          <Icon
            className="h-8 w-8 text-gray-700"
            icon="tabler:brand-apple"
            style={{ animation: "1s ease-in-out" }}
          />
        )}
      </button>
    </div>
  );
}
