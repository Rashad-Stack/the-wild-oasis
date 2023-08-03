import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/uselocalstoragestate";

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  });

  function toggleDarkMode() {
    setIsDarkMode((prev: boolean) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
