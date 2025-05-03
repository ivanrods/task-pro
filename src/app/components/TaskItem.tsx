"use client";
import { Circle, Star, Trash } from "lucide-react";
import { useTask } from "../context/TaskContext";
import Link from "next/link";

type TaskItemProps = {
  id: string;
  title: string;
  data: string;
  completed: boolean;
  favorite: boolean;
};

const TaskItem = ({ id, title, data, favorite, completed }: TaskItemProps) => {
  const { toggleCompleted, toggleFavorite, deleteTask } = useTask();

  const dataFormatada =
    data && !isNaN(new Date(`${data}T00:00:00`).getTime())
      ? new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR")
      : "";

  return (
    <li className="w-full flex py-4 px-4 gap-4 items-center bg-white rounded-xl text-blue-500">
      <button
        type="button"
        onClick={() => toggleCompleted(id)}
        className="cursor-pointer"
      >
        <Circle fill={completed ? "#3b82f6" : "none"} />
      </button>

      <Link href={`/tasks/${id}`} className="flex-1 overflow-hidden">
        <p
          className={`text-neutral-800 ${
            completed ? "line-through" : ""
          } break-words whitespace-normal`}
        >
          {title}
        </p>
        <p className="text-sm text-neutral-500">{dataFormatada}</p>
      </Link>

      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          className="cursor-pointer"
        >
          <Star fill={favorite ? "#3b82f6" : "none"} />
        </button>
        <button
          type="button"
          onClick={() => deleteTask(id)}
          className="hover:text-red-500 cursor-pointer"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
