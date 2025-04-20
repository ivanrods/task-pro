"use client";
import { Circle, Star, Trash } from "lucide-react";
import { useTask } from "../context/TaskContext";
import Link from "next/link";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
  favorite: boolean;
};

const TaskItem = ({ id, title, favorite, completed }: TaskItemProps) => {
  const { toggleCompleted, toggleFavorite, deleteTask } = useTask();
  return (
    <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500">

  <button onClick={() => toggleCompleted(id)}>
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
  </Link>

  <div className="flex gap-2 shrink-0">
    <button onClick={() => toggleFavorite(id)}>
      <Star fill={favorite ? "#3b82f6" : "none"} />
    </button>
    <button onClick={() => deleteTask(id)} className="hover:text-red-500">
      <Trash />
    </button>
  </div>
</li>

  );
};

export default TaskItem;
