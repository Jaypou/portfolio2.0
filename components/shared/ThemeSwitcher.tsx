"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeSwitcher() {
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("ThemeContext is null");
  }

  const { theme, os, toggleTheme, toggleOS } = themeContext;

  // useEffect(() => {
  //   console.log("Theme changed to: ", theme);
  //   console.log("OS changed to: ", os);
  // }, [theme, os]);

  return (
    <div style={{ display: "flex", gap: "1rem", cursor: "pointer" }}>
      {/* Light/Dark mode toggle */}
      <div
        onClick={toggleTheme}
        aria-label={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
      >
        <div key={theme}>
          {theme === "light" ? (
            <Icon
              icon="line-md:sunny-outline-to-moon-transition"
              className="h-8 w-8 text-yellow-500"
              style={{ animation: "1s ease-in-out" }}
            />
          ) : (
            <Icon
              icon="line-md:moon-filled-to-sunny-filled-transition"
              className="h-8 w-8 text-yellow-500"
              style={{ animation: "1s ease-in-out" }}
            />
          )}
        </div>
      </div>

      {/* Mac/Windows mode toggle */}
      <div
        onClick={toggleOS}
        aria-label={
          os === "mac" ? "Switch to Windows mode" : "Switch to Mac mode"
        }
      >
        <div key={os}>
          {/* Display opposite OS icon */}
          {os === "mac" ? (
            <Icon
              icon="tabler:brand-windows"
              className="h-8 w-8 text-blue-500"
              style={{ animation: "1s ease-in-out" }}
            />
          ) : (
            <Icon
              icon="tabler:brand-apple"
              className="h-8 w-8 text-gray-700"
              style={{ animation: "1s ease-in-out" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
