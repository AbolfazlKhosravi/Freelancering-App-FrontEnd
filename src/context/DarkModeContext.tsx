import { createContext, useEffect } from "react";
import useLocalStorageState from "../hooks/useLocalStoragesTate";
// import useLocalStorageState from "../hooks/useLocalStoragesTate";

interface DarkModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContext | null>(null);

interface DarkModeProvier {
  children: React.ReactNode;
}

export function DarkModeProvier({ children }: DarkModeProvier) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMoode",
    window.matchMedia("(prefers-color-scheme: dark)").matches // true, false
  );  

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
