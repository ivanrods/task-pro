"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TaskContextType = {
  tasks: string[];
  addTask: (title: string) => void;
  fillColorItem: string;
  fillColorFavorite: string;
  toggleCheckedItem: () => void;
  toggleCheckedFavorite: () => void;
  checkedItem: boolean;
};

const TaskContext = createContext({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  const [checkedItem, setCheckedItem] = useState(false);
  const [checkedFavorite, setCheckedFavorite] = useState(false);

  const fillColorItem = checkedItem ? "currentColor" : "none";
  const fillColorFavorite = checkedFavorite ? "currentColor" : "none";

  function toggleCheckedItem() {
    setCheckedItem(!checkedItem);
  }
  function toggleCheckedFavorite() {
    setCheckedFavorite(!checkedFavorite);
  }

  function addTask(title: string) {
    setTasks((prevTasks) => [...prevTasks, title]);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        fillColorItem,
        fillColorFavorite,
        toggleCheckedItem,
        toggleCheckedFavorite,
        checkedItem,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
