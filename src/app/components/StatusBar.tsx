"use client";
import { useStatusBar } from "../context/StatusBarContext";


const StatusBar = () => {
  const { statusBar } = useStatusBar();
  if (!statusBar) return null;

  const bgColorClass =
    {
      blue: "bg-[var(--primary-color)]",
      red: "bg-[var(--alert-color)]",
    }[statusBar.color] || "bg-[var(--primary-color)]";

  return (
    <p
      className={`${bgColorClass} z-40 text-white font-semibold text-sm text-center w-full py-1 absolute top-0 transition-transform duration-2000 ease-in-out transform shadow-lg ${
        statusBar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {statusBar.title}
    </p>
  );
};

export default StatusBar;
