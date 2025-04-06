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
    <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
      <button onClick={() => toggleCompleted(id)}>
        <Circle fill={completed ? "#3b82f6" : "none"} />
      </button>
      <Link href="/task" className="w-full">
        <p className={`text-neutral-800 ${completed ? "line-through" : ""}`}>
          {title}
        </p>
      </Link>
      <button onClick={() => toggleFavorite(id)}>
        <Star fill={favorite ? "#3b82f6" : "none"} />
      </button>

      <button onClick={() => deleteTask(id)} className="hover:text-red-500">
        <Trash />
      </button>
    </li>
  );
};

export default TaskItem;
