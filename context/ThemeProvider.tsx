import React, { createContext, useContext, useState, useEffect } from "react";
import { saveUserPreferences } from "@/services/userPreferences"; // Import the service function

interface ThemeContextType {
  mode: string;
  uiMode: string;
  toggleTheme: () => void;
  toggleUIMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("light");
  const [uiMode, setUIMode] = useState("mac");

  // Helper function to get cookie value by name
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    // Check cookies for stored theme and uiMode
    const storedTheme = getCookie("theme") || "light";
    const storedUIMode = getCookie("uiMode") || "mac";

    setMode(storedTheme);
    setUIMode(storedUIMode);
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", mode);
    localStorage.setItem("uiMode", uiMode);

    // Save preferences in cookies using the server action
    saveUserPreferences(mode, uiMode);
  }, [mode, uiMode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  const toggleUIMode = () => {
    const newUIMode = uiMode === "mac" ? "windows" : "mac";
    setUIMode(newUIMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, uiMode, toggleTheme, toggleUIMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
