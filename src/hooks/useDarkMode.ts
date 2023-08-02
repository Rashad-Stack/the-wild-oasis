import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
export default function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("Dark mode context was used outside of DarkModeProvider");
  return context;
}
