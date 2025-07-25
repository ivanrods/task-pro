import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import { getDataToday } from "../utils/date";

export const useFilteredTasks = () => {
  const { addTask, tasks } = useTaskStore();
  const [toggleCompleted, setToggleCompleted] = useState(true);

  const dataToday = getDataToday();

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
