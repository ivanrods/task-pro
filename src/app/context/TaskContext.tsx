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
  userId: string;
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

  const userId = "user-id-aqui";
  /*

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
*/
  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks`, {
        headers: {
          "user-id": userId,
        },
      });
      const data = await res.json();
      setTasks(data);
    };
    fetchTask();
  }, [userId]);

  async function addTask(title: string, description: string, data: string) {
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

    const newTask = {
      title,
      description,
      data: data,
      completed: false,
      favorite: isFavoritePage,
      userId,
    };
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const created = await res.json();
    setTasks((prev) => [created, ...prev]);
  }

  async function updateTask(
    id: string,
    title: string,
    description: string,
    data: string,
    completed: boolean,
    favorite: boolean
  ) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, data, completed, favorite }),
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title, description, data, completed, favorite }
          : task
      )
    );
  }

  async function toggleCompleted(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await updateTask(
      id,
      task.title,
      task.description,
      task.data,
      !task.completed,
      task.favorite
    );
  }

  async function toggleFavorite(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await updateTask(
      id,
      task.title,
      task.description,
      task.data,
      task.completed,
      !task.favorite
    );
  }

  async function deleteTask(id: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

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
