"use client";

import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";

import { useTask } from "../context/TaskContext";

const Tarefas = () => {
  const { addTask, tasks } = useTask();
  return (
    <div>
      <div>
        <AddTaskInput addTask={addTask} />
      </div>
      {tasks.map((task, index) => (
        <TaskItem key={index} title={task} />
      ))}
    </div>
  );
};

export default Tarefas;
