"use client";
import { MessageSquareText } from "lucide-react";
import { useStatusBar } from "../context/StatusBarContext";

const StatusBar = () => {
  const { statusBar } = useStatusBar();
  if (!statusBar) return null;

  const colorStatus =
    {
      blue: "[var(--primary-color)]",
      red: "[var(--alert-color)]",
    }[statusBar.color] || "[var(--primary-color)]";

  return (
    <p
      className={`bg-[var(--background-secondary)] flex flex-row gap-2 items-center z-40 text-${colorStatus} text-sm px-3 py-0.5 text-center absolute top-4 right-4 border border-${colorStatus} rounded-full ${
        statusBar ? "animate-bounce" : "animate-none"
      }`}
    >
      <MessageSquareText size={20} className={`${colorStatus}`} />
      {statusBar.title}
    </p>
  );
};

export default StatusBar;
