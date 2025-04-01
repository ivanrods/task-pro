import { House } from "lucide-react";
import AddTaskInput from "./components/AddTaskInput";
import Drawer from "./components/Drawer";
import TaskItem from "./components/TaskItem";

export default function Home() {
  return (
    <div className="h-screen w-screen flex ">
      <Drawer />
      <div className="w-full flex flex-col  bg-gray-100 px-4">
        <div className="flex gap-4 items-center text-blue-500 text-xl font-bold py-8">
          <House /> <h1>Tarefas</h1>
        </div>

        <AddTaskInput />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </div>
    </div>
  );
}
