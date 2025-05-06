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
  data: string;
  completed: boolean;
  favorite: boolean;
};

type StatusBarType = {
  title: string;
  color: string;
};

type TaskContextType = {
  tasks: Task[];
  statusBar: StatusBarType | null;
  setStatusBar: (status: StatusBarType | null) => void;
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
  handleStatusBar: (title: string, color: string) => void
};

const TaskContext = createContext({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [statusBar, setStatusBar] = useState<StatusBarType | null>(null);



  function handleStatusBar(title: string, color: string) {
    setStatusBar({ title, color });

    setTimeout(() => {
      setStatusBar(null);
    }, 2000);
  }

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
    const taskExists = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (taskExists) {
      alert("Já existe uma tarefa com esse título.");
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      data,
      completed: false,
      favorite: false,
    };

    setTasks((prev) => [newTask, ...prev]);

    handleStatusBar('Tarefa criada', 'blue')
  }

  function updateTask(
    id: string,
    title: string,
    description: string,
    data: string,
    completed: boolean,
    favorite: boolean
  ) {
    const taskExists = tasks.some(
      (task) =>
        task.id !== id && // ignora a própria tarefa
        task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (taskExists) {
      alert("Já existe uma tarefa com esse título.");
      return;
    }

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

    handleStatusBar('Tarefa atualizada', 'blue')
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
    handleStatusBar('Tarefa excluída', 'red')
  }

  return (
    <TaskContext.Provider
      value={{
        setStatusBar,
        tasks,
        statusBar,
        handleStatusBar,
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
