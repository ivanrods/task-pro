"use client";
import { MessageSquareText } from "lucide-react";
import { useStatusBar } from "../context/StatusBarContext";

const StatusBar = () => {
  const { statusBar } = useStatusBar();
  if (!statusBar) return null;

  const colorStatus = {
    blue: "bg-[var(--primary-color)]",
  red: "bg-[var(--alert-color)]",
  }[statusBar.color];

  return (
    <p
      className={`${colorStatus} flex flex-row gap-2 items-center z-40 text-white text-sm text-center px-4 py-2  absolute top-4 right-4  rounded-full animate-bounce`}
    >
      <MessageSquareText size={20} />
      {statusBar.title}
    </p>
  );
};

export default StatusBar;
