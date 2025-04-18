"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  favorite: boolean;
};
type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (
    id: string,
    title: string,
    description: string,
    completed: boolean,
    favorite: boolean
  ) => void;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Erro ao fazer parse das tarefas:", error);
        localStorage.removeItem("tasks");
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function addTask(title: string, description: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      favorite: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    console.log(tasks);
  }

  function updateTask(
    id: string,
    title: string,
    description: string,
    completed: boolean,
    favorite: boolean
  ) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              completed,
              favorite,
            }
          : task
      )
    );
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
        updateTask,
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
