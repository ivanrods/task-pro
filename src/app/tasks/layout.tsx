import Drawer from "../components/Drawer";
import Title from "../components/Title";
import { TaskProvider } from "../context/TaskContext";

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Drawer />
      <div className="w-full h-screen flex flex-col bg-gray-100 px-4 py-8 sm:px-8">
        <Title />
        <TaskProvider>
          <section className="flex-1 overflow-auto">{children}</section>
        </TaskProvider>
      </div>
    </div>
  );
}
