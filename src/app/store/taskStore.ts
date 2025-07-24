import { create } from "zustand";

type Task = {
  id: string;
  title: string;
  description: string;
  data: string;
  completed: boolean;
  favorite: boolean;
  userId: string;
};

type TaskStore = {
  tasks: Task[];
  userId: string | null;
  loadingUser: boolean;

  fetchTasks: () => Promise<void>;
  setUserId: (id: string) => void;
  addTask: (title: string, desc: string, data: string, fav: boolean) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  userId: null,
  loadingUser: true,

  setUserId: (id) => set({ userId: id }),

  fetchTasks: async () => {
    const { userId } = get();
    if (!userId) return;

    try {
      const res = await fetch("/api/tasks", {
        headers: { "user-id": userId },
      });
      const data = await res.json();
      set({ tasks: data });
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  },

  addTask: async (title, description, data, favorite) => {
    const { userId, tasks } = get();
    const newTask = {
      title,
      description,
      data,
      completed: false,
      favorite,
    };

    if (!userId) {
      const localTask = {
        ...newTask,
        id: crypto.randomUUID(),
        userId: "",
      };
      const updated = [localTask, ...tasks];
      localStorage.setItem("tasks", JSON.stringify(updated));
      set({ tasks: updated });
      return;
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId,
      },
      body: JSON.stringify(newTask),
    });

    const created = await res.json();
    set({ tasks: [created, ...tasks] });
  },

  updateTask: async (updatedTask) => {
    const { userId, tasks } = get();
    await fetch(`/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId!,
      },
      body: JSON.stringify(updatedTask),
    });

    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    set({ tasks: updated });
  },

  toggleCompleted: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    get().updateTask({ ...task, completed: !task.completed });
  },

  toggleFavorite: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    get().updateTask({ ...task, favorite: !task.favorite });
  },

  deleteTask: async (id) => {
    const { userId, tasks } = get();
    if (!userId) {
      const updated = tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      set({ tasks: updated });
      return;
    }

    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: { "user-id": userId },
    });

    set({ tasks: tasks.filter((t) => t.id !== id) });
  },
}));
