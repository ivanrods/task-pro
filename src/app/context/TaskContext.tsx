"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { usePathname } from "next/navigation";
import { useData } from "../hooks/useData";

type Task = {
  id: string;
  title: string;
  description: string;
  data: string;
  completed: boolean;
  favorite: boolean;
};

type TaskContextType = {
  tasks: Task[];

  addTask: (title: string, description: string, data: string) => void;
  updateTask: (
    id: string,
    title: string,
    description: string,
    data: string,
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

  const pathname = usePathname();

  const { dataToday } = useData();

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

  function addTask(title: string, description: string, data: string) {

    const isFavoritePage = pathname.includes("/tasks/favorites");
    const isTodayPage = pathname.includes("/tasks/today");
    const isPlannedPage = pathname.includes("/tasks/planned");

    if (isTodayPage) {
      data = dataToday;
    }
    if (isPlannedPage) {
      if (data !== "") {
        data = data;
      } else {
        data = dataToday;
      }
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      data: data,
      completed: false,
      favorite: isFavoritePage,
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function updateTask(
    id: string,
    title: string,
    description: string,
    data: string,
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
              data,
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
