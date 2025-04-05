// app/context/TaskContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipagem do contexto
type TaskContextType = {
  tasks: string[];
  addTask: (title: string) => void;
};

// Criando o contexto
const TaskContext = createContext({} as TaskContextType);

// Componente Provider
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  function addTask(title: string) {
    setTasks((prevTasks) => [...prevTasks, title]);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook para usar o contexto
export const useTask = () => useContext(TaskContext);
