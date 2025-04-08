"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  favorite: boolean;
};
type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string) {
   
    const newTask: Task = {
      id: String(Date.now()),
      title,
      completed: false,
      favorite: false,
    };

    if (title.trim() === "") {
      alert("Por favor, insira um título para a tarefa.");
      return;
    }
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleCompleted(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function toggleFavorite(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, favorite: !task.favorite } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleCompleted,
        toggleFavorite,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
