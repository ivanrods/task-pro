import { ReactNode } from "react";
import AddTaskInput from "./AddTaskInput";
import { useFilteredTasks } from "../hooks/useFilteredTasks";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const { addTask } = useFilteredTasks();
  return (
    <div className="flex flex-col gap-4">
      <AddTaskInput addTask={addTask} />
      <div className="h-[600px] overflow-auto flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default Container;
