import React, { createContext, useContext, useState, useEffect } from "react";
import { saveUserPreferences } from "@/services/userPreferences"; // Import the service function

interface ThemeContextType {
  theme: string;
  os: string;
  toggleTheme: () => void;
  toggleOS: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [os, setOS] = useState("mac");

  // Helper function to get cookie value by name
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    // Check cookies for stored theme and os
    const storedTheme = getCookie("theme") || "light";
    const storedOS = getCookie("os") || "mac";

    setTheme(storedTheme);
    setOS(storedOS);

    console.log("Stored OS: ", storedOS); // Check what OS is being retrieved
  }, []);

  useEffect(() => {
    // Apply dark mode theme class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preferences in cookies using the server action
    saveUserPreferences(theme, os);
    console.log("Saving preferences:", { theme, os }); // Debugging log
  }, [theme, os]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const toggleOS = () => {
    const newOS = os === "mac" ? "windows" : "mac";
    setOS(newOS);
  };

  return (
    <ThemeContext.Provider value={{ theme, os, toggleTheme, toggleOS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
