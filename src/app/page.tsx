import AddTaskInput from "./components/AddTaskInput";
import Drawer from "./components/Drawer";
import TaskItem from "./components/TaskItem";

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <Drawer />
      <div className="w-full">
        <h1>Tarefas</h1>
        <AddTaskInput />
        <TaskItem />
      </div>
    </div>
  );
}
