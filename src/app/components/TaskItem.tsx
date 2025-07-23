"use client";
import { Circle, Star, Trash } from "lucide-react";
import { useTask } from "../context/TaskContext";
import Link from "next/link";

import { useData } from "../hooks/useData";
import { useStatusBar } from "../context/StatusBarContext";
type TaskItemProps = {
  id: string;
  title: string;
  data: string;
  completed: boolean;
  favorite: boolean;
};

const TaskItem = ({ id, title, data, favorite, completed }: TaskItemProps) => {
  const { toggleCompleted, toggleFavorite, deleteTask } = useTask();
  const { showStatusBar } = useStatusBar();

  const { dataToday, dataFormatada } = useData(data);

  return (
    <li className="bg-[var(--background)] text-[var(--primary-color)]  w-full flex py-4 px-4 gap-4 items-center   rounded-xl ">
      <button
        type="button"
        onClick={() => toggleCompleted(id)}
        className="cursor-pointer"
      >
        <Circle fill={completed ? "var(--primary-color)" : "none"} />
      </button>

      <Link href={`/tasks/${id}`} className="flex-1 overflow-hidden">
        <p
          className={`text-[var(--text-color)] ${
            completed ? "line-through" : ""
          } break-words whitespace-pre-wrap break-all line-clamp-2`}
        >
          {title}
        </p>
        <p className="text-sm text-neutral-500">
          {data == dataToday ? "Hoje" : dataFormatada}
        </p>
      </Link>

      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          className="cursor-pointer"
        >
          <Star fill={favorite ? "var(--primary-color)" : "none"} />
        </button>
        <button
          type="button"
          onClick={() => {
            deleteTask(id);
            showStatusBar("Tarefa excluída", "blue");
          }}
          className="hover:text-[var(--alert-color)] cursor-pointer"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
