"use client";
import { createContext, useContext, useState } from "react";

type StatusBarType = { title: string; color: string };
type StatusBarContextType = {
  statusBar: StatusBarType | null;
  showStatusBar: (title: string, color: string) => void;
};

const StatusBarContext = createContext<StatusBarContextType | undefined>(
  undefined
);

export const StatusBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [statusBar, setStatusBar] = useState<StatusBarType | null>(null);

  const showStatusBar = (title: string, color: string) => {
    setStatusBar({ title, color });
    setTimeout(() => setStatusBar(null), 2500);
  };

  return (
    <StatusBarContext.Provider value={{ statusBar, showStatusBar }}>
      {children}
    </StatusBarContext.Provider>
  );
};

export const useStatusBar = () => {
  const context = useContext(StatusBarContext);
  if (!context)
    throw new Error("useStatusBar must be used within a StatusBarProvider");
  return context;
};
