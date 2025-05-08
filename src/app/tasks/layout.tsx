
import Drawer from "../components/Drawer";
import StatusBar from "../components/StatusBar";
import Title from "../components/Title";
import { TaskProvider } from "../context/TaskContext";
import { StatusBarProvider } from "../context/StatusBarContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex  bg-[var(--backgroud)]">
      <ThemeProvider>
        <StatusBarProvider>
          <TaskProvider>
            <Drawer />
            <div className="w-full relative ">
              <StatusBar />
              <div className="w-full h-screen flex flex-col dark:bg-neutral-800 bg-gray-100 px-4 py-8 sm:px-8">
                <Title />
                <section className="flex-1 overflow-auto ">{children}</section>
              </div>
            </div>
          </TaskProvider>
        </StatusBarProvider>
      </ThemeProvider>
    </div>
  );
}
