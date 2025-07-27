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
  loadUserAndTasks: () => Promise<void>;

  addTask: (
    title: string,
    description: string,
    data: string,
    favorite?: boolean
  ) => Promise<void>;

  updateTask: (task: Task) => Promise<void>;
  toggleCompleted: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTask: (id: string) => Promise<void>;
};

// Função auxiliar
function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { userId: payload?.userId || null };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  userId: null,
  loadingUser: true,

  setUserId: (id) => set({ userId: id }),

  loadUserAndTasks: async () => {
    const user = getUserFromToken();

    if (user?.userId) {
      set({ userId: user.userId });
    } else {
      set({ userId: null });
    }

    await get().fetchTasks();
    set({ loadingUser: false });
  },

  fetchTasks: async () => {
    const { userId } = get();

    if (!userId) {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          set({ tasks: parsed });
        } catch (e) {
          console.error("Erro ao carregar tarefas locais:", e);
        }
      }
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        headers: {
          "user-id": userId,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar tarefas");

      const data = await res.json();
      set({ tasks: data });
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  },

  addTask: async (title, description, data, favorite = false) => {
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

      const updatedTasks = [localTask, ...tasks];

      // Atualiza Zustand
      set({ tasks: updatedTasks });

      // Salva no localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      const createdTask = await res.json();
      set({ tasks: [createdTask, ...tasks] });
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  },

  updateTask: async (updatedTask) => {
    const { userId, tasks } = get();
    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );

    if (!userId) {
      // Atualiza localStorage e Zustand apenas
      localStorage.setItem("tasks", JSON.stringify(updated));
      set({ tasks: updated });
      return;
    }
    await fetch(`/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId!,
      },
      body: JSON.stringify(updatedTask),
    });

    set({ tasks: updated });
  },

  toggleCompleted: async (id) => {
    const { userId, tasks } = get();

    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    if (!userId) {
      // Atualiza localStorage
      const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      set({ tasks: updatedTasks });
      return;
    }

    // Atualiza via API
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId,
      },
      body: JSON.stringify(updatedTask),
    });

    // Atualiza Zustand
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    set({ tasks: updatedTasks });
  },

  toggleFavorite: async (id) => {
    const { userId, tasks } = get();

    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updatedTask = { ...task, favorite: !task.favorite };

    if (!userId) {
      // Atualiza localStorage
      const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      set({ tasks: updatedTasks });
      return;
    }
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId,
      },
      body: JSON.stringify(updatedTask),
    });

    // Atualiza Zustand
    const updatedTasks = tasks.map((t) => (t.id === id ? updatedTask : t));
    set({ tasks: updatedTasks });
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
