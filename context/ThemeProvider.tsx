import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("light"); // Set a default mode

  // Initialize theme based on user preference or localStorage
  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setMode(storedTheme);
  }, []);

  // Apply the theme to the document body
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save theme to localStorage
    localStorage.setItem("theme", mode);
  }, [mode]);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
