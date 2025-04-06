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
      {tasks.map((task) => (
        <TaskItem key={task.id} id={task.id} completed={task.completed} title={task.title} favorite={task.favorite}/>
      ))}
    </div>
  );
};

export default Tarefas;
