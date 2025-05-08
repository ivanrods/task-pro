"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };


  return(
    <ThemeContext.Provider value={{dark, toggleTheme}}>
      <div className={`flex w-full ${dark ? 'bg-neutral-900 text-white': 'bg-white'}`}>
        {children}
      </div>
        
    </ThemeContext.Provider>
  )
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
  }
