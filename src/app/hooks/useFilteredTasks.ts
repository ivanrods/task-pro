import { useTask } from "../context/TaskContext";
import { useState } from "react";

export const useFilteredTasks = () => {
  const { addTask, tasks } = useTask();
  const [toggleCompleted, setToggleCompleted] = useState(true);

  function formatarDataAtual(): string {
    const [dia, mes, ano] = new Intl.DateTimeFormat("pt-BR")
      .format(new Date())
      .split("/");
    return `${ano}-${mes}-${dia}`;
  }

  const dataToday = formatarDataAtual();


  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const incompleteTasksFavotites = tasks.filter(
    (task) => task.favorite && task.completed === false
  );
  const completedTasksFavorites = tasks.filter(
    (task) => task.favorite && task.completed === true
  );

  const incompleteTasksToday = tasks.filter(
    (task) => task.data == dataToday && task.completed === false
  );
  const completedTasksToday = tasks.filter(
    (task) => task.data == dataToday && task.completed === true
  );

  const incompleteTasksPlanned = tasks.filter(
    (task) => task.data !== "" && task.completed === false
  );
  const completedTasksPlanned = tasks.filter(
    (task) => task.data !== "" && task.completed === true
  );

  const toggle = () => setToggleCompleted((prev) => !prev);

  return {
    addTask,
    toggleCompleted,
    toggle,
    incompleteTasks,
    completedTasks,
    incompleteTasksFavotites,
    completedTasksFavorites,
    incompleteTasksToday,
    completedTasksToday,
    incompleteTasksPlanned,
    completedTasksPlanned,
    dataToday,
  };
};
