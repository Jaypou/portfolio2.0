"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/context/ThemeProvider";

const ThemeSwitcher = () => {
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("ThemeContext is null");
  }
  const { mode, toggleTheme } = themeContext;

  useEffect(() => {
    console.log("Theme changed to: ", mode);
  }, [mode]);

  return (
    <div
      onClick={toggleTheme}
      style={{ cursor: "pointer" }}
      aria-label={
        mode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      <div key={mode}>
        {mode === "light" ? (
          <Icon
            icon="line-md:sunny-outline-to-moon-transition"
            className="h-8 w-8 text-yellow-500"
            style={{
              animation: "1s ease-in-out",
            }}
          />
        ) : (
          <Icon
            icon="line-md:moon-filled-to-sunny-filled-transition"
            className="h-8 w-8 text-yellow-500"
            style={{
              animation: "1s ease-in-out",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
