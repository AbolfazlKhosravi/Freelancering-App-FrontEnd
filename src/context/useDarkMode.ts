import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function useDarkMode() {
    const context = useContext(DarkModeContext);
  
    if (!context)
      throw new Error("DarkModeContext was used outside of DarkModeProvier");
  
    return context;
  }