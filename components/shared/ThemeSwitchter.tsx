"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/context/ThemeProvider";

const ThemeSwitcher = () => {
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("ThemeContext is null");
  }
  const { mode, uiMode, toggleTheme, toggleUIMode } = themeContext;

  useEffect(() => {
    console.log("Theme changed to: ", mode);
    console.log("UI Mode changed to: ", uiMode);
  }, [mode, uiMode]);

  return (
    <div style={{ display: "flex", gap: "1rem", cursor: "pointer" }}>
      {/* Light/Dark mode toggle */}
      <div
        onClick={toggleTheme}
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

      {/* Mac/Windows mode toggle */}
      <div
        onClick={toggleUIMode}
        aria-label={
          uiMode === "mac" ? "Switch to Windows mode" : "Switch to Mac mode"
        }
      >
        <div key={uiMode}>
          {uiMode === "mac" ? (
            <Icon
              icon="tabler:brand-apple"
              className="h-8 w-8 text-gray-700"
              style={{
                animation: "1s ease-in-out",
              }}
            />
          ) : (
            <Icon
              icon="tabler:brand-windows"
              className="h-8 w-8 text-blue-500"
              style={{
                animation: "1s ease-in-out",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
