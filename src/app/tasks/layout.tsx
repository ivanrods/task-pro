import Drawer from "../components/Drawer";

import Title from "../components/Title";
import { TaskProvider } from "../context/TaskContext";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[var(--background-secondary)]">
      <TaskProvider>
        <Drawer />
        <div className="w-full relative "> 
        
          <div className="w-full h-screen flex flex-col bg-[var(--background-secondary)] px-4 py-8 sm:px-8">
            <Title />
            <section className="flex-1 overflow-auto ">{children}</section>
          </div>
        </div>
      </TaskProvider>
    </div>
  );
}
