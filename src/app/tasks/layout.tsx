"use client";
import { useEffect } from "react";
import Drawer from "@/components/Drawer";

import Title from "@/components/Title";
import { useTaskStore } from "@/store/taskStore";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadUserAndTasks, loadingUser } = useTaskStore();

  useEffect(() => {
    loadUserAndTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingUser) return null;

  return (
    <div className="flex bg-[var(--background-secondary)]">
      <Drawer />
      <div className="w-full relative ">
        <div className="w-full h-screen flex flex-col bg-[var(--background-secondary)] px-4 py-8 sm:px-8">
          <Title />
          <section className="flex-1 overflow-auto ">{children}</section>
        </div>
      </div>
    </div>
  );
}
